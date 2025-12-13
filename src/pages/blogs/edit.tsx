import { useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

export const BlogEdit = () => {
  const [loading, setLoading] = useState(false);
  const { formProps, saveButtonProps, form, queryResult } = useForm();
  const { id } = useParams();

  // Handle existing data
  const blogData = queryResult?.data?.data;
  if (formProps.initialValues?.publish_date) {
    formProps.initialValues.publish_date = dayjs(formProps.initialValues.publish_date);
  }

  // Show existing image in the upload list
  const defaultFileList = blogData?.image_url ? [
    {
      uid: '-1',
      name: 'current-image',
      status: 'done',
      url: blogData.image_url,
    }
  ] : [];

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
        const { error } = await supabaseClient
            .from('articles') // User specified table: articles
            .update({
                title: values.title,
                description: values.description,
                link: values.link,
                publish_date: values.publish_date ? values.publish_date.format('YYYY-MM-DD') : null,
                image_url: values.image_url
            })
            .eq('id', id);
        
        if (error) throw error;
        message.success("Article updated successfully!");
    } catch (err: any) {
        message.error("Error saving article: " + err.message);
    } finally {
        setLoading(false);
    }
  };

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `blogs/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      
      const { error } = await supabaseClient.storage
        .from("website-assets") // Correct Bucket
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (error) throw error;

      const { data } = supabaseClient.storage
        .from("website-assets")
        .getPublicUrl(fileName);

      const url = data.publicUrl;
      form.setFieldValue("image_url", url); // Manual Set
      onSuccess(url);
      message.success("Image uploaded!");
    } catch (error: any) {
      message.error("Upload failed: " + error.message);
      onError(error);
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
        <Form.Item label="Title" name="title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item label="Description" name="description">
          <Input.TextArea rows={4} />
        </Form.Item>
        <Form.Item label="External Link" name="link">
          <Input />
        </Form.Item>
        <Form.Item label="Publish Date" name="publish_date">
          <DatePicker style={{ width: "100%" }} />
        </Form.Item>

        {/* Hidden Field */}
        <Form.Item name="image_url" hidden><Input /></Form.Item>

        <Form.Item label="Cover Image">
          <Upload.Dragger
            name="file"
            customRequest={customRequest}
            listType="picture"
            maxCount={1}
            defaultFileList={defaultFileList as any}
            key={defaultFileList.length > 0 ? "loaded" : "empty"}
          >
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Upload new image to replace</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Edit>
  );
};