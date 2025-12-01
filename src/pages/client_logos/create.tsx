import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Upload, InputNumber, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const ClientLogoCreate = () => {
  const { formProps, saveButtonProps, form } = useForm();

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `logos/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error } = await supabaseClient.storage
        .from("website-assets")
        .upload(fileName, file);

      if (error) throw error;

      const { data } = supabaseClient.storage
        .from("website-assets")
        .getPublicUrl(fileName);
      
      form.setFieldValue("logo_url", data.publicUrl);
      onSuccess(data.publicUrl);
      message.success("Logo uploaded!");
    } catch (error: any) { onError(error); message.error("Upload failed"); }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Client Name" name="client_name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Display Order" name="display_order">
          <InputNumber defaultValue={0} style={{ width: "100%" }} />
        </Form.Item>
        
        <Form.Item name="logo_url" hidden><Input /></Form.Item>

        <Form.Item label="Logo Image" rules={[{ required: true, message: "Logo is required" }]}>
          <Upload.Dragger name="file" customRequest={customRequest} listType="picture" maxCount={1}>
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Click or drag logo</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};