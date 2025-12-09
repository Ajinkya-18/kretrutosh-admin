import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const AssessmentEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item 
          label="Title" 
          name="title" 
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        
        <Form.Item 
          label="External Link (Microsoft Form URL)" 
          name="external_link" 
          rules={[{ required: true, message: "Please provide the form link" }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item 
          label="Icon Name (Lucide React)" 
          name="icon_name"
          help={<span>Find icon names on <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer">lucide.dev</a> (e.g. ClipboardCheck, Users)</span>}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};