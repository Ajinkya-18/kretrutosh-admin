import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const FrameworkEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `frameworks/${Date.now()}-${file.name}`;
      const { error } = await supabaseClient.storage.from("public-assets").upload(fileName, file);
      if (error) throw error;
      const { data } = supabaseClient.storage.from("public-assets").getPublicUrl(fileName);
      onSuccess(data.publicUrl);
    } catch (error) { onError(error); }
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Short Description" name="short_description" rules={[{ required: true }]}>
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item label="Full Details" name="full_details">
          <Input.TextArea rows={6} />
        </Form.Item>
        
        <Form.Item
          label="Framework Image"
          name="image_url"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) return e;
            return e?.fileList[0]?.response;
          }}
        >
          <Upload.Dragger name="file" customRequest={customRequest} listType="picture" maxCount={1}>
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Replace Framework Image</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Edit>
  );
};