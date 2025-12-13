import { useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, message } from "antd";
import { supabaseClient } from "../../utility/supabaseClient";

export const PageHomeEdit = () => {
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
            .from('page_home')
            .upsert({ 
                id: 1,
                hero_title: values.hero_title,
                hero_subtitle: values.hero_subtitle,
                hero_video_url: values.hero_video_url,
                growth_engine_title: values.growth_engine_title,
                frameworks_title: values.frameworks_title
            });
        
        if (error) throw error;
        message.success("Home configuration updated successfully!");
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
        <Form.Item label="Hero Title" name="hero_title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Hero Subtitle" name="hero_subtitle">
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Hero Video URL" name="hero_video_url">
           <Input placeholder="https://youtube.com/..." />
        </Form.Item>

        <Form.Item label="Growth Engine Section Title" name="growth_engine_title">
           <Input />
        </Form.Item>
        <Form.Item label="Frameworks Section Title" name="frameworks_title">
           <Input />
        </Form.Item>
      </Form>
    </Edit>
  );
};
