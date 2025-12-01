import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Upload, Radio, message } from "antd";
import { UploadOutlined, FilePdfOutlined, LinkOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";
import { useState } from "react";

export const WhitepaperCreate = () => {
  const { formProps, saveButtonProps, form } = useForm();
  const [resourceType, setResourceType] = useState<"pdf" | "link">("pdf");

  const uploadToSupabase = (folder: string, fieldName: string) => async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `whitepapers/${folder}/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error } = await supabaseClient.storage
        .from("website-assets")
        .upload(fileName, file);

      if (error) throw error;

      const { data } = supabaseClient.storage
        .from("website-assets")
        .getPublicUrl(fileName);
      
      const url = data.publicUrl;
      form.setFieldValue(fieldName, url);
      onSuccess(url);
      message.success(`${folder === 'covers' ? 'Image' : 'PDF'} uploaded!`);
    } catch (error: any) { onError(error); message.error("Upload failed"); }
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

        {/* Cover Image */}
        <Form.Item
          label="Cover Image"
          name="cover_image_url"
          getValueFromEvent={(e) => {
            if (typeof e === 'string') return e;
            if (Array.isArray(e)) return e.length > 0 ? e[0].response : null;
            return e?.fileList && e.fileList.length > 0 ? e.fileList[0].response : null;
          }}
        >
          <Upload.Dragger name="file" customRequest={uploadToSupabase("covers", "cover_image_url")} listType="picture" maxCount={1}>
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Upload Cover</p>
          </Upload.Dragger>
        </Form.Item>

        {/* Type Selector */}
        <Form.Item label="Resource Type" name="type" initialValue="pdf">
          <Radio.Group onChange={(e) => setResourceType(e.target.value)}>
            <Radio.Button value="pdf">Upload PDF</Radio.Button>
            <Radio.Button value="link">External Website Link</Radio.Button>
          </Radio.Group>
        </Form.Item>

        {/* Conditional Inputs */}
        <div style={{ display: resourceType === 'pdf' ? 'block' : 'none' }}>
          <Form.Item
            label="PDF File"
            name="download_url"
            getValueFromEvent={(e) => {
               if (typeof e === 'string') return e;
               if (Array.isArray(e)) return e.length > 0 ? e[0].response : null;
               return e?.fileList && e.fileList.length > 0 ? e.fileList[0].response : null;
            }}
          >
            <Upload.Dragger name="file" customRequest={uploadToSupabase("docs", "download_url")} maxCount={1} accept=".pdf">
              <p className="ant-upload-drag-icon"><FilePdfOutlined /></p>
              <p className="ant-upload-text">Upload PDF Document</p>
            </Upload.Dragger>
          </Form.Item>
        </div>

        <div style={{ display: resourceType === 'link' ? 'block' : 'none' }}>
          <Form.Item label="External Link URL" name="external_link" help="e.g. https://medium.com/...">
            <Input prefix={<LinkOutlined />} placeholder="https://..." />
          </Form.Item>
        </div>
      </Form>
    </Create>
  );
};