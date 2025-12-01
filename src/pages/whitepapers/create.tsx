import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Upload, message } from "antd";
import { UploadOutlined, FilePdfOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const WhitepaperCreate = () => {
  const { formProps, saveButtonProps, form } = useForm();

  const uploadToSupabase = (folder: string, fieldName: string) => async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `whitepapers/${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error } = await supabaseClient.storage.from("website-assets").upload(fileName, file);
      if (error) throw error;
      const { data } = supabaseClient.storage.from("website-assets").getPublicUrl(fileName);
      
      form.setFieldValue(fieldName, data.publicUrl); // Dynamic Field Set
      onSuccess(data.publicUrl);
      message.success(`${folder === 'covers' ? 'Image' : 'PDF'} uploaded!`);
    } catch (error: any) { onError(error); message.error("Upload failed"); }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Description" name="description"><Input.TextArea rows={3} /></Form.Item>

        {/* Cover Image */}
        <Form.Item name="cover_image_url" hidden><Input /></Form.Item>
        <Form.Item label="Cover Image">
          <Upload.Dragger name="file" customRequest={uploadToSupabase("covers", "cover_image_url")} listType="picture" maxCount={1}>
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Upload Cover</p>
          </Upload.Dragger>
        </Form.Item>

        {/* PDF */}
        <Form.Item name="download_url" hidden><Input /></Form.Item>
        <Form.Item label="PDF File">
          <Upload.Dragger name="file" customRequest={uploadToSupabase("docs", "download_url")} maxCount={1} accept=".pdf">
            <p className="ant-upload-drag-icon"><FilePdfOutlined /></p>
            <p className="ant-upload-text">Upload PDF</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};