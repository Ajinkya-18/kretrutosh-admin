import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Upload, Radio, message } from "antd";
import { UploadOutlined, FilePdfOutlined, LinkOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";
import { useState, useEffect } from "react";

export const WhitepaperEdit = () => {
  const { formProps, saveButtonProps, form, queryResult } = useForm();
  const data = queryResult?.data?.data;
  
  // Initialize state based on fetched data
  const [resourceType, setResourceType] = useState<"pdf" | "link">("pdf");

  useEffect(() => {
    if (data) {
      const type = data.type || (data.external_link ? 'link' : 'pdf');
      setResourceType(type);
      // Ensure form values sync if not automatically set
      if (data.type !== form.getFieldValue("type")) {
        form.setFieldValue("type", type);
      }
    }
  }, [data, form]);

  // Initial file lists for display
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
    } catch (error: any) { onError(error); message.error("Upload failed"); }
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
             if (typeof e === 'string') return e;
             if (Array.isArray(e)) return e.length > 0 ? e[0].response : null;
             return e?.fileList && e.fileList.length > 0 ? e.fileList[0].response : null;
          }}
        >
          <Upload.Dragger 
            name="file" 
            customRequest={uploadToSupabase("covers", "cover_image_url")} 
            listType="picture" 
            maxCount={1} 
            defaultFileList={defaultCover as any}
            key={defaultCover.length ? "loaded-cover" : "empty-cover"}
          >
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Replace Cover</p>
          </Upload.Dragger>
        </Form.Item>

        <Form.Item label="Resource Type" name="type">
          <Radio.Group onChange={(e) => setResourceType(e.target.value)}>
            <Radio.Button value="pdf">Upload PDF</Radio.Button>
            <Radio.Button value="link">External Website Link</Radio.Button>
          </Radio.Group>
        </Form.Item>

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
            <Upload.Dragger 
              name="file" 
              customRequest={uploadToSupabase("docs", "download_url")} 
              maxCount={1} 
              accept=".pdf" 
              defaultFileList={defaultPDF as any}
              key={defaultPDF.length ? "loaded-pdf" : "empty-pdf"}
            >
              <p className="ant-upload-drag-icon"><FilePdfOutlined /></p>
              <p className="ant-upload-text">Replace PDF</p>
            </Upload.Dragger>
          </Form.Item>
        </div>

        <div style={{ display: resourceType === 'link' ? 'block' : 'none' }}>
          <Form.Item label="External Link URL" name="external_link" help="e.g. https://medium.com/...">
            <Input prefix={<LinkOutlined />} />
          </Form.Item>
        </div>
      </Form>
    </Edit>
  );
};