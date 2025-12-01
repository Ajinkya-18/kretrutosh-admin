import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Upload, Rate, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const TestimonialCreate = () => {
  const { formProps, saveButtonProps, form } = useForm();

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `testimonials/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error } = await supabaseClient.storage.from("website-assets").upload(fileName, file);
      if (error) throw error;
      const { data } = supabaseClient.storage.from("website-assets").getPublicUrl(fileName);
      form.setFieldValue("avatar_url", data.publicUrl);
      onSuccess(data.publicUrl);
      message.success("Avatar uploaded!");
    } catch (error: any) { onError(error); message.error("Upload failed"); }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Client Name" name="client_name" rules={[{ required: true }]}><Input /></Form.Item>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item label="Role" name="client_role" style={{ flex: 1 }}><Input /></Form.Item>
          <Form.Item label="Company" name="company" style={{ flex: 1 }}><Input /></Form.Item>
        </div>
        <Form.Item label="Quote" name="quote" rules={[{ required: true }]}><Input.TextArea rows={3} /></Form.Item>
        <Form.Item label="Rating" name="rating" initialValue={5}><Rate /></Form.Item>

        <Form.Item name="avatar_url" hidden><Input /></Form.Item>
        <Form.Item label="Client Avatar">
          <Upload.Dragger name="file" customRequest={customRequest} listType="picture" maxCount={1}>
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Upload Avatar</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};