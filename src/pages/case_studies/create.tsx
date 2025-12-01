import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const CaseStudyCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item 
          label="Case Study Title" 
          name="title" 
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input placeholder="e.g. Digital Transformation Success" />
        </Form.Item>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item 
            label="Client Name" 
            name="client_name" 
            style={{ flex: 1 }}
          >
            <Input placeholder="e.g. Insular Life" />
          </Form.Item>
          <Form.Item 
            label="Industry" 
            name="industry" 
            style={{ flex: 1 }}
          >
            <Input placeholder="e.g. Insurance" />
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
          <Select 
            mode="tags" 
            placeholder="Type result and press Enter" 
            tokenSeparators={[',']} 
            open={false} 
          />
        </Form.Item>

        <Form.Item 
          label="Tags" 
          name="tags"
          help="Example: 'Digital Transformation', 'Cloud Migration'"
        >
          <Select 
            mode="tags" 
            placeholder="Type tag and press Enter" 
            tokenSeparators={[',']} 
            open={false} 
          />
        </Form.Item>
      </Form>
    </Create>
  );
};