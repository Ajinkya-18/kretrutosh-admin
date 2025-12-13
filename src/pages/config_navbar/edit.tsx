import { useEffect, useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Card, Space, Button, Divider, Upload, message } from "antd";
import { DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const ConfigNavbarEdit = () => {
  const [loading, setLoading] = useState(false);
  const [recordId, setRecordId] = useState<string | number | undefined>(undefined);

  useEffect(() => {
      const fetchId = async () => {
          const { data } = await supabaseClient.from('config_navbar').select('id').maybeSingle();
          if (data) {
              setRecordId(data.id);
          }
      }
      fetchId();
  }, []);

  const { formProps, saveButtonProps, form } = useForm({
    action: "edit",
    id: recordId, // Use dynamic ID
    queryOptions: {
      enabled: !!recordId, // Only fetch when ID is ready
      select: ({ data }) => {
        const responseData = data;
        // Transform legacy keys if they exist
        const menuItems = responseData.menu_items || [];
        const mappedItems = menuItems.map((item: any) => ({
            ...item,
            name: item.name || item.label,
            path: item.path || item.link 
        }));
        return { data: { ...responseData, menu_items: mappedItems } };
      },
    },
  });

  // MANUAL SAVE HANDLER (Bypasses Refine's default logic to ensure it works)
  const onFinish = async (values: any) => {
    if (!recordId) {
        message.error("No record ID found to update.");
        return;
    }
    setLoading(true);
    try {
      console.log("Saving Values:", values); // Debugging

      const { error } = await supabaseClient
        .from('config_navbar')
        .update({
          logo_url: values.logo_url,
          cta_link: values.cta_link,
          menu_items: values.menu_items
        })
        .eq('id', recordId); // Use dynamic ID

      if (error) {
        throw error;
      }

      message.success("Navbar updated successfully!");
    } catch (err: any) {
      console.error("Supabase Error:", err);
      message.error("Failed to save: " + err.message);
    } finally {
      setLoading(false);
    }
  };

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
      console.error("Upload Error", error);
      message.error("Upload failed");
      onError(error);
    }
  };

  if (!recordId) return <div>Loading configuration...</div>;

  return (
    <Edit 
        saveButtonProps={{ 
            ...saveButtonProps, 
            onClick: () => form.submit(),
            loading: loading
        }}
    >
      <Form 
        {...formProps} 
        layout="vertical"
        onFinish={onFinish}
      >
        <Form.Item 
            label="CTA Link" 
            name="cta_link"
            rules={[{ required: true, message: 'Please enter a CTA link' }]}
        >
          <Input placeholder="/contact" />
        </Form.Item>

        <Form.Item label="Logo URL" name="logo_url">
             <Input placeholder="https://..." />
        </Form.Item>
        
        <Form.Item label="Upload Logo">
             <Upload.Dragger customRequest={customRequest} maxCount={1} listType="picture" showUploadList={false}>
                 <p className="ant-upload-drag-icon"><UploadOutlined /></p>
                 <p className="ant-upload-text">Click or drag file to upload</p>
             </Upload.Dragger>
        </Form.Item>

        <Divider orientation="left">Menu Items</Divider>
        <Form.List name="menu_items">
            {(fields, { add, remove }) => (
                <>
                {fields.map(({ key, name, ...restField }) => (
                    <Card size="small" style={{ marginBottom: 8, background: '#f9f9f9' }} key={key}>
                        <Space style={{ display: 'flex', width: '100%' }} align="baseline">
                            <Form.Item
                                {...restField}
                                name={[name, 'name']}
                                label="Label Name"
                                rules={[{ required: true, message: 'Missing name' }]}
                            >
                                <Input placeholder="About" />
                            </Form.Item>
                            <Form.Item
                                {...restField}
                                name={[name, 'path']}
                                label="Path / Link"
                                rules={[{ required: true, message: 'Missing path' }]}
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
