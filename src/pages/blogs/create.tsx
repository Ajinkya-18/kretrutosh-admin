import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Upload, message, Alert } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const BlogCreate = () => {
  const { formProps, saveButtonProps, form } = useForm();

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      // 1. Check Bucket Connection
      const { data: buckets, error: bucketError } = await supabaseClient
        .storage
        .listBuckets();

      if (bucketError) {
        message.error("Connection Error: Could not list buckets.");
        throw bucketError;
      }

      const bucketExists = buckets?.find(b => b.name === "website-assets");
      
      if (!bucketExists) {
        message.error("Error: Bucket 'website-assets' does not exist in this project!");
        throw new Error("Bucket not found");
      }

      // 2. Attempt Upload
      const fileName = `blogs/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;

      const { data, error } = await supabaseClient.storage
        .from("website-assets")
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: false
        });

      if (error) {
        throw error;
      }

      // 3. Get URL
      const { data: urlData } = supabaseClient.storage
        .from("website-assets")
        .getPublicUrl(fileName);

      const publicUrl = urlData.publicUrl;

      form.setFieldValue("image_url", publicUrl);
      onSuccess(publicUrl);
      message.success("Image uploaded successfully!");

    } catch (error: any) {
      message.error(`Upload Failed: ${error.message || error.error}`);
      onError(error);
    }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
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
            <p className="ant-upload-text">Click to Upload</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};