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
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input placeholder="e.g. SaaS & B2B Tech" />
          </Form.Item>
          <Form.Item 
            label="URL Slug" 
            name="slug" 
            style={{ flex: 1 }}
            rules={[{ required: true, message: "Slug is required" }]}
            help="Must be unique (e.g. 'saas', 'retail')"
          >
            <Input placeholder="saas" />
          </Form.Item>
        </div>

        <Form.Item 
          label="Subtitle" 
          name="subtitle"
          rules={[{ required: true, message: "Subtitle is required" }]}
        >
          <Input placeholder="e.g. Scaling ARR & NRR" />
        </Form.Item>

        <Form.Item 
          label="Icon Name (Lucide React)" 
          name="icon_name" 
          help="e.g. Server, ShoppingBag, Shield"
        >
          <Input />
        </Form.Item>

        <Form.Item label="Description (Hero Text)" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Our Tailored Approach" name="approach">
          <Input.TextArea rows={4} />
        </Form.Item>

        {/* Array Fields - Press Enter to add items */}
        <Form.Item 
          label="Industry Challenges (Press Enter to add)" 
          name="challenges"
        >
          <Select mode="tags" placeholder="Type challenge and press Enter" tokenSeparators={[',']} open={false} />
        </Form.Item>

        <Form.Item 
          label="Impact Outcomes (Press Enter to add)" 
          name="outcomes"
        >
          <Select mode="tags" placeholder="Type outcome and press Enter" tokenSeparators={[',']} open={false} />
        </Form.Item>

        <Form.Item 
          label="Related Framework Slugs" 
          name="framework_slugs"
          help="Enter the slugs of frameworks used (e.g. 'victory', 'cx-maturity')"
        >
          <Select mode="tags" placeholder="Type slug and press Enter" tokenSeparators={[',']} open={false} />
        </Form.Item>
      </Form>
    </Create>
  );
};