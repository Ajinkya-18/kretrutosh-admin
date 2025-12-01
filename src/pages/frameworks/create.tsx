import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const FrameworkCreate = () => {
  const { formProps, saveButtonProps, form } = useForm();

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `frameworks/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error } = await supabaseClient.storage.from("website-assets").upload(fileName, file);
      if (error) throw error;
      
      const { data } = supabaseClient.storage.from("website-assets").getPublicUrl(fileName);
      form.setFieldValue("image_url", data.publicUrl);
      onSuccess(data.publicUrl);
      message.success("Diagram uploaded!");
    } catch (error: any) { onError(error); message.error("Upload failed"); }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Short Description" name="short_description"><Input.TextArea rows={2} /></Form.Item>
        <Form.Item label="Full Details" name="full_details"><Input.TextArea rows={6} /></Form.Item>
        <Form.Item label="Icon Name (Lucide)" name="icon_name" help="e.g. BarChart, Trophy"><Input /></Form.Item>
        
        <Form.Item name="image_url" hidden><Input /></Form.Item>
        <Form.Item label="Framework Image">
          <Upload.Dragger name="file" customRequest={customRequest} listType="picture" maxCount={1}>
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Upload Diagram</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};