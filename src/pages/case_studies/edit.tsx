import { useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, message } from "antd";
import { supabaseClient } from "../../utility/supabaseClient";
import { useParams } from "react-router-dom";

export const CaseStudyEdit = () => {
  const [loading, setLoading] = useState(false);
  const { formProps, saveButtonProps, form } = useForm();
  const { id } = useParams();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
        const { error } = await supabaseClient
            .from('case_studies')
            .update({
                title: values.title,
                link_url: values.link_url,
                client_name: values.client_name,
                industry: values.industry,
                industry_slug: values.industry_slug,
                challenge: values.challenge,
                solution: values.solution,
                results: values.results, // JSONB/Array
                tags: values.tags // JSONB/Array
            })
            .eq('id', id);
        
        if (error) throw error;
        message.success("Case study updated successfully!");
    } catch (err: any) {
        message.error("Error saving case study: " + err.message);
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
        <Form.Item 
          label="Case Study Title" 
          name="title" 
          rules={[{ required: true, message: "Title is required" }]}>
          <Input />
        </Form.Item>

        <Form.Item label="External Link URL" name="link_url" help="Optional: Overrides default view behavior">
            <Input placeholder="https://..." />
        </Form.Item>

        <div style={{ display: "flex", gap: "16px" }}>
          <Form.Item label="Client Name" name="client_name" style={{ flex: 1 }}>
            <Input />
          </Form.Item>
          <Form.Item label="Industry" name="industry" style={{ flex: 1 }}>
            <Input />
          </Form.Item>
          <Form.Item label="Industry Slug (for linking)" name="industry_slug" style={{ flex: 1 }}>
             <Input placeholder="e.g. retail" />
          </Form.Item>
        </div>

        <Form.Item label="The Challenge" name="challenge">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item label="The Solution" name="solution">
          <Input.TextArea rows={3} />
        </Form.Item>

        <Form.Item 
          label="Key Results" 
          name="results"
          help="Press Enter to add new items"
        >
          <Select mode="tags" tokenSeparators={[',']} open={false} />
        </Form.Item>

        <Form.Item 
          label="Tags" 
          name="tags"
          help="Press Enter to add new tags"
        >
          <Select mode="tags" tokenSeparators={[',']} open={false} />
        </Form.Item>
      </Form>
    </Edit>
  );
};