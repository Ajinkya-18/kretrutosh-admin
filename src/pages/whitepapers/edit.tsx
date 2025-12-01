import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Upload, message } from "antd";
import { UploadOutlined, FilePdfOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const WhitepaperEdit = () => {
  const { formProps, saveButtonProps, form, queryResult } = useForm();
  const data = queryResult?.data?.data;

  const defaultCover = data?.cover_image_url ? [{ uid: '-1', name: 'cover', status: 'done', url: data.cover_image_url }] : [];
  const defaultPDF = data?.download_url ? [{ uid: '-2', name: 'document.pdf', status: 'done', url: data.download_url }] : [];

  const uploadToSupabase = (folder: string, fieldName: string) => async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `whitepapers/${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error } = await supabaseClient.storage.from("website-assets").upload(fileName, file);
      if (error) throw error;
      const { data } = supabaseClient.storage.from("website-assets").getPublicUrl(fileName);
      form.setFieldValue(fieldName, data.publicUrl);
      onSuccess(data.publicUrl);
      message.success("Updated!");
    } catch (error: any) { onError(error); message.error("Failed"); }
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Description" name="description"><Input.TextArea rows={3} /></Form.Item>

        <Form.Item name="cover_image_url" hidden><Input /></Form.Item>
        <Form.Item label="Cover Image">
          <Upload.Dragger name="file" customRequest={uploadToSupabase("covers", "cover_image_url")} listType="picture" maxCount={1} defaultFileList={defaultCover as any} key={defaultCover.length ? "loaded-cover" : "empty-cover"}>
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Replace Cover</p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item name="download_url" hidden><Input /></Form.Item>
        <Form.Item label="PDF File">
          <Upload.Dragger name="file" customRequest={uploadToSupabase("docs", "download_url")} maxCount={1} accept=".pdf" defaultFileList={defaultPDF as any} key={defaultPDF.length ? "loaded-pdf" : "empty-pdf"}>
            <p className="ant-upload-drag-icon"><FilePdfOutlined /></p>
            <p className="ant-upload-text">Replace PDF</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Edit>
  );
};