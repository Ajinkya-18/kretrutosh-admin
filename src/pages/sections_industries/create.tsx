import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Switch, Divider } from "antd";

export const SectionsIndustriesCreate = () => {
    const { formProps, saveButtonProps } = useForm();
  
    return (
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
           <div className="flex gap-4">
               <Form.Item
                  label="Industry Slug"
                  name="page_slug"
                  className="w-1/3"
                  rules={[{ required: true }]}
              >
                  <Input placeholder="e.g. saas" />
              </Form.Item>
              <Form.Item
              label="Section Key"
              name="section_key"
              rules={[{ required: true }]}
              className="w-1/3"
              >
              <Input placeholder="e.g. hero" />
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
  
          <Divider orientation="left">Content</Divider>
          <Form.Item label="Title" name="title"><Input /></Form.Item>
  
          <Divider orientation="left">Specific Data (JSON)</Divider>
          <Form.Item label="JSON Data" name="specific_data">
               <Input.TextArea rows={8} style={{ fontFamily: 'monospace' }} />
          </Form.Item>
        </Form>
      </Create>
    );
  };
