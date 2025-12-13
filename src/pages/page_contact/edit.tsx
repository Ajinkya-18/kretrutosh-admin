import { useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, message } from "antd";
import { supabaseClient } from "../../utility/supabaseClient";
import { RichTextEditor } from "../../components/RichTextEditor";

export const PageContactEdit = () => {
  const [loading, setLoading] = useState(false);
  const { formProps, saveButtonProps, form } = useForm({
    action: "edit",
    id: 1, // Singleton
    queryOptions: {
        select: ({ data }) => ({ data })
    }
  });

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
        const { error } = await supabaseClient
            .from('page_contact')
            .upsert({ 
                id: 1,
                hero_title: values.hero_title,
                address_html: values.address_html,
                google_form_url: values.google_form_url,
                calendly_url: values.calendly_url,
                calendly_cta_text: values.calendly_cta_text,
                map_embed: values.map_embed
            });
        
        if (error) throw error;
        message.success("Contact page updated successfully!");
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
        <Form.Item label="Hero Title" name="hero_title" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Address / Details (Rich HTML)" name="address_html"><RichTextEditor /></Form.Item>
        
        <div className="p-4 bg-gray-50 rounded-lg mb-6 border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Integrations</h3>
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
        </div>

        <Form.Item label="Google Map Embed Code (Iframe)" name="map_embed">
            <Input.TextArea rows={4} />
        </Form.Item>
      </Form>
    </Edit>
  );
};
