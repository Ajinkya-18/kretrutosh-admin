import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Switch, Alert, Button } from "antd";
import { Eye } from "lucide-react";

export const SectionsHomeEdit = () => {
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
                    onClick={() => window.open(`https://kretrutosh.com/`, '_blank')}
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
            help="Keep titles concise for better impact."
        >
          <Input size="large" className="font-bold" />
        </Form.Item>

        <Form.Item 
            label="Subtitle / Description" 
            name="subtitle"
        >
          <Input.TextArea rows={2} showCount maxLength={200} />
        </Form.Item>

        <Form.Item 
            label="Main Content / Description" 
            name="description"
            help="For lists, use new lines or bullet points if instructed."
        >
          <Input.TextArea rows={6} />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Form.Item label="Layout Structure" name="grid_columns">
                <Select>
                    <Select.Option value={1}>Full Width (1 Col)</Select.Option>
                    <Select.Option value={2}>Split / Side-by-Side (2 Cols)</Select.Option>
                    <Select.Option value={3}>Standard Grid (3 Cols)</Select.Option>
                    <Select.Option value={4}>Dense Grid (4 Cols)</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="Text Alignment" name="alignment">
                <Select>
                    <Select.Option value="left">Left Aligned</Select.Option>
                    <Select.Option value="center">Centered</Select.Option>
                    <Select.Option value="right">Right Aligned</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="Background Color" name="bg_theme">
                <Select>
                    <Select.Option value="light">White / Default</Select.Option>
                    <Select.Option value="navy">Navy (Brand Dark)</Select.Option>
                    <Select.Option value="gray">Light Gray (Subtle)</Select.Option>
                </Select>
            </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-6">
             <Form.Item label="Link / Button Text" name="primary_cta_text"><Input /></Form.Item>
             <Form.Item label="Link URL" name="primary_cta_link"><Input /></Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-6">
            <Form.Item label="Display Order" name="display_order">
                <InputNumber min={1} max={20} className="w-full" />
            </Form.Item>
            <Form.Item label="Visible on Site?" name="is_visible" valuePropName="checked">
                <Switch />
            </Form.Item>
        </div>

        {/* Dynamic Visual Editor based on Section Key */}
        <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">Content Manager</h3>
            
            {/* Visual Editor for Growth Engine */}
            {record?.section_key === 'growth_engine' && (
                <Form.List name={['specific_data', 'motions']}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200 relative group">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pr-8">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'title']}
                                            label="Title"
                                            rules={[{ required: true, message: 'Missing title' }]}
                                            className="mb-2"
                                        >
                                            <Input placeholder="e.g. Sales Velocity" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'icon']}
                                            label="Icon"
                                            className="mb-2"
                                        >
                                           <Select placeholder="Select Icon">
                                               <Select.Option value="Target">Target (Strategy)</Select.Option>
                                               <Select.Option value="TrendingUp">Trending Up (Growth)</Select.Option>
                                               <Select.Option value="Users">Users (Community)</Select.Option>
                                               <Select.Option value="Zap">Zap (Speed/AI)</Select.Option>
                                               <Select.Option value="Heart">Heart (Culture)</Select.Option>
                                           </Select>
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'description']}
                                            label="Description"
                                            className="mb-2 md:col-span-2"
                                        >
                                            <Input.TextArea rows={2} placeholder="Brief benefit description..." />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'link']}
                                            label="Link URL"
                                            className="mb-0 md:col-span-2"
                                        >
                                            <Input placeholder="/services/example-service" />
                                        </Form.Item>
                                    </div>
                                    <Button 
                                        type="text" 
                                        danger 
                                        onClick={() => remove(name)} 
                                        className="absolute top-2 right-2 opacity-50 hover:opacity-100"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block>
                                    + Add Service Tile
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            )}

            {/* Visual Editor for Outcomes List */}
            {record?.section_key === 'outcomes' && (
                <Form.List name={['specific_data', 'items']}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className="flex gap-2 mb-2">
                                     <Form.Item
                                        {...restField}
                                        name={[name]}
                                        className="mb-0 flex-1"
                                        rules={[{ required: true, message: 'Missing item' }]}
                                    >
                                        <Input placeholder="Outcome item (e.g. 'Revenue Growth')" />
                                    </Form.Item>
                                    <Button type="text" danger onClick={() => remove(name)}>X</Button>
                                </div>
                            ))}
                            <Form.Item className="mt-4">
                                <Button type="dashed" onClick={() => add()} block>
                                    + Add Outcome Item
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            )}

            {/* Thought Leadership: Cards List (Podcast, Book, etc.) */}
            {record?.section_key === 'thought_leadership' && (
                <div className="space-y-4">
                    <Form.List name={['specific_data', 'cards']}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map(({ key, name, ...restField }) => (
                                    <div key={key} className="mb-6 p-4 bg-gray-50 rounded border border-gray-200 relative">
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'badge']}
                                                label="Badge / Tag"
                                                rules={[{ required: true }]}
                                            >
                                                <Input placeholder="e.g. Podcast" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'title']}
                                                label="Card Title"
                                                rules={[{ required: true }]}
                                            >
                                                <Input placeholder="Title" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'description']}
                                                label="Description"
                                                className="md:col-span-2"
                                            >
                                                <Input.TextArea rows={2} placeholder="Brief description..." />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'cta_text']}
                                                label="CTA Text"
                                            >
                                                <Input placeholder="e.g. Listen Now" />
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'link']}
                                                label="Destination Link"
                                            >
                                                <Select 
                                                    showSearch
                                                    allowClear
                                                    placeholder="Select or type path"
                                                    optionFilterProp="children"
                                                >
                                                    <Select.Option value="/resources/podcast">Podcast List</Select.Option>
                                                    <Select.Option value="/book">Book Page</Select.Option>
                                                    <Select.Option value="/resources/articles">LinkedIn Articles</Select.Option>
                                                    <Select.Option value="/resources/whitepapers">Whitepapers</Select.Option>
                                                    <Select.Option value="/about">About Page</Select.Option>
                                                    <Select.Option value="/contact">Contact Page</Select.Option>
                                                    <Select.Option value="/services">Services Page</Select.Option>
                                                </Select>
                                            </Form.Item>
                                            <Form.Item
                                                {...restField}
                                                name={[name, 'image_url']}
                                                label="Image URL"
                                                className="md:col-span-2"
                                                help="Paste a full URL (https://...) to override the default image."
                                            >
                                                <Input placeholder="https://example.com/my-image.jpg" />
                                            </Form.Item>
                                        </div>
                                        <Button 
                                            type="text" 
                                            danger 
                                            onClick={() => remove(name)} 
                                            className="absolute top-2 right-2"
                                        >
                                            Remove Card
                                        </Button>
                                    </div>
                                ))}
                                <Button type="dashed" onClick={() => add()} block>
                                    + Add Tab / Card
                                </Button>
                            </>
                        )}
                    </Form.List>
                </div>
            )}

            {/* Fallback JSON Editor */}
             {!['growth_engine', 'outcomes', 'thought_leadership'].includes(record?.section_key) && (
                 <div className="bg-yellow-50 p-4 rounded border border-yellow-200">
                     <p className="text-yellow-800 text-sm mb-2 font-bold">Raw Data Editor (Advanced)</p>
                     <Form.Item 
                        name="specific_data"
                        label="Raw Data (JSON)"
                        getValueProps={(value) => ({
                            value: typeof value === 'string' ? value : JSON.stringify(value, null, 2),
                        })}
                        getValueFromEvent={(e) => {
                            try { return JSON.parse(e.target.value); } catch (err) { return e.target.value; }
                        }}
                    >
                        <Input.TextArea rows={6} className="font-mono text-xs" />
                    </Form.Item>
                 </div>
             )}
        </div>
      </Form>
    </Edit>
  );
};
