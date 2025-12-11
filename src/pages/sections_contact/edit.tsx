import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Switch, Alert, Button } from "antd";
import { Eye, Plus, Trash2 } from "lucide-react";

export const SectionsContactEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  const record = queryResult?.data?.data;

  const adminInstruction = record?.admin_instruction;

  return (
    <Edit 
        saveButtonProps={saveButtonProps}
        headerButtons={({ defaultButtons }) => (
            <>
                {defaultButtons}
                <Button 
                    type="primary" 
                    ghost 
                    icon={<Eye size={16} />} 
                    onClick={() => window.open(`https://kretrutosh.com/contact`, '_blank')}
                >
                    View Live Page
                </Button>
            </>
        )}
    >
      <Form {...formProps} layout="vertical">
        {adminInstruction && (
            <Alert 
                message="Editor Instructions"
                description={adminInstruction}
                type="info"
                showIcon
                className="mb-6 border-blue-200 bg-blue-50"
            />
        )}

        <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
            <Form.Item label="Section Key (ID)" name="section_key">
                <Input disabled className="font-mono text-gray-500" />
            </Form.Item>
             <Form.Item label="Page (Slug)" name="page_slug">
                <Input disabled className="font-mono text-gray-500" />
            </Form.Item>
        </div>

        <Form.Item 
            label="Section Title" 
            name="title" 
            rules={[{ required: true }]}
        >
          <Input size="large" className="font-bold" placeholder="e.g. Get in Touch" />
        </Form.Item>

         <Form.Item 
            label="Subtitle" 
            name="subtitle"
        >
          <Input.TextArea rows={2} showCount maxLength={200} placeholder="e.g. We'd love to hear from you." />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <Form.Item label="Text Alignment" name="alignment" help="Anchor for text block.">
                <Select>
                    <Select.Option value="left">Left Aligned</Select.Option>
                    <Select.Option value="center">Center Aligned</Select.Option>
                    <Select.Option value="right">Right Aligned</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Grid Layout" name="grid_columns" help="Columns on Desktop.">
                <Select>
                    <Select.Option value={1}>Full Width (1 Col)</Select.Option>
                    <Select.Option value={2}>Half Width (2 Cols)</Select.Option>
                    <Select.Option value={3}>Thirds (3 Cols)</Select.Option>
                    <Select.Option value={4}>Quarters (4 Cols)</Select.Option>
                </Select>
            </Form.Item>
        </div>

        {/* Visual Content Editors */}
        <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
             <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">Content Manager</h3>

             {/* Info Block (Contact Details) */}
             {record?.section_key === 'info_block' && (
                 <div className="space-y-4">
                     <Alert message="Manage Contact Methods" type="info" showIcon className="mb-4"/>
                     <Form.List name={['specific_data', 'items']}>
                         {(fields, { add, remove }) => (
                             <>
                                 {fields.map(({ key, name, ...restField }) => (
                                     <div key={key} className="flex gap-4 items-start p-4 bg-gray-50 border border-gray-100 rounded-lg">
                                         <Form.Item
                                            {...restField}
                                            name={[name, 'type']}
                                            label="Type / Icon"
                                            className="w-40 mb-0"
                                            initialValue="email"
                                         >
                                             <Select>
                                                 <Select.Option value="email">Email</Select.Option>
                                                 <Select.Option value="phone">Phone</Select.Option>
                                                 <Select.Option value="location">Location</Select.Option>
                                                 <Select.Option value="linkedin">LinkedIn</Select.Option>
                                             </Select>
                                         </Form.Item>
                                         <Form.Item
                                            {...restField}
                                            name={[name, 'label']}
                                            label="Label"
                                            className="flex-1 mb-0"
                                            rules={[{ required: true }]}
                                         >
                                             <Input placeholder="e.g. Email Us" />
                                         </Form.Item>
                                         <Form.Item
                                            {...restField}
                                            name={[name, 'value']}
                                            label="Value"
                                            className="flex-[2] mb-0"
                                            rules={[{ required: true }]}
                                         >
                                             <Input placeholder="e.g. hello@example.com" />
                                         </Form.Item>
                                         <Button type="text" danger icon={<Trash2 size={16} />} onClick={() => remove(name)} className="mt-8" />
                                     </div>
                                 ))}
                                 <Button type="dashed" onClick={() => add()} block icon={<Plus size={16} />}>
                                     Add Contact Detail
                                 </Button>
                             </>
                         )}
                     </Form.List>
                 </div>
             )}

             {/* Strategy Block (Bullets) */}
             {record?.section_key === 'strategy_block' && (
                 <div className="space-y-4">
                    <Alert message="Manage Strategy Points" type="info" showIcon className="mb-4"/>
                    <Form.List name={['specific_data', 'items']}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} className="flex gap-4 items-center mb-2">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'text']}
                                            className="flex-1 mb-0"
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder="Strategy point..." />
                                        </Form.Item>
                                        <Button type="text" danger icon={<Trash2 size={16} />} onClick={() => remove(name)} />
                                    </div>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<Plus size={16} />}>
                                    Add Point
                                </Button>
                            </>
                        )}
                    </Form.List>
                 </div>
             )}

             {/* Fallback Legacy Editor */}
             {!['info_block', 'strategy_block'].includes(record?.section_key) && (
                 <Form.Item 
                    label="Content Body (Legacy)" 
                    name="content_body"
                    help="Use this for simple text blocks."
                >
                    <Input.TextArea rows={8} />
                </Form.Item>
             )}
        </div>

        <div className="grid grid-cols-2 gap-6 mt-6">
            <Form.Item 
                label="Display Order" 
                name="display_order"
                help="Sequence on page (1-20)"
            >
                <InputNumber min={1} max={20} className="w-full" />
            </Form.Item>
            <Form.Item label="Visible on Site?" name="is_visible" valuePropName="checked">
                <Switch />
            </Form.Item>
        </div>
      </Form>
    </Edit>
  );
};
