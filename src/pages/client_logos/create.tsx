import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Upload, InputNumber } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const ClientLogoCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `logos/${Date.now()}-${file.name}`;
      const { error } = await supabaseClient.storage.from("public-assets").upload(fileName, file);
      if (error) throw error;
      const { data } = supabaseClient.storage.from("public-assets").getPublicUrl(fileName);
      onSuccess(data.publicUrl);
    } catch (error) { onError(error); }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Client Name" name="client_name">
          <Input />
        </Form.Item>
        <Form.Item label="Display Order" name="display_order">
          <InputNumber defaultValue={0} />
        </Form.Item>
        <Form.Item
          label="Logo Image"
          name="logo_url"
          rules={[{ required: true }]}
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) return e;
            return e?.fileList[0]?.response;
          }}
        >
          <Upload.Dragger name="file" customRequest={customRequest} listType="picture" maxCount={1}>
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Click or drag logo to upload</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};