import React from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Upload, Button } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility";

// This helps display the existing image if there is one
const normFile = (e: any) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

export const PageEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();

  // Helper to handle custom image upload to Supabase
  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `banners/${Date.now()}-${file.name}`;
      const { data, error } = await supabaseClient.storage
        .from("public-assets") // Your bucket name
        .upload(fileName, file);

      if (error) throw error;

      // Get the public URL
      const { data: publicData } = supabaseClient.storage
        .from("public-assets")
        .getPublicUrl(fileName);

      onSuccess(publicData.publicUrl);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Page Slug (ID)"
          name="slug"
          help="Do not change this. It identifies the page (e.g., 'home')"
        >
          <Input disabled />
        </Form.Item>

        <Form.Item
          label="Hero Headline"
          name="hero_headline"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>

        <Form.Item label="Hero Sub-headline" name="hero_subheadline">
          <Input.TextArea rows={4} />
        </Form.Item>

        {/* Image Upload Field */}
        <Form.Item
          label="Hero Banner Image"
          name="hero_image_url"
          getValueFromEvent={(e) => {
            // We only want to save the URL string to the database
            if (Array.isArray(e)) return e;
            return e && e.fileList && e.fileList.length > 0
              ? e.fileList[0].response // The URL returned by customRequest
              : null;
          }}
        >
          <Upload.Dragger
            name="file"
            customRequest={customRequest}
            listType="picture"
            maxCount={1}
          >
            <p className="ant-upload-drag-icon">
              <UploadOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Edit>
  );
};