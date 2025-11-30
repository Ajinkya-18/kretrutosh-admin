import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const CaseStudyCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Case Study Title" name="title" rules={[{ required: true }]}>
          <Input placeholder="e.g. Digital Transformation Success" />
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

        {/* Handling Arrays using Select mode="tags" */}
        <Form.Item 
          label="Key Results (Type and press Enter to add)" 
          name="results"
          help="Example: '40% cost reduction', '3x faster deployment'"
        >
          <Select mode="tags" placeholder="Type result and press Enter" tokenSeparators={[',']} />
        </Form.Item>

        <Form.Item 
          label="Tags" 
          name="tags"
        >
          <Select mode="tags" placeholder="e.g. Cloud, Agile, Transformation" tokenSeparators={[',']} />
        </Form.Item>
      </Form>
    </Create>
  );
};