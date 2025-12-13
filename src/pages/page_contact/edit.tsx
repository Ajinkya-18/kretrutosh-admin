import { Edit, useForm } from "@refinedev/antd";
import { Form, Input } from "antd";
import { RichTextEditor } from "../../components/RichTextEditor";

export const PageContactEdit = () => {
  const { formProps, saveButtonProps } = useForm();

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Hero Title" name="hero_title" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Address / Details (Rich HTML)" name="address_html"><RichTextEditor /></Form.Item>
        
        <div className="p-4 bg-gray-50 rounded-lg mb-6 border border-gray-200">
            <h3 className="text-lg font-medium mb-4">Integrations</h3>
            <Form.Item 
                label="Google Form Embed URL" 
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
                <Form.Item label="Calendly Button Text" name="calendly_cta_text">
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
