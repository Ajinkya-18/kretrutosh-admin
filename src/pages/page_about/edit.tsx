import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";
import { RichTextEditor } from "../../components/RichTextEditor";

export const PageAboutEdit = () => {
  const { formProps, saveButtonProps, form, queryResult } = useForm();
  const data = queryResult?.data?.data;
  
  const defaultFileList = data?.founder_image_url ? [{ uid: '-1', name: 'current', status: 'done', url: data.founder_image_url }] : [];

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `about/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const { error } = await supabaseClient.storage.from("website-assets").upload(fileName, file);
      if (error) throw error;
      const { data } = supabaseClient.storage.from("website-assets").getPublicUrl(fileName);
      form.setFieldValue("founder_image_url", data.publicUrl);
      onSuccess(data.publicUrl);
      message.success("Uploaded!");
    } catch (e: any) { onError(e); message.error("Failed"); }
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Hero Title" name="hero_title" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Founder Story (Rich HTML)" name="story_html"><RichTextEditor /></Form.Item>
        <Form.Item name="founder_image_url" hidden><Input /></Form.Item>
        <Form.Item label="Founder Image">
            <Upload.Dragger customRequest={customRequest} maxCount={1} listType="picture" defaultFileList={defaultFileList as any}>
                <p className="ant-upload-drag-icon"><UploadOutlined /></p>
                <p className="ant-upload-text">Upload Image</p>
            </Upload.Dragger>
        </Form.Item>
      </Form>
    </Edit>
  );
};
