import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Upload } from "antd";
import { UploadOutlined, FilePdfOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const WhitepaperCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  // Helper to create the upload function dynamically based on folder
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
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        {/* 1. Cover Image Upload */}
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
            customRequest={uploadToSupabase("covers")} // Saves to whitepapers/covers/
            listType="picture" 
            maxCount={1}
          >
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Upload Cover Image</p>
          </Upload.Dragger>
        </Form.Item>

        {/* 2. PDF File Upload */}
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
            customRequest={uploadToSupabase("docs")} // Saves to whitepapers/docs/
            maxCount={1}
            accept=".pdf"
          >
            <p className="ant-upload-drag-icon"><FilePdfOutlined /></p>
            <p className="ant-upload-text">Upload PDF Document</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};