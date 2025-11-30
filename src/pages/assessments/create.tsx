import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const AssessmentCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input placeholder="e.g. CX Maturity Assessment" />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item 
          label="External Link (Microsoft Form URL)" 
          name="external_link"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        {/* Helper for icons - Client types the name found in Lucide React */}
        <Form.Item 
          label="Icon Name (Lucide React)" 
          name="icon_name"
          help="e.g. ClipboardCheck, Users, BrainCircuit"
        >
          <Input placeholder="ClipboardCheck" />
        </Form.Item>
      </Form>
    </Create>
  );
};