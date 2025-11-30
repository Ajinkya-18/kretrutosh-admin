import { Create, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const VideoCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Video Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="YouTube Video ID"
          name="youtube_id"
          help="e.g. for 'youtube.com/watch?v=dQw4w9WgXcQ', enter 'dQw4w9WgXcQ'"
          rules={[{ required: true }]}
        >
          <Input placeholder="dQw4w9WgXcQ" />
        </Form.Item>
      </Form>
    </Create>
  );
};