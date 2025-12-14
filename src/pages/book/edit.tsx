import { useState, useEffect } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, message } from "antd";
import { supabaseClient } from "../../utility/supabaseClient";

export const BookEdit = () => {
  const [loading, setLoading] = useState(false);
  const [recordId, setRecordId] = useState<string | number | undefined>(undefined);

  useEffect(() => {
    const fetchId = async () => {
      const { data } = await supabaseClient.from('book').select('id').maybeSingle();
      if (data) setRecordId(data.id);
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
        author_bio: values.author_bio
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
        <h3 className="text-lg font-semibold mb-4">Hero Section</h3>
        <Form.Item label="Hero Title" name="hero_title" rules={[{ required: true }]}>
          <Input placeholder="Beyond Customer Satisfaction" />
        </Form.Item>
        <Form.Item label="Hero Subtitle" name="hero_subtitle">
          <Input.TextArea rows={2} placeholder="Crafting Exceptional Customer Experiences..." />
        </Form.Item>

        <div className="my-6 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">About the Book</h3>
          <Form.Item label="About Title" name="about_title">
            <Input placeholder="About the Book" />
          </Form.Item>
          <Form.Item label="About Description" name="about_description">
            <Input.TextArea rows={4} placeholder="Dive into the world of customer experience transformation..." />
          </Form.Item>
        </div>

        <div className="my-6 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Pricing & CTA</h3>
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
        </div>

        <div className="my-6 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Images</h3>
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
        </div>

        <div className="my-6 border-t pt-6">
          <h3 className="text-lg font-semibold mb-4">Author Section</h3>
          <Form.Item label="Author Title" name="author_title">
            <Input placeholder="About the Author" />
          </Form.Item>
          <Form.Item label="Author Bio" name="author_bio">
            <Input.TextArea rows={3} placeholder="Ashutosh Karandikar brings over 20 years..." />
          </Form.Item>
        </div>
      </Form>
    </Edit>
  );
};
