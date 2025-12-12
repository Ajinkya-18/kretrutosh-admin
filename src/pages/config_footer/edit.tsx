import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Card, Space, Button } from "antd";
import { PlusOutlined, DeleteOutlined } from "@ant-design/icons";

export const ConfigFooterEdit = () => {
  const { formProps, saveButtonProps } = useForm();
  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
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
