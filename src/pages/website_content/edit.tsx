import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const WebsiteContentEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item label="Page" name="page_name" style={{ flex: 1 }}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Section" name="section_name" style={{ flex: 1 }}>
            <Input disabled />
          </Form.Item>
          <Form.Item label="Key" name="element_key" style={{ flex: 1 }}>
            <Input disabled />
          </Form.Item>
        </div>

        <Form.Item 
          label="Content Text (Edit this)" 
          name="content_text" 
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Helper Note (For your reference)" name="helper_note">
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};