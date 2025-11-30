import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Upload } from "antd";
import { UploadOutlined, FilePdfOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const WhitepaperEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  const uploadToSupabase = (folder: string) => async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `whitepapers/${folder}/${Date.now()}-${file.name}`;
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
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item
          label="Cover Image"
          name="cover_image_url"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) return e;
            return e?.fileList[0]?.response;
          }}
        >
          <Upload.Dragger 
            name="file" 
            customRequest={uploadToSupabase("covers")} 
            listType="picture" 
            maxCount={1}
          >
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Replace Cover Image</p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item
          label="PDF File"
          name="download_url"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) return e;
            return e?.fileList[0]?.response;
          }}
        >
          <Upload.Dragger 
            name="file" 
            customRequest={uploadToSupabase("docs")} 
            maxCount={1}
            accept=".pdf"
          >
            <p className="ant-upload-drag-icon"><FilePdfOutlined /></p>
            <p className="ant-upload-text">Replace PDF Document</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Edit>
  );
};