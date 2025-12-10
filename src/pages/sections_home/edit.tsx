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
                <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item label="Visible on Site?" name="is_visible" valuePropName="checked">
                <Switch />
            </Form.Item>
        </div>

        {/* Dynamic Data Editor */}
        <div className="mt-8 p-6 bg-yellow-50 rounded-xl border border-yellow-200">
            <h3 className="font-bold text-lg mb-4 text-yellow-800">Advanced Data Management</h3>
            <p className="text-sm text-yellow-700 mb-4">Edit lists and special properties here. Warning: Invalid JSON will break the section.</p>
             <Form.Item 
                label="Raw Data (JSON)" 
                name="specific_data"
                help="Edit lists (e.g., 'items': ['Item 1', 'Item 2']) here."
                getValueProps={(value) => ({
                    // FIX: If it's already a string (user typing), don't stringify again.
                    // Only stringify if it's an object (from DB/API).
                    value: typeof value === 'string' ? value : JSON.stringify(value, null, 2),
                })}
                getValueFromEvent={(e) => {
                    // Start by returning raw text so cursor doesn't jump.
                    // If valid JSON, you could parse, but it causes jumps.
                    // Better to keep as text until submit, OR parse if perfectly clean.
                    // Ideally, Supabase receives an object, so we try to parse if valid.
                    try {
                        return JSON.parse(e.target.value);
                    } catch (err) {
                        return e.target.value; 
                    }
                }}
                rules={[
                    {
                        validator: (_, value) => {
                            if (typeof value === 'string') {
                                try {
                                    JSON.parse(value);
                                    return Promise.resolve();
                                } catch (e) {
                                    return Promise.reject(new Error('Invalid JSON format'));
                                }
                            }
                            return Promise.resolve();
                        },
                    },
                ]}
            >
                <Input.TextArea rows={8} className="font-mono text-sm" />
            </Form.Item>
        </div>
      </Form>
    </Edit>
  );
};
