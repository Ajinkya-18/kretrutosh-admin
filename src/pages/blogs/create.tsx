import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Upload, message, Alert } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const BlogCreate = () => {
  const { formProps, saveButtonProps, form } = useForm();

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      console.log("--- DIAGNOSTIC START ---");
      
      // 1. Print Current Config (Check your console to see if these match your project!)
      console.log("Target Bucket:", "website-assets");
      
      // 2. Test Connection: List ALL Buckets
      const { data: buckets, error: bucketError } = await supabaseClient
        .storage
        .listBuckets();

      if (bucketError) {
        console.error("❌ Failed to list buckets. Check your API Keys!", bucketError);
        message.error("Connection Error: Could not list buckets.");
        throw bucketError;
      }

      console.log("✅ Connected to Supabase. Available Buckets:", buckets);

      const bucketExists = buckets?.find(b => b.name === "website-assets");
      
      if (!bucketExists) {
        console.error("❌ FATAL ERROR: Bucket 'website-assets' NOT found in this project.");
        console.error("Your Admin Panel is likely connected to the WRONG Supabase project.");
        message.error("Error: Bucket 'website-assets' does not exist in this project!");
        throw new Error("Bucket not found");
      } else {
        console.log("✅ Bucket 'website-assets' found!");
      }

      // 3. Attempt Upload
      const fileName = `blogs/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      console.log("Attempting upload to:", fileName);

      const { data, error } = await supabaseClient.storage
        .from("website-assets")
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        console.error("❌ Upload failed:", error);
        throw error;
      }

      // 4. Get URL
      const { data: urlData } = supabaseClient.storage
        .from("website-assets")
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;
      console.log("✅ Upload Success! URL:", publicUrl);

      form.setFieldValue("image_url", publicUrl);
      onSuccess(publicUrl);
      message.success("Image uploaded successfully!");

    } catch (error: any) {
      console.error("Upload Process Failed:", error);
      message.error(`Upload Failed: ${error.message || error.error}`);
      onError(error);
    }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Alert 
        message="Debug Mode Active" 
        description="Open your browser console (F12) to see connection details when uploading."
        type="warning" 
        showIcon 
        style={{ marginBottom: 16 }}
      />
      
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="External Link" name="link">
          <Input />
        </Form.Item>

        <Form.Item label="Publish Date" name="publish_date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* Hidden URL Field */}
        <Form.Item name="image_url" hidden>
          <Input />
        </Form.Item>

        <Form.Item label="Cover Image">
          <Upload.Dragger
            name="file"
            customRequest={customRequest}
            listType="picture"
            maxCount={1}
          >
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Click to Upload & Test Connection</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};