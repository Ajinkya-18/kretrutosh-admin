import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Upload, Select, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const FrameworkCreate = () => {
  const { formProps, saveButtonProps, form } = useForm();

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `frameworks/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error } = await supabaseClient.storage.from("website-assets").upload(fileName, file);
      if (error) throw error;
      
      const { data } = supabaseClient.storage.from("website-assets").getPublicUrl(fileName);
      const url = data.publicUrl;
      form.setFieldValue("image_url", url);
      onSuccess(url);
      message.success("Diagram uploaded!");
    } catch (error: any) { 
      onError(error); 
      message.error("Upload failed"); 
    }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input placeholder="e.g. CX Maturity Framework" />
        </Form.Item>

        <Form.Item label="Slug" name="slug" rules={[{ required: true }]}>
          <Input placeholder="e.g. cx-maturity" />
        </Form.Item>

        <Form.Item label="Subtitle" name="subtitle">
          <Input placeholder="e.g. Diagnostic Model" />
        </Form.Item>
        
        {/* Schema uses 'description' */}
        <Form.Item label="Short Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        
        <Form.Item label="Full Details" name="full_details">
          <Input.TextArea rows={6} />
        </Form.Item>
        
        <Form.Item label="Icon Name (Lucide)" name="icon_name" help="e.g. BarChart, Trophy">
            <Input />
        </Form.Item>

        {/* Array field for Outcomes */}
        <Form.Item label="Key Outcomes (Press Enter to add)" name="outcomes">
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
          <Upload.Dragger name="file" customRequest={customRequest} listType="picture" maxCount={1}>
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Upload Diagram</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};