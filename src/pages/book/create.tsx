import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";
import { RichTextEditor } from "../../components/RichTextEditor";

export const BookCreate = () => {
  const { formProps, saveButtonProps, form } = useForm();
  
  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `book/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const { error } = await supabaseClient.storage.from("website-assets").upload(fileName, file);
      if (error) throw error;
      const { data } = supabaseClient.storage.from("website-assets").getPublicUrl(fileName);
      form.setFieldValue("cover_image", data.publicUrl);
      onSuccess(data.publicUrl);
    } catch (e: any) { onError(e); message.error("Failed"); }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Book Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Amazon Link" name="amazon_link"><Input /></Form.Item>
        <Form.Item label="Description (Rich HTML)" name="description_html"><RichTextEditor /></Form.Item>
        <Form.Item name="cover_image" hidden><Input /></Form.Item>
        <Form.Item label="Cover Image">
            <Upload.Dragger customRequest={customRequest} maxCount={1} listType="picture">
                <p className="ant-upload-drag-icon"><UploadOutlined /></p>
                <p className="ant-upload-text">Upload Cover</p>
            </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};
