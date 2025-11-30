import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const VideoEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
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
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};