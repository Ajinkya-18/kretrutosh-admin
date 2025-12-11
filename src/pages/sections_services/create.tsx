import { Create, useForm } from "@refinedev/antd";
import { Form, Input, InputNumber, Select, Switch, Divider, Button } from "antd";
import { Settings, Trash2, Plus, Image as ImageIcon } from "lucide-react";

export const SectionsServicesCreate = () => {
    const { formProps, saveButtonProps, form } = useForm();
    const sectionKey = Form.useWatch('section_key', form);
  
    return (
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
          <div className="flex gap-4">
               <Form.Item
                  label="Service Page"
                  name="page_slug"
                  className="w-1/3"
                  rules={[{ required: true }]}
              >
                  <Select
                      options={[
                          { label: "Pre-Sales", value: "pre-sales" },
                          { label: "Sales Velocity", value: "sales-velocity" },
                          { label: "Digital & AI", value: "digital-ai" },
                          { label: "Customer Success", value: "customer-success" },
                          { label: "Culture & Leadership", value: "culture-transformation" },
                      ]}
                  />
              </Form.Item>
              <Form.Item
                label="Section Type"
                name="section_key"
                rules={[{ required: true }]}
                className="w-1/3"
                help="Select the type of content block to add."
              >
                 <Select placeholder="Select Type">
                     <Select.Option value="hero">Hero Section</Select.Option>
                     <Select.Option value="problem_block">Challenge/Problem Block</Select.Option>
                     <Select.Option value="approach_steps">And Approach Steps</Select.Option>
                     <Select.Option value="outcomes_grid">Outcomes/Stats Grid</Select.Option>
                     <Select.Option value="generic">Generic Content</Select.Option>
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
          </div>
  
          <Divider orientation="left">Visual Builder</Divider>

          {/* DYNAMIC FIELDS based on sectionKey */}
           <div className="bg-gray-50 p-6 rounded-xl border border-gray-200 mb-8">
               <h3 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                   <Settings className="w-5 h-5" />
                   {sectionKey === 'hero' && "Hero Configuration"}
                   {sectionKey === 'problem_block' && "Challenge List Builder"}
                   {sectionKey === 'approach_steps' && "Approach Steps Builder"}
                   {sectionKey === 'outcomes_grid' && "Outcomes Statistics Builder"}
                   {!['hero', 'problem_block', 'approach_steps', 'outcomes_grid'].includes(sectionKey) && "General Content"}
               </h3>
   
               {/* HERO EDITOR */}
               {sectionKey === 'hero' && (
                   <div className="space-y-4 animate-fade-in">
                       <Form.Item label="Badge Text (Top Label)" name={['specific_data', 'badge']}>
                           <Input placeholder="e.g. STRATEGY" />
                       </Form.Item>
                       <div className="grid grid-cols-2 gap-4">
                           <Form.Item label="Primary CTA Label" name="primary_cta_text">
                               <Input placeholder="e.g. Get Started" />
                           </Form.Item>
                           <Form.Item label="Primary CTA Link" name={['specific_data', 'primary_cta_link']}>
                               <Input placeholder="e.g. /contact" />
                           </Form.Item>
                       </div>
                   </div>
               )}
   
               {/* PROBLEM BLOCK EDITOR */}
               {sectionKey === 'problem_block' && (
                   <Form.List name={['specific_data', 'list']}>
                       {(fields, { add, remove }) => (
                           <div className="space-y-3">
                               {fields.map(({ key, name, ...restField }) => (
                                   <div key={key} className="flex gap-2 items-center bg-white p-3 rounded border border-gray-200 shadow-sm">
                                       <span className="text-gray-400 font-mono text-xs">#{key + 1}</span>
                                       <Form.Item {...restField} name={[name]} noStyle>
                                           <Input placeholder="Enter a challenge/gap point..." />
                                       </Form.Item>
                                       <Button type="text" danger icon={<Trash2 size={16} />} onClick={() => remove(name)} />
                                   </div>
                               ))}
                               <Button type="dashed" onClick={() => add()} block icon={<Plus size={16} />}>Add Challenge Point</Button>
                           </div>
                       )}
                   </Form.List>
               )}
   
               {/* APPROACH STEPS EDITOR */}
               {sectionKey === 'approach_steps' && (
                   <Form.List name={['specific_data', 'steps']}>
                        {(fields, { add, remove }) => (
                           <div className="space-y-4">
                                {fields.map(({ key, name, ...restField }) => (
                                   <div key={key} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm relative group">
                                       <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button type="text" danger icon={<Trash2 size={16} />} onClick={() => remove(name)} />
                                       </div>
                                       <div className="grid gap-4">
                                           <Form.Item {...restField} label={`Step ${key + 1} Title`} name={[name, 'title']} className="mb-0">
                                               <Input placeholder="e.g. Discovery Phase" />
                                           </Form.Item>
                                           <Form.Item {...restField} label="Description" name={[name, 'desc']} className="mb-0">
                                               <Input.TextArea placeholder="Describe this step..." rows={2} />
                                           </Form.Item>
                                       </div>
                                   </div>
                                ))}
                                <Button type="dashed" onClick={() => add()} block icon={<Plus size={16} />}>Add Process Step</Button>
                           </div>
                        )}
                   </Form.List>
               )}
   
               {/* OUTCOMES GRID EDITOR */}
               {sectionKey === 'outcomes_grid' && (
                   <Form.List name={['specific_data', 'stats']}>
                        {(fields, { add, remove }) => (
                           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {fields.map(({ key, name, ...restField }) => (
                                   <div key={key} className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm flex flex-col gap-2 relative">
                                       <div className="absolute top-2 right-2">
                                            <Button type="text" danger size="small" icon={<Trash2 size={14} />} onClick={() => remove(name)} />
                                       </div>
                                       <Form.Item {...restField} label="Value" name={[name, 'value']} className="mb-0">
                                           <Input placeholder="e.g. 40%" className="font-bold" />
                                       </Form.Item>
                                       <Form.Item {...restField} label="Label" name={[name, 'label']} className="mb-0">
                                           <Input placeholder="e.g. Efficiency" />
                                       </Form.Item>
                                   </div>
                                ))}
                                <Button type="dashed" className="h-full min-h-[100px]" onClick={() => add()} icon={<Plus size={16} />}>Add Statistic</Button>
                           </div>
                        )}
                   </Form.List>
               )}
           </div>

          <Form.Item label="Section Title" name="title" rules={[{ required: true }]}>
             <Input />
          </Form.Item>
          <Form.Item label="Subtitle" name="subtitle"><Input.TextArea rows={2} /></Form.Item>
          <Form.Item label="Image URL" name="image_url"><Input prefix={<ImageIcon size={14} />} /></Form.Item>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Form.Item label="Layout Structure" name="grid_columns">
                    <Select>
                        <Select.Option value={1}>Full Width (1 Col)</Select.Option>
                        <Select.Option value={2}>Split / Side-by-Side (2 Cols)</Select.Option>
                        <Select.Option value={3}>Standard Grid (3 Cols)</Select.Option>
                        <Select.Option value={4}>Quarters (4 Cols)</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Background Color" name="bg_theme">
                    <Select>
                        <Select.Option value="light">White (Default)</Select.Option>
                        <Select.Option value="navy">Navy Blue</Select.Option>
                        <Select.Option value="gray">Light Gray</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item label="Text Alignment" name="alignment">
                    <Select>
                        <Select.Option value="left">Left Aligned</Select.Option>
                        <Select.Option value="center">Center Aligned</Select.Option>
                        <Select.Option value="right">Right Aligned</Select.Option>
                    </Select>
                </Form.Item>
            </div>
        </Form>
      </Create>
    );
};
