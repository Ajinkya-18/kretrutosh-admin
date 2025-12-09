import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Switch, Divider } from "antd";

export const SectionsIndustryDetailsCreate = () => {
    const { formProps, saveButtonProps } = useForm();
  
    return (
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
           <div className="flex gap-4">
               <Form.Item
                  label="Industry Slug (Parent)"
                  name="parent_slug"
                  className="w-1/3"
                  rules={[{ required: true }]}
              >
                  <Input placeholder="e.g. retail" />
              </Form.Item>
              <Form.Item
                  label="Section Key"
                  name="section_key"
                  rules={[{ required: true }]}
                  className="w-1/3"
              >
                  <Input placeholder="e.g. challenges" />
              </Form.Item>
               <Form.Item
                  label="Order"
                  name="display_order"
                  rules={[{ required: true }]}
                  className="w-1/4"
              >
                  <InputNumber />
              </Form.Item>
           </div>
           
           <Form.Item label="Visible" name="is_visible" valuePropName="checked"><Switch /></Form.Item>
  
          <Divider orientation="left">Content</Divider>
          <Form.Item label="Title" name="title"><Input /></Form.Item>
          <Form.Item label="Content Body (Markdown/Text)" name="content_body">
               <Input.TextArea rows={6} />
          </Form.Item>
          <Form.Item label="Image URL" name="image_url"><Input /></Form.Item>

          <Divider orientation="left">Layout Config</Divider>
          <div className="flex gap-4">
              <Form.Item label="Grid Columns" name="grid_columns" initialValue={1} className="w-1/4">
                  <Select options={[
                      { label: "1 Column", value: 1 },
                      { label: "2 Columns", value: 2 },
                      { label: "3 Columns", value: 3 },
                      { label: "4 Columns", value: 4 },
                  ]} />
              </Form.Item>
              <Form.Item label="Alignment" name="alignment" initialValue="left" className="w-1/4">
                  <Select options={[
                      { label: "Left", value: "left" },
                      { label: "Center", value: "center" },
                      { label: "Right", value: "right" },
                  ]} />
              </Form.Item>
              <Form.Item label="Theme" name="bg_theme" initialValue="light" className="w-1/4">
                  <Select options={[
                      { label: "Light", value: "light" },
                      { label: "Muted/Gray", value: "gray" },
                      { label: "Dark/Navy", value: "navy" },
                  ]} />
              </Form.Item>
          </div>
        </Form>
      </Create>
    );
  };
