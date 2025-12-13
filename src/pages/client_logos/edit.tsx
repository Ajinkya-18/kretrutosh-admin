import { useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Upload, InputNumber, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";
import { useParams } from "react-router-dom";

export const ClientLogoEdit = () => {
  const [loading, setLoading] = useState(false);
  const { formProps, saveButtonProps, form, queryResult } = useForm();
  const { id } = useParams();

  const data = queryResult?.data?.data;
  
  const defaultFileList = data?.logo_url ? [
    { uid: '-1', name: 'current-logo', status: 'done', url: data.logo_url }
  ] : [];

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
        const { error } = await supabaseClient
            .from('clients') // User specified table name: clients
            .update({
                client_name: values.client_name,
                display_order: values.display_order,
                logo_url: values.logo_url,
            })
            .eq('id', id);
        
        if (error) throw error;
        message.success("Client logo updated successfully!");
    } catch (err: any) {
        message.error("Error saving client: " + err.message);
    } finally {
        setLoading(false);
    }
  };

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `logos/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error } = await supabaseClient.storage.from("website-assets").upload(fileName, file);
      if (error) throw error;
      const { data } = supabaseClient.storage.from("website-assets").getPublicUrl(fileName);
      
      form.setFieldValue("logo_url", data.publicUrl);
      onSuccess(data.publicUrl);
      message.success("Logo updated!");
    } catch (error: any) { onError(error); message.error("Upload failed"); }
  };

  return (
    <Edit 
        saveButtonProps={{ 
            ...saveButtonProps, 
            onClick: () => form.submit(), 
            loading: loading 
        }}
    >
      <Form 
        {...formProps} 
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item label="Client Name" name="client_name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Display Order" name="display_order">
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>
        
        <Form.Item name="logo_url" hidden><Input /></Form.Item>
        
        <Form.Item 
          label="Logo Image"
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
            key={defaultFileList.length ? "loaded" : "empty"}
          >
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Replace Logo</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Edit>
  );
};