import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select } from "antd";

export const IndustryEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item 
            label="Industry Title" 
            name="title" 
            style={{ flex: 1 }} 
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="URL Slug" 
            name="slug" 
            style={{ flex: 1 }} 
            rules={[{ required: true, message: "Slug is required" }]}
          >
            <Input />
          </Form.Item>
        </div>

        <Form.Item label="Subtitle" name="subtitle" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Icon Name (Lucide React)" name="icon_name">
          <Input />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Our Tailored Approach" name="approach">
          <Input.TextArea rows={4} />
        </Form.Item>

        <Form.Item label="Industry Challenges" name="challenges">
          <Select mode="tags" tokenSeparators={[',']} open={false} />
        </Form.Item>

        <Form.Item label="Impact Outcomes" name="outcomes">
          <Select mode="tags" tokenSeparators={[',']} open={false} />
        </Form.Item>

        <Form.Item label="Related Framework Slugs" name="framework_slugs">
          <Select mode="tags" tokenSeparators={[',']} open={false} />
        </Form.Item>
      </Form>
    </Edit>
  );
};