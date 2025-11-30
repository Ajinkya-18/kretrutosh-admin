import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const AssessmentEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="External Link" name="external_link" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Icon Name" name="icon_name">
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};