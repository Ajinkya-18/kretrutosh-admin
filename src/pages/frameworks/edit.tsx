import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const FrameworkEdit = () => {
  const { formProps, saveButtonProps, form, queryResult } = useForm();
  const data = queryResult?.data?.data;
  
  const defaultFileList = data?.image_url ? [{ 
    uid: '-1', 
    name: 'current-image', 
    status: 'done', 
    url: data.image_url 
  }] : [];

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `frameworks/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error } = await supabaseClient.storage.from("website-assets").upload(fileName, file);
      if (error) throw error;
      
      const { data } = supabaseClient.storage.from("website-assets").getPublicUrl(fileName);
      const url = data.publicUrl;
      form.setFieldValue("image_url", url);
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

        <Form.Item label="Subtitle" name="subtitle">
          <Input />
        </Form.Item>
        
        <Form.Item label="Short Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        
        <Form.Item label="Full Details" name="full_details">
          <Input.TextArea rows={6} />
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
        
        <Form.Item name="image_url" hidden><Input /></Form.Item>

        <Form.Item 
          label="Framework Image"
          getValueFromEvent={(e) => {
            if (typeof e === 'string') return e;
            if (Array.isArray(e)) return e.length > 0 ? e[0].response : null;
            return e?.fileList && e.fileList.length > 0 ? e.fileList[0].response : null;
          }}
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