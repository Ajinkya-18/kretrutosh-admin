import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, InputNumber, Switch, Alert, Button } from "antd";
import { Eye } from "lucide-react";

export const SectionsFrameworkDetailsEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  const record = queryResult?.data?.data;

  const adminInstruction = record?.admin_instruction;

  return (
    <Edit 
        saveButtonProps={saveButtonProps}
        headerButtons={({ defaultButtons }) => (
            <>
                {defaultButtons}
                {record?.parent_slug && (
                    <Button 
                        type="primary" 
                        ghost 
                        icon={<Eye size={16} />} 
                        onClick={() => window.open(`https://kretrutosh.com/frameworks/${record.parent_slug}`, '_blank')}
                    >
                        View Live Page
                    </Button>
                )}
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

        {/* Safety Rails: Read-Only Identification */}
        <div className="grid grid-cols-2 gap-6 bg-gray-50 p-4 rounded-lg mb-6 border border-gray-200">
             <Form.Item label="Parent Framework (Slug)" name="parent_slug">
                <Input disabled className="font-mono text-gray-500" />
            </Form.Item>
            <Form.Item label="Section Key (ID)" name="section_key">
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
            label="Content Body" 
            name="content_body"
            help="Rich content text."
        >
          <Input.TextArea rows={8} />
        </Form.Item>
        
        <Form.Item label="Image URL" name="image_url">
            <Input placeholder="https://..." />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Form.Item label="Layout Structure" name="grid_columns" help="How content is arranged.">
                <Select>
                    <Select.Option value={1}>Full Width (1 Col)</Select.Option>
                    <Select.Option value={2}>Split / Side-by-Side (2 Cols)</Select.Option>
                    <Select.Option value={3}>Standard Grid (3 Cols)</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="Text Alignment" name="alignment" help="Anchor for text block.">
                <Select>
                    <Select.Option value="left">Left Aligned</Select.Option>
                    <Select.Option value="center">Center Aligned</Select.Option>
                    <Select.Option value="right">Right Aligned</Select.Option>
                </Select>
            </Form.Item>

            <Form.Item label="Background Color" name="bg_theme" help="Section background style.">
                <Select>
                    <Select.Option value="light">White (Default)</Select.Option>
                    <Select.Option value="navy">Navy (Brand Dark)</Select.Option>
                    <Select.Option value="gray">Light Gray (Subtle)</Select.Option>
                </Select>
            </Form.Item>
        </div>

        <div className="grid grid-cols-2 gap-6">
            <Form.Item label="Display Order" name="display_order">
                <InputNumber className="w-full" />
            </Form.Item>
            <Form.Item label="Visible on Site?" name="is_visible" valuePropName="checked">
                <Switch />
            </Form.Item>
        </div>
      </Form>
    </Edit>
  );
};
