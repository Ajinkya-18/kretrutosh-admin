import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Switch, Divider } from "antd";

export const SectionsServicesEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <div className="flex gap-4">
             <Form.Item
                label="Service Slug"
                name="service_slug"
                className="w-1/3"
            >
                <Select disabled
                    options={[
                        { label: "Pre-Sales", value: "pre-sales" },
                        { label: "Sales Velocity", value: "sales-velocity" },
                        { label: "Digital & AI", value: "digital-ai" },
                        { label: "Customer Success", value: "customer-success" },
                        { label: "Culture & Leadership", value: "culture-transformation" },
                    ]}
                />
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

        <Divider orientation="left">Layout Control</Divider>
        <div className="grid grid-cols-3 gap-4">
             <Form.Item label="Grid Columns" name="grid_columns">
                <Select options={[1,2,3,4,5].map(v => ({label: `${v} Cols`, value: v})) }/>
            </Form.Item>
             <Form.Item label="Alignment" name="alignment">
                <Select options={[{label:"Left", value:"left"}, {label:"Center", value:"center"}]}/>
            </Form.Item>
            <Form.Item label="Padding Y" name="padding_y">
                <Input />
            </Form.Item>
        </div>

        <Divider orientation="left">Content</Divider>
        <Form.Item label="Title" name="title"><Input /></Form.Item>
        <Form.Item label="Subtitle" name="subtitle"><Input.TextArea rows={2} /></Form.Item>
        <Form.Item label="Description" name="description"><Input.TextArea rows={4} /></Form.Item>
        
        <Divider orientation="left">CTAs</Divider>
        <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Primary CTA Text" name="primary_cta_text"><Input /></Form.Item>
            <Form.Item label="Primary CTA Link" name="primary_cta_link"><Input /></Form.Item>
        </div>

        <Divider orientation="left">Specific Data (JSON)</Divider>
        <Form.Item label="JSON Data" name="specific_data">
             <Input.TextArea rows={8} style={{ fontFamily: 'monospace' }} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
