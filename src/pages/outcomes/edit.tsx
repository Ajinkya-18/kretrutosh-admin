import { useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, message } from "antd";
import { supabaseClient } from "../../utility/supabaseClient";
import { useParams } from "react-router-dom";

export const OutcomeEdit = () => {
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const { formProps, saveButtonProps, form } = useForm({
    id: id, // Tell Refine to fetch the record with this id
  });

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      const { error } = await supabaseClient
        .from('outcomes')
        .update({
          title: values.title,
          icon: values.icon
        })
        .eq('id', id);
      
      if (error) throw error;
      message.success("Outcome updated successfully!");
    } catch (err: any) {
      message.error("Error saving outcome: " + err.message);
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
          rules={[{ required: true, message: 'Please enter outcome title' }]}
        >
          <Input placeholder="e.g. Increased Customer Lifetime Value" />
        </Form.Item>
        <Form.Item
          label="Icon"
          name="icon"
          help="Lucide icon name (default: check-circle)"
        >
          <Input placeholder="check-circle" />
        </Form.Item>
      </Form>
    </Edit>
  );
};
