import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const BlogCreate = () => {
  // 1. Get the 'form' instance so we can manually set values
  const { formProps, saveButtonProps, form } = useForm();

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `blogs/${Date.now()}-${file.name}`;
      const { error } = await supabaseClient.storage
        .from("public-assets")
        .upload(fileName, file);

      if (error) throw error;

      const { data } = supabaseClient.storage
        .from("public-assets")
        .getPublicUrl(fileName);

      const url = data.publicUrl;
      
      // 2. Manually set the form field value to the URL string
      form.setFieldValue("image_url", url);
      
      // Tell Antd the upload was successful (sets the file status to 'done')
      onSuccess(url);
    } catch (error) {
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

        <Form.Item label="External Link (LinkedIn/Medium)" name="link">
          <Input />
        </Form.Item>

        <Form.Item label="Publish Date" name="publish_date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* 3. This Item holds the actual string value sent to DB (Hidden) */}
        <Form.Item name="image_url" hidden>
          <Input />
        </Form.Item>

        {/* 4. This Item handles the UI only */}
        <Form.Item label="Cover Image">
          <Upload.Dragger
            name="file"
            customRequest={customRequest}
            listType="picture"
            maxCount={1}
            // This ensures the file list shows the uploaded image visually
            onChange={(info) => {
              if (info.file.status === "done") {
                // The value is already set in customRequest
              }
            }}
          >
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Click or drag image to upload</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};