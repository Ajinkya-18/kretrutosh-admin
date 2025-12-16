import { useState, useEffect } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch, Card, Space, message, Tag, Typography } from "antd";
import { supabaseClient } from "../../utility";
import { SortableList, SortableItem } from "../../components/builder";

const { Text } = Typography;

interface SectionItem {
  key: string;
  label: string;
  locked?: boolean;
}

const DEFAULT_SECTIONS: SectionItem[] = [
  { key: "hero", label: "Hero Section", locked: true },
  { key: "growth_engine", label: "Growth Engine (Services)" },
  { key: "frameworks", label: "Frameworks Grid" },
  { key: "outcomes", label: "Outcomes / Impact Metrics" },
  { key: "clients", label: "Client Logos" },
  { key: "case_studies", label: "Case Studies Preview" },
  { key: "thought_leadership", label: "Thought Leadership (Book/Podcast)" }
];

export const PageHomeEdit = () => {
  const [loading, setLoading] = useState(false);
  const [recordId, setRecordId] = useState<string | number | undefined>(undefined);
  const [layoutOrder, setLayoutOrder] = useState<string[]>([]);
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchId = async () => {
      const { data } = await supabaseClient.from('page_home').select('*').maybeSingle();
      if (data) {
        setRecordId(data.id);
        setLayoutOrder(data.layout_order || DEFAULT_SECTIONS.map(s => s.key));
        setSectionVisibility(data.section_visibility || {});
      }
    };
    fetchId();
  }, []);

  const { formProps, saveButtonProps, form } = useForm({
    action: "edit",
    id: recordId,
    queryOptions: {
      enabled: !!recordId,
      select: ({ data }) => ({ data })
    }
  });

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
        hero_subtitle: values.hero_subtitle,
        hero_video_url: values.hero_video_url,
        growth_engine_title: values.growth_engine_title,
        frameworks_title: values.frameworks_title,
        layout_order: layoutOrder,
        section_visibility: sectionVisibility
      };

      if (recordId) {
        const { error: updateError } = await supabaseClient
          .from('page_home')
          .update(payload)
          .eq('id', recordId);
        error = updateError;
      } else {
        const { error: insertError } = await supabaseClient
          .from('page_home')
          .insert(payload);
        error = insertError;
      }

      if (error) throw error;
      message.success("Home configuration updated successfully! Changes will reflect instantly on the website.");
    } catch (err: any) {
      message.error("Error saving data: " + err.message);
    } finally {
      setLoading(false);
    }
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
        <Card title="Hero Section Content" className="mb-4">
          <Form.Item label="Hero Title" name="hero_title" rules={[{ required: true }]}>
            <Input placeholder="Build a Customer-Led Growth Engine That Scales" />
          </Form.Item>
          <Form.Item label="Hero Subtitle" name="hero_subtitle">
            <Input.TextArea rows={3} placeholder="Integrated Go-To-Market, Customer Experience..." />
          </Form.Item>
          <Form.Item label="Hero Video URL" name="hero_video_url">
            <Input placeholder="https://youtube.com/..." />
          </Form.Item>
        </Card>

        <Card title="Section Titles" className="mb-4">
          <Form.Item label="Growth Engine Section Title" name="growth_engine_title">
            <Input placeholder="The KretruTosh Growth Engine" />
          </Form.Item>
          <Form.Item label="Frameworks Section Title" name="frameworks_title">
            <Input placeholder="Our Proven Frameworks" />
          </Form.Item>
        </Card>

        {/* Drag-and-Drop Layout Manager */}
        <Card title="🎨 Homepage Structure - Drag to Reorder" className="mb-4">
          <p style={{ color: '#666', marginBottom: 16 }}>
            Drag sections to reorder them on the homepage. Toggle visibility to show/hide sections.
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
