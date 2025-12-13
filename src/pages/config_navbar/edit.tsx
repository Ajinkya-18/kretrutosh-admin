import { useEffect } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Card, Space, Button, Divider, Upload, message } from "antd";
import { DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const ConfigNavbarEdit = () => {
  const { formProps, saveButtonProps, form, queryResult } = useForm();
  
  const data = queryResult?.data?.data;

  // Migration Effect: Fix legacy keys (label->name, link->path)
  useEffect(() => {
    if (data?.menu_items) {
        const mappedItems = data.menu_items.map((item: any) => ({
            ...item,
            name: item.name || item.label,
            path: item.path || item.link
        }));
        
        // Only set if we detect legacy keys to avoid infinite loops or overwriting
        const needsUpdate = mappedItems.some((item: any) => !item.name && item.label);
        // Actually, form might be empty initially if keys didn't match.
        // Safety: Always set updated items if not modified by user yet?
        // If we strictly rely on formProps, we get the legacy data.
        // We override "menu_items" to ensure the Form List sees "name" and "path".
        form.setFieldValue("menu_items", mappedItems);
    }
  }, [data]);
  
  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `logos/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error } = await supabaseClient.storage
        .from("website-assets")
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (error) throw error;
      const { data } = supabaseClient.storage.from("website-assets").getPublicUrl(fileName);
      const url = data.publicUrl;
      form.setFieldValue("logo_url", url);
      onSuccess(url);
    } catch (error: any) {
      message.error("Upload failed");
      onError(error);
    }
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="CTA Link" name="cta_link">
          <Input placeholder="/contact" />
        </Form.Item>

        <Form.Item label="Logo URL" name="logo_url">
             <Input placeholder="https://..." />
        </Form.Item>
         <Form.Item label="Upload Logo">
             <Upload.Dragger customRequest={customRequest} maxCount={1} listType="picture">
                 <p className="ant-upload-drag-icon"><UploadOutlined /></p>
                 <p className="ant-upload-text">Upload Logo</p>
             </Upload.Dragger>
         </Form.Item>

        <Divider orientation="left">Menu Items</Divider>
        <Form.List name="menu_items">
            {(fields, { add, remove }) => (
                <>
                {fields.map(({ key, name, ...restField }) => (
                    <Card size="small" style={{ marginBottom: 8 }} key={key}>
                        <Space style={{ display: 'flex', width: '100%' }} align="baseline">
                            <Form.Item
                                {...restField}
                                name={[name, 'name']}
                                label="Label Name"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="About" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'path']}
                                label="Path / Link"
                                rules={[{ required: true }]}
                            >
                                <Input placeholder="/about" />
                            </Form.Item>
                            <DeleteOutlined onClick={() => remove(name)} style={{ color: 'red' }}/>
                        </Space>
                    </Card>
                ))}
                <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Menu Item
                    </Button>
                </Form.Item>
                </>
            )}
        </Form.List>
      </Form>
    </Edit>
  );
};
