import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Switch, Divider, Alert } from "antd";

export const SectionsIndustriesEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  const record = queryResult?.data?.data;

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
         {record?.admin_instruction && (
            <Alert
                message="Client Instruction"
                description={record.admin_instruction}
                type="info"
                showIcon
                className="mb-6"
            />
        )}
         <div className="flex gap-4">
             <Form.Item
                label="Page Slug"
                name="page_slug"
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
            <Form.Item
            label="Visible"
            name="is_visible"
            valuePropName="checked"
            >
            <Switch />
            </Form.Item>
         </div>

        <Divider orientation="left">Layout Config</Divider>
        <div className="grid grid-cols-3 gap-4">
             <Form.Item label="Grid Columns" name="grid_columns">
                <InputNumber min={1} max={4} className="w-full" />
            </Form.Item>
             <Form.Item label="Alignment" name="alignment">
                <Select options={[{label:"Left", value:"left"}, {label:"Center", value:"center"}, {label:"Right", value:"right"}]}/>
            </Form.Item>
            <Form.Item label="Background Theme" name="bg_theme">
                <Select options={[
                    {label:"Light (White)", value:"light"}, 
                    {label:"Navy (Brand)", value:"navy"}, 
                    {label:"Gray (Muted)", value:"gray"}
                ]}/>
            </Form.Item>
        </div>

        <Divider orientation="left">Content</Divider>
        <Form.Item label="Title" name="title"><Input /></Form.Item>
        <Form.Item label="Subtitle" name="subtitle"><Input.TextArea rows={2} /></Form.Item>
        <Form.Item label="Description" name="description"><Input.TextArea rows={4} /></Form.Item>

        <Divider orientation="left">Action</Divider>
        <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Primary CTA Text" name="primary_cta_text"><Input /></Form.Item>
            <Form.Item label="Primary CTA Link" name="primary_cta_link"><Input /></Form.Item>
        </div>

        <Divider orientation="left">Specific Data (JSON)</Divider>
        <Form.Item label="JSON Configuration" name="specific_data">
             <Input.TextArea rows={8} style={{ fontFamily: 'monospace' }} />
        </Form.Item>
      </Form>
    </Edit>
  );
};

