import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Switch, Divider } from "antd";

export const SectionsAboutCreate = () => {
    const { formProps, saveButtonProps } = useForm();
  
    return (
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
          <div className="flex gap-4">
              <Form.Item
              label="Section Key"
              name="section_key"
              rules={[{ required: true }]}
              className="w-1/3"
              >
              <Input placeholder="e.g. hero, stats" />
              </Form.Item>
              <Form.Item
              label="Order"
              name="display_order"
              rules={[{ required: true }]}
              className="w-1/4"
              >
              <InputNumber />
              </Form.Item>
              <Form.Item
              label="Visible"
              name="is_visible"
              valuePropName="checked"
              initialValue={true}
              >
              <Switch />
              </Form.Item>
          </div>
  
          <Divider orientation="left">Layout Control</Divider>
          <div className="grid grid-cols-3 gap-4">
               <Form.Item
                  label="Grid Columns"
                  name="grid_columns"
                  initialValue={1}
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
                  initialValue="left"
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
                  initialValue="light"
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
            label="Description / Content Body"
            name="content_body"
            help="Main text content for this section."
          >
            <Input.TextArea rows={6} />
          </Form.Item>
        </Form>
      </Create>
    );
  };
