import { useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, message } from "antd";
import { RichTextEditor } from "../../components/RichTextEditor";
import { supabaseClient } from "../../utility/supabaseClient";
import { useParams } from "react-router-dom";

export const IndustryEdit = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { formProps, saveButtonProps, form } = useForm({
    id: id, // Tell Refine to fetch the record with this id
  });

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
        const { error } = await supabaseClient
            .from('industries')
            .update({
                title: values.title,
                slug: values.slug,
                subtitle: values.subtitle,
                icon_name: values.icon_name,
                framework_slugs: values.framework_slugs, // JSONB/Array
                challenges_html: values.challenges_html,
                approach_html: values.approach_html,
                description: values.description,
                outcomes: values.outcomes // JSONB/Array
            })
            .eq('id', id); // Industries use 'id' in App.tsx (:id)
        
        if (error) throw error;
        message.success("Industry updated successfully!");
    } catch (err: any) {
        message.error("Error saving industry: " + err.message);
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
        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item 
            label="Industry Title" 
            name="title" 
            style={{ flex: 1 }} 
            rules={[{ required: true, message: "Title is required" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="URL Slug" 
            name="slug" 
            style={{ flex: 1 }} 
            rules={[{ required: true, message: "Slug is required" }]}
          >
            <Input />
          </Form.Item>
        </div>

        <Form.Item label="Subtitle" name="subtitle" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item label="Icon Name (Lucide React)" name="icon_name">
          <Input />
        </Form.Item>
        
        <Form.Item label="Related Framework Slugs" name="framework_slugs">
          <Select mode="tags" tokenSeparators={[',']} open={false} />
        </Form.Item>

        <Form.Item label="Challenges (Rich HTML)" name="challenges_html">
          <RichTextEditor />
        </Form.Item>

        <Form.Item label="Our Tailored Approach (Rich HTML)" name="approach_html">
          <RichTextEditor />
        </Form.Item>

        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="Impact Outcomes" name="outcomes">
          <Select mode="tags" tokenSeparators={[',']} open={false} />
        </Form.Item>
      </Form>
    </Edit>
  );
};