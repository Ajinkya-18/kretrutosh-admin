import { useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Card, Space, Button, message } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const ConfigFooterEdit = () => {
  const [loading, setLoading] = useState(false);
  
  const { formProps, saveButtonProps, form } = useForm({
    action: "edit",
    id: 1, // Singleton
    queryOptions: {
        // Ensure we fetch the singleton row 1 specifically, or any single row
        select: ({ data }) => {
            return { data };
        }
    }
  });

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
        const { error } = await supabaseClient
            .from('config_footer')
            .upsert({ 
                id: 1,
                copyright_text: values.copyright_text,
                social_links: values.social_links 
            }); // Upsert handles create-if-missing for ID 1
        
        if (error) throw error;
        message.success("Footer updated successfully!");
    } catch (err: any) {
        message.error("Error saving footer: " + err.message);
    } finally {
        setLoading(false);
    }
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
        <Form.Item label="Copyright Text" name="copyright_text"><Input /></Form.Item>
        <Form.List name="social_links">
            {(fields, { add, remove }) => (
                <>
                {fields.map(({ key, name, ...restField }) => (
                    <Card size="small" style={{ marginBottom: 8 }} key={key}>
                        <Space style={{ display: 'flex' }} align="baseline">
                            <Form.Item {...restField} name={[name, 'platform']} label="Platform" rules={[{ required: true }]}>
                                <Input placeholder="LinkedIn" />
                            </Form.Item>
                            <Form.Item {...restField} name={[name, 'url']} label="URL" rules={[{ required: true }]}>
                                <Input placeholder="https://..." />
                            </Form.Item>
                            <DeleteOutlined onClick={() => remove(name)} style={{ color: 'red' }}/>
                        </Space>
                    </Card>
                ))}
                <Form.Item><Button onClick={() => add()} block icon={<PlusOutlined />}>Add Social Link</Button></Form.Item>
                </>
            )}
        </Form.List>
      </Form>
    </Edit>
  );
};
