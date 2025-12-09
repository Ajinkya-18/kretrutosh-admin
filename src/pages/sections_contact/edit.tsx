import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Switch, Divider } from "antd";

export const SectionsContactEdit = () => {
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
            >
                <Select
                    options={[
                        { label: "1 Column", value: 1 },
                        { label: "2 Columns", value: 2 },
                        { label: "3 Columns", value: 3 },
                        { label: "4 Columns", value: 4 },
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
                        { label: "Dark (Navy)", value: "dark" },
                        { label: "Accent", value: "accent" },
                    ]}
                />
            </Form.Item>
        </div>

        <Divider orientation="left">Content</Divider>
        <Form.Item
          label="Title"
          name="title"
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
          label="Description"
          name="description"
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <Divider orientation="left">Specific Data (JSON)</Divider>
        <Form.Item
            label="JSON Data"
            name="specific_data"
            help="Raw JSON configuration for this section."
        >
             <Input.TextArea rows={8} style={{ fontFamily: 'monospace' }} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
