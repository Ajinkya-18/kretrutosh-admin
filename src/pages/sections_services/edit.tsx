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

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Form.Item label="Background Color" name="bg_theme">
                <Select>
                    <Select.Option value="light">White / Default</Select.Option>
                    <Select.Option value="navy">Navy (Brand Dark)</Select.Option>
                    <Select.Option value="gray">Light Gray (Subtle)</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item label="Text Alignment" name="alignment">
                <Select>
                    <Select.Option value="left">Left Aligned</Select.Option>
                    <Select.Option value="center">Centered</Select.Option>
                    <Select.Option value="right">Right Aligned</Select.Option>
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
