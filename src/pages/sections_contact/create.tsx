import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Switch, Divider, Button, Alert } from "antd";
import { Settings, Trash2, Plus, GripVertical } from "lucide-react";

export const SectionsContactCreate = () => {
    const { formProps, saveButtonProps, form } = useForm();
    const sectionKey = Form.useWatch('section_key', form);
  
    return (
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
          <div className="flex gap-4">
              <Form.Item
                label="Section Type"
                name="section_key"
                rules={[{ required: true }]}
                className="w-1/3"
                help="Select the block type."
              >
                  <Select placeholder="Select Type">
                      <Select.Option value="info_block">Contact Details Grid</Select.Option>
                      <Select.Option value="strategy_block">Strategy Points List</Select.Option>
                      <Select.Option value="generic">Text Block / Hero</Select.Option>
                  </Select>
              </Form.Item>
              <Form.Item
                label="Order"
                name="display_order"
                rules={[{ required: true }]}
                className="w-1/4"
              >
                <InputNumber min={1} max={20} className="w-full" />
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
  
          <Divider orientation="left">Content</Divider>
          <Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
          <Form.Item label="Subtitle" name="subtitle"><Input.TextArea rows={2} /></Form.Item>

          {/* VISUAL BUILDER */}
          <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
             <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                 <Settings className="w-5 h-5" />
                 Content Configuration
             </h3>

             {/* CONTACT INFO BUILDER */}
             {sectionKey === 'info_block' && (
                 <Form.List name={['specific_data', 'items']}>
                     {(fields, { add, remove }) => (
                         <div className="space-y-3">
                             {fields.map(({ key, name, ...restField }) => (
                                 <div key={key} className="flex flex-col md:flex-row gap-2 bg-white p-3 rounded border border-gray-200 shadow-sm items-start md:items-center">
                                     <Form.Item {...restField} name={[name, 'type']} className="mb-0 w-32" initialValue="email">
                                         <Select>
                                             <Select.Option value="email">Email</Select.Option>
                                             <Select.Option value="phone">Phone</Select.Option>
                                             <Select.Option value="location">Location</Select.Option>
                                             <Select.Option value="linkedin">LinkedIn</Select.Option>
                                         </Select>
                                     </Form.Item>
                                     <Form.Item {...restField} name={[name, 'label']} className="mb-0 flex-1" rules={[{ required: true }]}>
                                         <Input placeholder="Label (e.g. Email)" />
                                     </Form.Item>
                                     <Form.Item {...restField} name={[name, 'value']} className="mb-0 flex-1" rules={[{ required: true }]}>
                                         <Input placeholder="Value (e.g. hello@...)" />
                                     </Form.Item>
                                     <Button type="text" danger icon={<Trash2 size={16} />} onClick={() => remove(name)} />
                                 </div>
                             ))}
                             <Button type="dashed" onClick={() => add()} block icon={<Plus size={16} />}>Add Contact Detail</Button>
                         </div>
                     )}
                 </Form.List>
             )}

             {/* STRATEGY POINTS BUILDER */}
             {sectionKey === 'strategy_block' && (
                 <Form.List name={['specific_data', 'items']}>
                     {(fields, { add, remove }) => (
                         <div className="space-y-3">
                             {fields.map(({ key, name, ...restField }) => (
                                 <div key={key} className="flex gap-2 items-center bg-white p-3 rounded border border-gray-200 shadow-sm">
                                     <Form.Item {...restField} name={[name, 'text']} className="mb-0 flex-1" rules={[{ required: true }]}>
                                         <Input placeholder="Strategy point..." />
                                     </Form.Item>
                                     <Button type="text" danger icon={<Trash2 size={16} />} onClick={() => remove(name)} />
                                 </div>
                             ))}
                             <Button type="dashed" onClick={() => add()} block icon={<Plus size={16} />}>Add Point</Button>
                         </div>
                     )}
                 </Form.List>
             )}

             {!['info_block', 'strategy_block'].includes(sectionKey) && (
                 <Form.Item label="Content Body" name="content_body" help="Standard text content.">
                     <Input.TextArea rows={6} />
                 </Form.Item>
             )}
          </div>
  
          <div className="grid grid-cols-2 gap-4">
              <Form.Item label="Grid Columns" name="grid_columns" initialValue={1}>
                  <Select>
                      <Select.Option value={1}>1 Column</Select.Option>
                      <Select.Option value={2}>2 Columns</Select.Option>
                      <Select.Option value={3}>3 Columns</Select.Option>
                  </Select>
              </Form.Item>
               <Form.Item label="Alignment" name="alignment" initialValue="left">
                  <Select>
                      <Select.Option value="left">Left Aligned</Select.Option>
                      <Select.Option value="center">Center Aligned</Select.Option>
                      <Select.Option value="right">Right Aligned</Select.Option>
                  </Select>
              </Form.Item>
              <Form.Item label="Background Theme" name="bg_theme" initialValue="light">
                  <Select>
                      <Select.Option value="light">Light (White)</Select.Option>
                      <Select.Option value="navy">Dark (Navy)</Select.Option>
                      <Select.Option value="gray">Accent (Gray)</Select.Option>
                  </Select>
              </Form.Item>
          </div>
        </Form>
      </Create>
    );
};
