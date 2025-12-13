import { useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, message } from "antd";
import dayjs from "dayjs";
import { supabaseClient } from "../../utility/supabaseClient";
import { useParams } from "react-router-dom";

export const VideoEdit = () => {
  const [loading, setLoading] = useState(false);
  const { formProps, saveButtonProps, form } = useForm();
  const { id } = useParams();

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
        const { error } = await supabaseClient
            .from('videos')
            .update({
                title: values.title,
                description: values.description,
                youtube_id: values.youtube_id,
                date_published: values.date_published ? values.date_published.format('YYYY-MM-DD') : null
            })
            .eq('id', id);
        
        if (error) throw error;
        message.success("Video updated successfully!");
    } catch (err: any) {
        message.error("Error saving video: " + err.message);
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
          label="Video Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Description"
          name="description"
          rules={[{ required: true }]}
        >
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item
          label="YouTube Video ID"
          name="youtube_id"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item 
            label="Date Published" 
            name="date_published"
            getValueProps={(value) => ({
                value: value ? dayjs(value) : undefined,
            })}
            help="Used for sorting videos chronologically."
        >
            <DatePicker style={{ width: '100%' }} />
        </Form.Item>
      </Form>
    </Edit>
  );
};