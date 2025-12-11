import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Switch, Divider, Button } from "antd";
import { Settings, Trash2, Plus } from "lucide-react";

export const SectionsHomeCreate = () => {
  const { formProps, saveButtonProps, form } = useForm();
  const sectionKey = Form.useWatch('section_key', form);

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <div className="flex gap-4">
            <Form.Item
            label="Section Type"
            name="section_key"
            className="w-1/3"
            rules={[{ required: true }]}
            help="Select the block type."
            >
                <Select placeholder="Select Type">
                    <Select.Option value="hero">Hero Section</Select.Option>
                    <Select.Option value="growth_engine">Growth Engine Grid</Select.Option>
                    <Select.Option value="outcomes">Success Stats</Select.Option>
                    <Select.Option value="thought_leadership">Thought Leadership</Select.Option>
                    <Select.Option value="generic">Generic Text Block</Select.Option>
                </Select>
            </Form.Item>
            <Form.Item
            label="Order"
            name="display_order"
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

        <Divider orientation="left">Layout Control</Divider>
        <div className="grid grid-cols-3 gap-4">
             <Form.Item label="Grid Columns" name="grid_columns" initialValue={1}>
                <Select>
                    <Select.Option value={1}>1 Column</Select.Option>
                    <Select.Option value={2}>2 Columns</Select.Option>
                    <Select.Option value={3}>3 Columns</Select.Option>
                    <Select.Option value={4}>4 Columns</Select.Option>
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
                    <Select.Option value="muted">Muted (Grey)</Select.Option>
                </Select>
            </Form.Item>
        </div>

        <Divider orientation="left">Content Builder</Divider>
        
        {/* DYNAMIC BUILDERS */}
        <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
             <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                 <Settings className="w-5 h-5" />
                 {sectionKey === 'hero' && "Hero Configuration"}
                 {sectionKey === 'growth_engine' && "Growth Engine Cards"}
                 {sectionKey === 'outcomes' && "Success Metrics"}
                 {!['hero', 'growth_engine', 'outcomes'].includes(sectionKey) && "General Content"}
             </h3>

             {/* HERO FIELDS */}
             {sectionKey === 'hero' && (
                 <div className="grid grid-cols-2 gap-4">
                     <Form.Item label="Badge / Tag" name="badge"><Input placeholder="e.g. CONSULTING" /></Form.Item>
                     <Form.Item label="Primary CTA Text" name="primary_cta_text"><Input /></Form.Item>
                     <Form.Item label="Primary CTA Link" name="primary_cta_link"><Input /></Form.Item>
                 </div>
             )}

             {/* GROWTH ENGINE LIST */}
             {sectionKey === 'growth_engine' && (
                 <Form.List name={['specific_data', 'items']}>
                     {(fields, { add, remove }) => (
                         <div className="space-y-4">
                             {fields.map(({ key, name, ...restField }) => (
                                 <div key={key} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative group">
                                     <Button type="text" danger icon={<Trash2 size={16} />} onClick={() => remove(name)} className="absolute top-2 right-2" />
                                     <div className="grid gap-3">
                                         <Form.Item {...restField} label="Title" name={[name, 'title']} className="mb-0" rules={[{ required: true }]}><Input /></Form.Item>
                                         <Form.Item {...restField} label="Description" name={[name, 'desc']} className="mb-0"><Input.TextArea rows={2} /></Form.Item>
                                     </div>
                                 </div>
                             ))}
                             <Button type="dashed" onClick={() => add()} block icon={<Plus size={16} />}>Add Engine Card</Button>
                         </div>
                     )}
                 </Form.List>
             )}

            {/* OUTCOMES STATS */}
             {sectionKey === 'outcomes' && (
                 <Form.List name={['specific_data', 'stats']}>
                     {(fields, { add, remove }) => (
                         <div className="grid grid-cols-2 gap-4">
                             {fields.map(({ key, name, ...restField }) => (
                                 <div key={key} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative">
                                     <Button type="text" danger size="small" icon={<Trash2 size={14} />} onClick={() => remove(name)} className="absolute top-2 right-2" />
                                     <Form.Item {...restField} label="Value" name={[name, 'value']} className="mb-2"><Input className="font-bold" /></Form.Item>
                                     <Form.Item {...restField} label="Label" name={[name, 'label']} className="mb-0"><Input /></Form.Item>
                                 </div>
                             ))}
                             <Button type="dashed" className="min-h-[100px]" onClick={() => add()} icon={<Plus size={16} />}>Add Stat</Button>
                         </div>
                     )}
                 </Form.List>
             )}

            {/* FALLBACK TEXT */}
             {!['growth_engine', 'outcomes'].includes(sectionKey) && (
                 <Form.Item label="Main Content" name="content_body" help="Standard text block.">
                     <Input.TextArea rows={6} />
                 </Form.Item>
             )}
        </div>

        <Form.Item label="Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Subtitle" name="subtitle"><Input.TextArea rows={2} /></Form.Item>
      </Form>
    </Create>
  );
};
