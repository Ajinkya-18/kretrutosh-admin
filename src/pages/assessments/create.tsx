import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const AssessmentCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item 
          label="Title" 
          name="title" 
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="e.g. CX Maturity Assessment" />
        </Form.Item>
        
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} placeholder="Briefly describe what this assessment measures..." />
        </Form.Item>
        
        <Form.Item 
          label="External Link (Microsoft Form URL)" 
          name="external_link"
          rules={[{ required: true, message: "Please provide the form link" }]}
        >
          <Input placeholder="https://forms.office.com/..." />
        </Form.Item>
        
        <Form.Item 
          label="Icon Name (Lucide React)" 
          name="icon_name"
          help={<span>Find icon names on <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer">lucide.dev</a> (e.g. ClipboardCheck, Users)</span>}
        >
          <Input placeholder="ClipboardCheck" />
        </Form.Item>
      </Form>
    </Create>
  );
};