import { useState, useEffect } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Upload, message, Card, Space, Switch, Tag, Typography } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";
import { RichTextEditor } from "../../components/RichTextEditor";
import { SortableList, SortableItem } from "../../components/builder";

const { Text } = Typography;

interface SectionItem {
  key: string;
  label: string;
  locked?: boolean;
}

const DEFAULT_SECTIONS: SectionItem[] = [
  { key: "hero", label: "Hero Section", locked: true },
  { key: "clients", label: "Client Logos" },
  { key: "story", label: "Founder Story" },
  { key: "team", label: "Team Section" }
];

export const PageAboutEdit = () => {
  const [loading, setLoading] = useState(false);
  const [recordId, setRecordId] = useState<string | number | undefined>(undefined);
  const [layoutOrder, setLayoutOrder] = useState<string[]>([]);
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({});

  useEffect(() => {
      const fetchId = async () => {
          const { data } = await supabaseClient.from('page_about').select('*').maybeSingle();
          if (data) {
            setRecordId(data.id);
            setLayoutOrder(data.layout_order || DEFAULT_SECTIONS.map(s => s.key));
            setSectionVisibility(data.section_visibility || {});
          }
      }
      fetchId();
  }, []);

  const { formProps, saveButtonProps, form, queryResult } = useForm({
    action: "edit",
    id: recordId,
    queryOptions: {
        enabled: !!recordId,
        select: ({ data }) => ({ data })
    }
  });

  const data = queryResult?.data?.data;
  
  const defaultFileList = data?.founder_image_url ? [{ uid: '-1', name: 'current', status: 'done', url: data.founder_image_url }] : [];

  // Toggle section visibility
  const toggleVisibility = (key: string) => {
    setSectionVisibility(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  // Handle reorder via drag-and-drop
  const handleReorder = (reorderedSections: SectionItem[]) => {
    setLayoutOrder(reorderedSections.map(s => s.key));
  };

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
        let error;
        const payload = {
          hero_title: values.hero_title,
          story_html: values.story_html,
          founder_image_url: values.founder_image_url,
          layout_order: layoutOrder,
          section_visibility: sectionVisibility
        };

        if (recordId) {
            const { error: updateError } = await supabaseClient
            .from('page_about')
            .update(payload)
            .eq('id', recordId);
            error = updateError;
        } else {
             const { error: insertError } = await supabaseClient
            .from('page_about')
            .insert(payload);
            error = insertError;
        }
        
        if (error) throw error;
        message.success("About page updated successfully! Changes will reflect instantly on the website.");
    } catch (err: any) {
        message.error("Error saving data: " + err.message);
    } finally {
        setLoading(false);
    }
  };

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `about/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const { error } = await supabaseClient.storage.from("website-assets").upload(fileName, file);
      if (error) throw error;
      const { data } = supabaseClient.storage.from("website-assets").getPublicUrl(fileName);
      form.setFieldValue("founder_image_url", data.publicUrl);
      onSuccess(data.publicUrl);
      message.success("Uploaded!");
    } catch (e: any) { onError(e); message.error("Failed"); }
  };

  const getSectionLabel = (key: string) => {
    return DEFAULT_SECTIONS.find(s => s.key === key)?.label || key;
  };

  // Build sections array for drag-and-drop
  const sections: SectionItem[] = layoutOrder.map(key => {
    const section = DEFAULT_SECTIONS.find(s => s.key === key);
    return {
      key,
      label: section?.label || key,
      locked: section?.locked || false
    };
  });

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
        {/* Content Fields */}
        <Card title="About Page Content" className="mb-4">
          <Form.Item label="Hero Title" name="hero_title" rules={[{ required: true }]}>
            <Input placeholder="About KretruTosh Consulting" />
          </Form.Item>
          <Form.Item label="Founder Story (Rich HTML)" name="story_html">
            <RichTextEditor />
          </Form.Item>
          <Form.Item name="founder_image_url" hidden>
            <Input />
          </Form.Item>
          <Form.Item label="Founder Image">
            <Upload.Dragger customRequest={customRequest} maxCount={1} listType="picture" defaultFileList={defaultFileList as any}>
                <p className="ant-upload-drag-icon"><UploadOutlined /></p>
                <p className="ant-upload-text">Upload Image</p>
            </Upload.Dragger>
          </Form.Item>
        </Card>

        {/* Drag-and-Drop Layout Manager */}
        <Card title="🎨 About Page Structure - Drag to Reorder" className="mb-4">
          <p style={{ color: '#666', marginBottom: 16 }}>
            Drag sections to reorder them on the About page. Toggle visibility to show/hide sections.
          </p>
          
          <SortableList
            items={sections}
            getId={(section) => section.key}
            onReorder={handleReorder}
            renderItem={(section, index) => {
              const isVisible = sectionVisibility[section.key] !== false;
              
              return (
                <SortableItem 
                  id={section.key} 
                  disabled={section.locked}
                  showHandle={true}
                >
                  <Space style={{ width: '100%', justifyContent: 'space-between' }} align="center">
                    <div>
                      <Space>
                        <Text type="secondary" style={{ fontFamily: 'monospace', fontSize: 12 }}>
                          #{index + 1}
                        </Text>
                        <Text strong>{section.label}</Text>
                        {section.locked && <Tag color="gold">Locked</Tag>}
                        {!isVisible && <Tag color="default">Hidden</Tag>}
                      </Space>
                    </div>
                    <Switch 
                      checked={isVisible}
                      onChange={() => toggleVisibility(section.key)}
                      checkedChildren="Visible"
                      unCheckedChildren="Hidden"
                    />
                  </Space>
                </SortableItem>
              );
            }}
          />

          <p style={{ fontSize: 12, color: '#999', marginTop: 16 }}>
            💡 Pro tip: Hero section is locked at the top. Changes reflect instantly via real-time sync.
          </p>
        </Card>
      </Form>
    </Edit>
  );
};
