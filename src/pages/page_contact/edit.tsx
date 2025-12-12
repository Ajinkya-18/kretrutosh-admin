import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import { RichTextEditor } from "../../components/RichTextEditor";

export const PageContactEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Hero Title" name="hero_title" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Address / Details (Rich HTML)" name="address_html"><RichTextEditor /></Form.Item>
        <Form.Item label="Google Map Embed Code (Iframe)" name="map_embed">
            <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
