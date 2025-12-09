import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Switch, Divider } from "antd";

export const SectionsHomeEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <div className="flex gap-4">
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
             <Form.Item
                label="Grid Columns"
                name="grid_columns"
                help="Controls the number of items per row (e.g. 3 cards wide)"
            >
                <Select
                    options={[
                        { label: "1 Column", value: 1 },
                        { label: "2 Columns", value: 2 },
                        { label: "3 Columns", value: 3 },
                        { label: "4 Columns", value: 4 },
                        { label: "5 Columns", value: 5 },
                    ]}
                />
            </Form.Item>
             <Form.Item
                label="Alignment"
                name="alignment"
            >
                <Select
                    options={[
                        { label: "Left Aligned", value: "left" },
                        { label: "Center Aligned", value: "center" },
                        { label: "Right Aligned", value: "right" },
                    ]}
                />
            </Form.Item>
            <Form.Item
                label="Background Theme"
                name="bg_theme"
            >
                <Select
                    options={[
                        { label: "Light (White)", value: "light" },
                        { label: "Dark (Navy)", value: "navy" },
                        { label: "Muted (Grey)", value: "muted" },
                    ]}
                />
            </Form.Item>
        </div>

        <Divider orientation="left">Content</Divider>
        <Form.Item
          label="Badge / Tag"
          name="badge"
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Subtitle"
          name="subtitle"
        >
          <Input.TextArea rows={2} />
        </Form.Item>
        <Form.Item
          label="Main Description"
          name="description"
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Divider orientation="left">Call to Actions</Divider>
        <div className="grid grid-cols-2 gap-4">
            <Form.Item label="Primary CTA Text" name="primary_cta_text"><Input /></Form.Item>
            <Form.Item label="Primary CTA Link" name="primary_cta_link"><Input /></Form.Item>
            <Form.Item label="Secondary CTA Text" name="secondary_cta_text"><Input /></Form.Item>
            <Form.Item label="Secondary CTA Link" name="secondary_cta_link"><Input /></Form.Item>
        </div>
        
        <Divider orientation="left">Advanced Data (JSON)</Divider>
        <Form.Item
            label="Specific Data (JSON)"
            name="specific_data"
            help="For complex lists like 'motions' or 'outcomes'"
        >
             {/* Simple Text Area for JSON for now. Ideally use a JSON editor */}
             <Input.TextArea rows={6} disabled style={{ fontFamily: 'monospace' }} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
