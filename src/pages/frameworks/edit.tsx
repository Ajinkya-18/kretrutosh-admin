import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";
import { RichTextEditor } from "../../components/RichTextEditor";

export const FrameworkEdit = () => {
  const { formProps, saveButtonProps, form, queryResult } = useForm();
  const data = queryResult?.data?.data;
  
  // Mapped to diagram_url (or image_url fallbacks)
  const defaultFileList = data?.diagram_url ? [{ 
    uid: '-1', 
    name: 'current-image', 
    status: 'done', 
    url: data.diagram_url 
  }] : [];

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `frameworks/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error } = await supabaseClient.storage.from("website-assets").upload(fileName, file);
      if (error) throw error;
      
      const { data } = supabaseClient.storage.from("website-assets").getPublicUrl(fileName);
      const url = data.publicUrl;
      form.setFieldValue("diagram_url", url);
      onSuccess(url);
      message.success("Updated!");
    } catch (error: any) { 
      onError(error); 
      message.error("Failed"); 
    }
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        
        <Form.Item label="Description (Rich HTML)" name="description_html">
          <RichTextEditor />
        </Form.Item>
        
        <Form.Item 
          label="Icon Name (Lucide)" 
          name="icon_name"
          help={<span>Find icon names on <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer">lucide.dev</a> (e.g. 'Users', 'BarChart')</span>}
        >
            <Input />
        </Form.Item>

        <Form.Item label="Key Outcomes" name="outcomes">
          <Select mode="tags" placeholder="Type outcome and press Enter" tokenSeparators={[',']} open={false} />
        </Form.Item>
        
        <Form.Item name="diagram_url" hidden><Input /></Form.Item>

        <Form.Item 
          label="Diagram / Image"
        >
          <Upload.Dragger 
            name="file" 
            customRequest={customRequest} 
            listType="picture" 
            maxCount={1} 
            defaultFileList={defaultFileList as any} 
            key={defaultFileList.length > 0 ? "loaded" : "empty"}
          >
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Replace Diagram</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Edit>
  );
};
