import { useState, useEffect } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, message, Card, Space, Switch, Tag, Typography } from "antd";
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
  { key: "form", label: "Contact Form" },
  { key: "calendly", label: "Calendly Booking" },
  { key: "address", label: "Address Details" },
  { key: "map", label: "Google Map" }
];

export const PageContactEdit = () => {
  const [loading, setLoading] = useState(false);
  const [recordId, setRecordId] = useState<string | number | undefined>(undefined);
  const [layoutOrder, setLayoutOrder] = useState<string[]>([]);
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({});

  useEffect(() => {
      const fetchId = async () => {
          const { data } = await supabaseClient.from('page_contact').select('*').maybeSingle();
          if (data) {
            setRecordId(data.id);
            setLayoutOrder(data.layout_order || DEFAULT_SECTIONS.map(s => s.key));
            setSectionVisibility(data.section_visibility || {});
          }
      }
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
          address_html: values.address_html,
          google_form_url: values.google_form_url,
          calendly_url: values.calendly_url,
          calendly_cta_text: values.calendly_cta_text,
          map_embed: values.map_embed,
          layout_order: layoutOrder,
          section_visibility: sectionVisibility
        };

        if (recordId) {
             const { error: updateError } = await supabaseClient
            .from('page_contact')
            .update(payload)
            .eq('id', recordId);
            error = updateError;
        } else {
             const { error: insertError } = await supabaseClient
            .from('page_contact')
            .insert(payload);
            error = insertError;
        }
        
        if (error) throw error;
        message.success("Contact page updated successfully! Changes will reflect instantly on the website.");
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
        {/* Hero Section */}
        <Card title="Hero Section" className="mb-4">
          <Form.Item label="Hero Title" name="hero_title" rules={[{ required: true }]}>
            <Input placeholder="Let's Talk Growth" />
          </Form.Item>
        </Card>

        {/* Contact Details */}
        <Card title="Contact Details" className="mb-4">
          <Form.Item label="Address / Details (Rich HTML)" name="address_html">
            <RichTextEditor />
          </Form.Item>
        </Card>
        
        {/* Integrations */}
        <Card title="Integrations" className="mb-4">
          <Form.Item 
              label="Google Form Embed Source URL" 
              name="google_form_url"
              help="Paste the 'src' link from the Google Form Embed HTML (starts with https://docs.google.com...)"
          >
              <Input placeholder="https://docs.google.com/forms/d/e/..." />
          </Form.Item>
          
          <div className="grid grid-cols-2 gap-4">
              <Form.Item 
                  label="Calendly Link" 
                  name="calendly_url"
                  help="Your public Calendly URL"
              >
                  <Input placeholder="https://calendly.com/your-link" />
              </Form.Item>
              <Form.Item label="Button Label" name="calendly_cta_text">
                  <Input placeholder="Book a Strategy Call" />
              </Form.Item>
          </div>
        </Card>

        {/* Map */}
        <Card title="Google Map" className="mb-4">
          <Form.Item label="Google Map Embed Code (Iframe)" name="map_embed">
              <Input.TextArea rows={4} placeholder="<iframe src='https://www.google.com/maps/embed...' />" />
          </Form.Item>
        </Card>

        {/* Drag-and-Drop Layout Manager */}
        <Card title="🎨 Contact Page Structure - Drag to Reorder" className="mb-4">
          <p style={{ color: '#666', marginBottom: 16 }}>
            Drag sections to reorder them on the Contact page. Toggle visibility to show/hide sections.
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
