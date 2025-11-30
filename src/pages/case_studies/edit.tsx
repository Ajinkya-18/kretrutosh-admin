import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const CaseStudyEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Case Study Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Client Name" name="client" style={{ flex: 1 }}>
            <Input />
          </Form.Item>
          <Form.Item label="Industry" name="industry" style={{ flex: 1 }}>
            <Input />
          </Form.Item>
        </div>

        <Form.Item label="The Challenge" name="challenge">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="The Solution" name="solution">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Key Results" name="results">
          <Select mode="tags" placeholder="Type result and press Enter" tokenSeparators={[',']} />
        </Form.Item>

        <Form.Item label="Tags" name="tags">
          <Select mode="tags" placeholder="Type tag and press Enter" tokenSeparators={[',']} />
        </Form.Item>
      </Form>
    </Edit>
  );
};