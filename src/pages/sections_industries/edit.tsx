import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Switch, Divider } from "antd";

export const SectionsIndustriesEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
         <div className="flex gap-4">
             <Form.Item
                label="Industry Slug"
                name="industry_slug"
                className="w-1/3"
            >
                <Input disabled /> 
            </Form.Item>
            <Form.Item
            label="Section Key"
            name="section_key"
            className="w-1/3"
            >
            <Input disabled />
            </Form.Item>
             <Form.Item
            label="Order"
            name="display_order"
            className="w-1/4"
            >
            <InputNumber />
            </Form.Item>
         </div>

        <Divider orientation="left">Content</Divider>
        <Form.Item label="Title" name="title"><Input /></Form.Item>
        <Form.Item label="Subtitle" name="subtitle"><Input.TextArea rows={2} /></Form.Item>
        <Form.Item label="Description" name="description"><Input.TextArea rows={4} /></Form.Item>

        <Divider orientation="left">Specific Data (JSON)</Divider>
        <Form.Item label="JSON Data" name="specific_data">
             <Input.TextArea rows={8} style={{ fontFamily: 'monospace' }} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
