import { Create, useForm } from "@refinedev/antd";
import { Form, Input, message } from "antd";
import { supabaseClient } from "../../utility";

export const OutcomeCreate = () => {
  const { formProps, saveButtonProps, form } = useForm();

  const onFinish = async (values: any) => {
    try {
      // Get the highest display_order to append new outcome at the end
      const { data: existingOutcomes, error: fetchError } = await supabaseClient
        .from('outcomes')
        .select('display_order')
        .order('display_order', { ascending: false })
        .limit(1);

      if (fetchError) throw fetchError;

      const maxOrder = existingOutcomes && existingOutcomes.length > 0 
        ? existingOutcomes[0].display_order 
        : -1;

      const { error } = await supabaseClient
        .from('outcomes')
        .insert({
          title: values.title,
          icon: values.icon || 'check-circle',
          display_order: maxOrder + 1
        });

      if (error) throw error;

      message.success("Outcome created successfully!");
      form.resetFields();
    } catch (err: any) {
      message.error("Error creating outcome: " + err.message);
    }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical" onFinish={onFinish}>
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
    </Create>
  );
};
