import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Switch, Alert, Button } from "antd";
import { Eye } from "lucide-react";

export const SectionsServicesEdit = () => {
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
                    onClick={() => window.open(`https://kretrutosh.com/services`, '_blank')}
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
          <Input size="large" className="font-bold" />
        </Form.Item>

         <Form.Item 
            label="Subtitle" 
            name="subtitle"
        >
          <Input.TextArea rows={2} showCount maxLength={200} />
        </Form.Item>

        <Form.Item 
            label="Content Body" 
            name="content_body"
            help="Rich content text."
        >
          <Input.TextArea rows={6} />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Form.Item label="Layout Structure" name="grid_columns" help="How content is arranged.">
                <Select>
                    <Select.Option value={1}>Full Width (1 Col)</Select.Option>
                    <Select.Option value={2}>Split / Side-by-Side (2 Cols)</Select.Option>
                    <Select.Option value={3}>Standard Grid (3 Cols)</Select.Option>
                    <Select.Option value={4}>Quarters (4 Cols)</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Background Color" name="bg_theme" help="Choose a background style for this section.">
                <Select>
                    <Select.Option value="light">White (Default)</Select.Option>
                    <Select.Option value="navy">Navy Blue (Brand Primary)</Select.Option>
                    <Select.Option value="gray">Light Gray (Subtle)</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Text Alignment" name="alignment" help="How text should anchor within the section.">
                <Select>
                    <Select.Option value="left">Left Aligned</Select.Option>
                    <Select.Option value="center">Center Aligned</Select.Option>
                    <Select.Option value="right">Right Aligned</Select.Option>
                </Select>
            </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-6">
            <Form.Item label="Display Order" name="display_order">
                <InputNumber min={1} max={20} className="w-full" />
            </Form.Item>
            <Form.Item label="Visible on Site?" name="is_visible" valuePropName="checked">
                <Switch />
            </Form.Item>
        </div>

        {/* Icon Picker for Hero Sections */}
        {record?.section_key === 'hero' && (
            <div className="bg-blue-50 p-4 rounded-lg mb-6 border border-blue-100">
                <Form.Item label="Service Icon" name="icon" help="Icon displayed on the Homepage Growth Engine tile.">
                    <Select placeholder="Select an Icon">
                        <Select.Option value="Target">Target (Strategy)</Select.Option>
                        <Select.Option value="TrendingUp">Trending Up (Growth)</Select.Option>
                        <Select.Option value="Users">Users (Community/CS)</Select.Option>
                        <Select.Option value="Zap">Zap (Digital/AI)</Select.Option>
                        <Select.Option value="Heart">Heart (Culture)</Select.Option>
                    </Select>
                </Form.Item>
            </div>
        )}

        {/* Dynamic Visual Editor */}
        <div className="mt-8 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
            <h3 className="font-bold text-lg mb-4 text-gray-800 border-b pb-2">Content Manager</h3>

            {/* Hero: Badge */}
            {record?.section_key === 'hero' && (
                <Form.Item label="Badge Text" name={['specific_data', 'badge']}>
                    <Input placeholder="e.g. Pre-Sales Transformation" />
                </Form.Item>
            )}

            {/* Problem Block: List of Strings */}
            {record?.section_key === 'problem_block' && (
                <Form.List name={['specific_data', 'list']}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className="flex gap-2 mb-2">
                                     <Form.Item
                                        {...restField}
                                        name={[name]}
                                        className="mb-0 flex-1"
                                        rules={[{ required: true, message: 'Missing problem item' }]}
                                    >
                                        <Input placeholder="Problem item (e.g. 'Silos in teams')" />
                                    </Form.Item>
                                    <Button type="text" danger onClick={() => remove(name)}>Remove</Button>
                                </div>
                            ))}
                            <Button type="dashed" onClick={() => add()} block className="mt-2">
                                + Add Problem Item
                            </Button>
                        </>
                    )}
                </Form.List>
            )}

             {/* Approach Steps: Title + Desc */}
            {record?.section_key === 'approach_steps' && (
                <Form.List name={['specific_data', 'steps']}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className="mb-4 p-4 bg-gray-50 rounded border border-gray-200 relative">
                                    <div className="grid grid-cols-1 gap-4 pr-12">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'title']}
                                            label="Step Title"
                                            className="mb-0"
                                            rules={[{ required: true }]}
                                        >
                                            <Input placeholder="Step Title" />
                                        </Form.Item>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'desc']}
                                            label="Description"
                                            className="mb-0"
                                        >
                                            <Input.TextArea rows={2} placeholder="Description" />
                                        </Form.Item>
                                    </div>
                                    <Button 
                                        type="text" 
                                        danger 
                                        onClick={() => remove(name)} 
                                        className="absolute top-2 right-2"
                                    >
                                        Remove
                                    </Button>
                                </div>
                            ))}
                            <Button type="dashed" onClick={() => add()} block>
                                + Add Approach Step
                            </Button>
                        </>
                    )}
                </Form.List>
            )}

            {/* Outcomes Grid: Stats (Label + Value) */}
            {record?.section_key === 'outcomes_grid' && (
                <Form.List name={['specific_data', 'stats']}>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className="mb-2 flex gap-4 items-start">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'label']}
                                        label="Label (Metric)"
                                        className="mb-0 flex-1"
                                        rules={[{ required: true }]}
                                    >
                                        <Input placeholder="e.g. ROI" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'value']}
                                        label="Value"
                                        className="mb-0 flex-1"
                                        rules={[{ required: true }]}
                                    >
                                        <Input placeholder="e.g. +25%" />
                                    </Form.Item>
                                    <Button type="text" danger onClick={() => remove(name)} className="mt-8">X</Button>
                                </div>
                            ))}
                            <Button type="dashed" onClick={() => add()} block className="mt-4">
                                + Add Outcome Stat
                            </Button>
                        </>
                    )}
                </Form.List>
            )}

            {/* Fallback JSON Editor */}
             {!['hero', 'problem_block', 'approach_steps', 'outcomes_grid'].includes(record?.section_key) && (
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
             )}
        </div>
      </Form>
    </Edit>
  );
};
