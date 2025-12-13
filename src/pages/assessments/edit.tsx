import { useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, message } from "antd";
import { supabaseClient } from "../../utility/supabaseClient";
import { useParams } from "react-router-dom";

export const AssessmentEdit = () => {
  const [loading, setLoading] = useState(false);
  const { formProps, saveButtonProps, form } = useForm();
  const { id } = useParams();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
        const { error } = await supabaseClient
            .from('assessments')
            .update({
                title: values.title,
                description: values.description,
                external_link: values.external_link,
                icon_name: values.icon_name
            })
            .eq('id', id);
        
        if (error) throw error;
        message.success("Assessment updated successfully!");
    } catch (err: any) {
        message.error("Error saving assessment: " + err.message);
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
          label="Title" 
          name="title" 
          rules={[{ required: true, message: "Title is required" }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={3} />
        </Form.Item>
        
        <Form.Item 
          label="External Link (Microsoft Form URL)" 
          name="external_link" 
          rules={[{ required: true, message: "Please provide the form link" }]}
        >
          <Input />
        </Form.Item>
        
        <Form.Item 
          label="Icon Name (Lucide React)" 
          name="icon_name"
          help={<span>Find icon names on <a href="https://lucide.dev/icons" target="_blank" rel="noreferrer">lucide.dev</a> (e.g. ClipboardCheck, Users)</span>}
        >
          <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};