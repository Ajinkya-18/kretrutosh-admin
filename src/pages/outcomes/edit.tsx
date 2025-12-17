import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const OutcomeEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true, message: 'Please enter outcome title' }]}
        >
          <Input placeholder="e.g. Increased Customer Lifetime Value" />
        </Form.Item>
        <Form.Item
          label="Icon"
          name="icon"
          help="Lucide icon name (default: check-circle)"
        >
          <Input placeholder="check-circle" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
