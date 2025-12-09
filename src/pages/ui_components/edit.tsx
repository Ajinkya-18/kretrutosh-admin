import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch, Divider } from "antd";

export const UIComponentsEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <div className="flex gap-4">
             <Form.Item
                label="Component Name"
                name="name"
                className="w-1/2"
                rules={[{ required: true }]}
            >
                <Input />
            </Form.Item>
             <Form.Item
                label="Key (Unique)"
                name="component_key"
                className="w-1/3"
            >
                <Input disabled />
            </Form.Item>
            <Form.Item
            label="Active"
            name="is_active"
            valuePropName="checked"
            >
            <Switch />
            </Form.Item>
        </div>

        <Divider orientation="left">Configuration</Divider>
        <Form.Item label="Default Configuration (JSON)" name="default_config">
             <Input.TextArea rows={8} style={{ fontFamily: 'monospace' }} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
