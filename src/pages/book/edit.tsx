import { useState, useEffect } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";
import { RichTextEditor } from "../../components/RichTextEditor";

export const BookEdit = () => {
  const [loading, setLoading] = useState(false);
  const [recordId, setRecordId] = useState<string | number | undefined>(undefined);

  useEffect(() => {
      const fetchId = async () => {
          const { data } = await supabaseClient.from('book').select('id').maybeSingle();
          if (data) setRecordId(data.id);
      }
      fetchId();
  }, []);

  const { formProps, saveButtonProps, form, queryResult } = useForm({
    action: "edit",
    id: recordId,
    queryOptions: {
        enabled: !!recordId,
        select: ({ data }) => ({ data })
    }
  });

  const data = queryResult?.data?.data;
  
  const defaultFileList = data?.cover_image ? [{ uid: '-1', name: 'current', status: 'done', url: data.cover_image }] : [];

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
        let error;
        if (recordId) {
            const { error: updateError } = await supabaseClient
                .from('book')
                .update({ 
                    title: values.title,
                    amazon_link: values.amazon_link,
                    description_html: values.description_html,
                    cover_image: values.cover_image
                })
                .eq('id', recordId);
            error = updateError;
        } else {
             const { error: insertError } = await supabaseClient
                .from('book')
                .insert({ 
                    title: values.title,
                    amazon_link: values.amazon_link,
                    description_html: values.description_html,
                    cover_image: values.cover_image
                });
            error = insertError;
        }
        
        if (error) throw error;
        message.success("Book updated successfully!");
    } catch (err: any) {
        message.error("Error saving data: " + err.message);
    } finally {
        setLoading(false);
    }
  };

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `book/${Date.now()}_${file.name.replace(/[^a-zA-Z0-9]/g, '_')}`;
      const { error } = await supabaseClient.storage.from("website-assets").upload(fileName, file);
      if (error) throw error;
      const { data } = supabaseClient.storage.from("website-assets").getPublicUrl(fileName);
      form.setFieldValue("cover_image", data.publicUrl);
      onSuccess(data.publicUrl);
    } catch (e: any) { onError(e); message.error("Failed"); }
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
        <Form.Item label="Book Title" name="title" rules={[{ required: true }]}><Input /></Form.Item>
        <Form.Item label="Amazon Link" name="amazon_link"><Input /></Form.Item>
        <Form.Item label="Description (Rich HTML)" name="description_html"><RichTextEditor /></Form.Item>
        <Form.Item name="cover_image" hidden><Input /></Form.Item>
        <Form.Item label="Cover Image">
            <Upload.Dragger customRequest={customRequest} maxCount={1} listType="picture" defaultFileList={defaultFileList as any}>
                <p className="ant-upload-drag-icon"><UploadOutlined /></p>
                <p className="ant-upload-text">Upload Cover</p>
            </Upload.Dragger>
        </Form.Item>
      </Form>
    </Edit>
  );
};
