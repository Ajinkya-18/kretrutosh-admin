import { useState, useEffect } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Switch, Button as AntButton, Card, Space, message } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility";

interface SectionItem {
  key: string;
  label: string;
}

const DEFAULT_SECTIONS: SectionItem[] = [
  { key: "hero", label: "Hero Section" },
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

  // Move section up in order
  const moveUp = (index: number) => {
    if (index === 0) return;
    const newOrder = [...layoutOrder];
    [newOrder[index], newOrder[index - 1]] = [newOrder[index - 1], newOrder[index]];
    setLayoutOrder(newOrder);
  };

  // Move section down in order
  const moveDown = (index: number) => {
    if (index === layoutOrder.length - 1) return;
    const newOrder = [...layoutOrder];
    [newOrder[index], newOrder[index + 1]] = [newOrder[index + 1], newOrder[index]];
    setLayoutOrder(newOrder);
  };

  // Toggle section visibility
  const toggleVisibility = (key: string) => {
    setSectionVisibility(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
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

        {/* Layout Manager */}
        <Card title="🎨 Layout Manager" className="mb-4">
          <p className="text-gray-600 mb-4">
            Drag sections up/down to reorder them on the homepage. Toggle visibility to show/hide sections.
          </p>
          
          {layoutOrder.map((sectionKey, index) => {
            const isVisible = sectionVisibility[sectionKey] !== false;
            
            return (
              <div 
                key={sectionKey}
                className={`flex items-center justify-between p-3 mb-2 border rounded ${!isVisible ? 'bg-gray-100 opacity-60' : 'bg-white'}`}
              >
                <div className="flex items-center gap-3">
                  <span className="text-gray-500 font-mono text-sm">#{index + 1}</span>
                  <span className="font-medium">{getSectionLabel(sectionKey)}</span>
                  <span className="text-xs text-gray-400">({sectionKey})</span>
                </div>

                <Space>
                  <Switch 
                    checked={isVisible}
                    onChange={() => toggleVisibility(sectionKey)}
                    checkedChildren="Visible"
                    unCheckedChildren="Hidden"
                  />
                  
                  <AntButton 
                    size="small"
                    icon={<ArrowUpOutlined />}
                    onClick={() => moveUp(index)}
                    disabled={index === 0}
                  />
                  
                  <AntButton 
                    size="small"
                    icon={<ArrowDownOutlined />}
                    onClick={() => moveDown(index)}
                    disabled={index === layoutOrder.length - 1}
                  />
                </Space>
              </div>
            );
          })}

          <p className="text-xs text-gray-500 mt-4">
            💡 Pro tip: Changes will be reflected on the website instantly via real-time sync.
          </p>
        </Card>
      </Form>
    </Edit>
  );
};
