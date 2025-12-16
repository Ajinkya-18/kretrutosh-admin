import { useState, useEffect } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, message, Card, Space, Switch, Tag, Typography } from "antd";
import { supabaseClient } from "../../utility/supabaseClient";
import { SortableList, SortableItem } from "../../components/builder";

const { Text } = Typography;

interface SectionItem {
  key: string;
  label: string;
  locked?: boolean;
}

const DEFAULT_SECTIONS: SectionItem[] = [
  { key: "hero", label: "Hero Section", locked: true },
  { key: "content", label: "Book Content & CTA" },
  { key: "author", label: "About the Author" }
];

export const BookEdit = () => {
  const [loading, setLoading] = useState(false);
  const [recordId, setRecordId] = useState<string | number | undefined>(undefined);
  const [layoutOrder, setLayoutOrder] = useState<string[]>([]);
  const [sectionVisibility, setSectionVisibility] = useState<Record<string, boolean>>({});

  useEffect(() => {
    const fetchId = async () => {
      const { data } = await supabaseClient.from('book').select('*').maybeSingle();
      if (data) {
        setRecordId(data.id);
        setLayoutOrder(data.layout_order || DEFAULT_SECTIONS.map(s => s.key));
        setSectionVisibility(data.section_visibility || {});
      }
    };
    fetchId();
  }, []);

  const { formProps, saveButtonProps, form} = useForm({
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
        about_title: values.about_title,
        about_description: values.about_description,
        price_text: values.price_text,
        cta_title: values.cta_title,
        cta_button_text: values.cta_button_text,
        amazon_url: values.amazon_url,
        cover_image_url: values.cover_image_url,
        qr_image_url: values.qr_image_url,
        qr_title: values.qr_title,
        qr_description: values.qr_description,
        author_title: values.author_title,
        author_bio: values.author_bio,
        layout_order: layoutOrder,
        section_visibility: sectionVisibility
      };

      if (recordId) {
        const { error: updateError } = await supabaseClient
          .from('book')
          .update(payload)
          .eq('id', recordId);
        error = updateError;
      } else {
        const { error: insertError } = await supabaseClient
          .from('book')
          .insert(payload);
        error = insertError;
      }
      
      if (error) throw error;
      message.success("Book details updated successfully! Changes will reflect instantly on the website.");
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
        <Card title="Hero Section Content" className="mb-4">
          <Form.Item label="Hero Title" name="hero_title" rules={[{ required: true }]}>
            <Input placeholder="Beyond Customer Satisfaction" />
          </Form.Item>
          <Form.Item label="Hero Subtitle" name="hero_subtitle">
            <Input.TextArea rows={2} placeholder="Crafting Exceptional Customer Experiences..." />
          </Form.Item>
        </Card>

        {/* About the Book */}
        <Card title="About the Book" className="mb-4">
          <Form.Item label="About Title" name="about_title">
            <Input placeholder="About the Book" />
          </Form.Item>
          <Form.Item label="About Description" name="about_description">
            <Input.TextArea rows={4} placeholder="Dive into the world of customer experience transformation..." />
          </Form.Item>
        </Card>

        {/* Pricing & CTA */}
        <Card title="Pricing & CTA" className="mb-4">
          <Form.Item label="Price Text" name="price_text">
            <Input placeholder="Now FREE on Amazon" />
          </Form.Item>
          <Form.Item label="CTA Title" name="cta_title">
            <Input placeholder="Get Your Copy" />
          </Form.Item>
          <Form.Item label="CTA Button Text" name="cta_button_text">
            <Input placeholder="Download from Amazon" />
          </Form.Item>
          <Form.Item label="Amazon URL" name="amazon_url" rules={[{ type: 'url', message: 'Please enter a valid URL' }]}>
            <Input placeholder="https://www.amazon.in/dp/B0D17W5B1B" />
          </Form.Item>
        </Card>

        {/* Images */}
        <Card title="Images" className="mb-4">
          <Form.Item label="Cover Image URL" name="cover_image_url">
            <Input placeholder="https://..." />
          </Form.Item>
          <Form.Item label="QR Code Image URL" name="qr_image_url">
            <Input placeholder="https://..." />
          </Form.Item>
          <Form.Item label="QR Title" name="qr_title">
            <Input placeholder="Scan to Download" />
          </Form.Item>
          <Form.Item label="QR Description" name="qr_description">
            <Input.TextArea rows={2} placeholder="Scan this QR code with your mobile device..." />
          </Form.Item>
        </Card>

        {/* Author Section */}
        <Card title="Author Section" className="mb-4">
          <Form.Item label="Author Title" name="author_title">
            <Input placeholder="About the Author" />
          </Form.Item>
          <Form.Item label="Author Bio" name="author_bio">
            <Input.TextArea rows={3} placeholder="Ashutosh Karandikar brings over 20 years..." />
          </Form.Item>
        </Card>

        {/* Drag-and-Drop Layout Manager */}
        <Card title="🎨 Book Page Structure - Drag to Reorder" className="mb-4">
          <p style={{ color: '#666', marginBottom: 16 }}>
            Drag sections to reorder them on the Book page. Toggle visibility to show/hide sections.
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
