import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";

export const PageHomeEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Hero Title" name="hero_title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Hero Subtitle" name="hero_subtitle">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Hero Video URL" name="hero_video_url">
           <Input placeholder="https://youtube.com/..." />
        </Form.Item>

        <Form.Item label="Growth Engine Section Title" name="growth_engine_title">
           <Input />
        </Form.Item>
        <Form.Item label="Frameworks Section Title" name="frameworks_title">
           <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
