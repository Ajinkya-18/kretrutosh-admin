import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Upload, message, Divider, Space, Button, Card } from "antd";
import { UploadOutlined, PlusOutlined, DeleteOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";
import { RichTextEditor } from "../../components/RichTextEditor";

export const ServiceCreate = () => {
    const { formProps, saveButtonProps, form } = useForm();
  
    const customRequest = async ({ file, onSuccess, onError }: any) => {
      try {
        const fileName = `services/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
        const { error } = await supabaseClient.storage
          .from("website-assets")
          .upload(fileName, file, { cacheControl: '3600', upsert: false });
  
        if (error) throw error;
        const { data } = supabaseClient.storage.from("website-assets").getPublicUrl(fileName);
        const url = data.publicUrl;
        form.setFieldValue("hero_image", url);
        onSuccess(url);
        message.success("Image uploaded!");
      } catch (error: any) {
        message.error("Upload failed: " + error.message);
        onError(error);
      }
    };
  
    return (
      <Create saveButtonProps={saveButtonProps}>
        <Form {...formProps} layout="vertical">
            <Form.Item label="Slug (URL Key)" name="slug" rules={[{ required: true }, { pattern: /^[a-z0-9-]+$/, message: 'Slug must be lowercase alphanumeric with dashes' }]}>
                <Input placeholder="e.g. pre-sales" /> 
            </Form.Item>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
                <Input />
            </Form.Item>
            <Form.Item label="Subtitle" name="subtitle">
                <Input.TextArea rows={2} />
            </Form.Item>

            <Form.Item label="Hero Image">
                <Form.Item name="hero_image" hidden><Input /></Form.Item>
                <Upload.Dragger
                    name="file"
                    customRequest={customRequest}
                    listType="picture"
                    maxCount={1}
                >
                    <p className="ant-upload-drag-icon"><UploadOutlined /></p>
                    <p className="ant-upload-text">Upload Hero Image</p>
                </Upload.Dragger>
            </Form.Item>

            <Divider orientation="left">Rich Content</Divider>
            
            <Form.Item label="Problem Section (Rich HTML)" name="problem_html">
                <RichTextEditor placeholder="Describe the core problem this service solves..." />
            </Form.Item>

            <Form.Item label="Approach/Methodology (Rich HTML)" name="approach_html">
                 <RichTextEditor placeholder="Describe your methodology..." />
            </Form.Item>

            <Divider orientation="left">Outcomes List (Statistics)</Divider>
            
            <Form.List name="outcomes_list">
                {(fields, { add, remove }) => (
                    <>
                    {fields.map(({ key, name, ...restField }) => (
                        <Card size="small" style={{ marginBottom: 8 }} key={key}>
                            <Space style={{ display: 'flex', width: '100%' }} align="baseline">
                                <Form.Item
                                    {...restField}
                                    name={[name, 'label']}
                                    label="Metric Label"
                                    rules={[{ required: true, message: 'Missing label' }]}
                                    style={{ flex: 1 }}
                                >
                                    <Input placeholder="e.g. ROI, Retention Increase" />
                                </Form.Item>
                                <Form.Item
                                    {...restField}
                                    name={[name, 'value']}
                                    label="Value"
                                    rules={[{ required: true, message: 'Missing value' }]}
                                    style={{ flex: 1 }}
                                >
                                    <Input placeholder="e.g. +25%" />
                                </Form.Item>
                                <DeleteOutlined onClick={() => remove(name)} style={{ color: 'red', marginLeft: 8 }}/>
                            </Space>
                        </Card>
                    ))}
                    <Form.Item>
                        <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add Outcome Statistic
                        </Button>
                    </Form.Item>
                    </>
                )}
            </Form.List>

        </Form>
      </Create>
    );
};
