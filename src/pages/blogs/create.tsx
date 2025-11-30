import { Create, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient"; 

export const BlogCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  // Handle Image Upload to Supabase Storage
  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `blogs/${Date.now()}-${file.name}`;
      const { error } = await supabaseClient.storage
        .from("public-assets") // Your bucket name
        .upload(fileName, file);

      if (error) throw error;

      const { data } = supabaseClient.storage
        .from("public-assets")
        .getPublicUrl(fileName);

      onSuccess(data.publicUrl);
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

        {/* Image Upload */}
        <Form.Item
          label="Cover Image"
          name="image_url"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) return e;
            return e?.fileList[0]?.response;
          }}
        >
          <Upload.Dragger
            name="file"
            customRequest={customRequest}
            listType="picture"
            maxCount={1}
          >
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Click or drag image to upload</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};