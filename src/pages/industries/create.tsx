import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const IndustryCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item 
            label="Industry Title" 
            name="title" 
            style={{ flex: 1 }}
            rules={[{ required: true }]}
          >
            <Input placeholder="e.g. SaaS & B2B Tech" />
          </Form.Item>
          <Form.Item 
            label="URL Slug" 
            name="slug" 
            style={{ flex: 1 }}
            rules={[{ required: true }]}
            help="Must be unique (e.g. 'saas', 'retail', 'bfsi')"
          >
            <Input placeholder="saas" />
          </Form.Item>
        </div>

        <Form.Item label="Subtitle" name="subtitle">
          <Input placeholder="e.g. Scaling ARR & NRR" />
        </Form.Item>

        <div style={{ display: "flex", gap: "16px" }}>
           <Form.Item 
             label="Icon Name (Lucide)" 
             name="icon_name" 
             style={{ flex: 1 }}
             help="e.g. Server, ShoppingBag, Shield"
           >
            <Input />
          </Form.Item>
        </div>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Our Approach" name="approach">
          <Input.TextArea rows={3} />
        </Form.Item>

        {/* Array Fields */}
        <Form.Item 
          label="Industry Challenges (Press Enter to add)" 
          name="challenges"
        >
          <Select mode="tags" placeholder="Type challenge and press Enter" tokenSeparators={[',']} />
        </Form.Item>

        <Form.Item 
          label="Impact Outcomes (Press Enter to add)" 
          name="outcomes"
        >
          <Select mode="tags" placeholder="Type outcome and press Enter" tokenSeparators={[',']} />
        </Form.Item>

        <Form.Item 
          label="Related Framework Slugs" 
          name="framework_slugs"
          help="Enter the slugs of frameworks used (e.g. 'victory', 'cx-maturity')"
        >
          <Select mode="tags" placeholder="Type slug and press Enter" tokenSeparators={[',']} />
        </Form.Item>
      </Form>
    </Create>
  );
};