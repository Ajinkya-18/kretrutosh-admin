import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility";
import { useState } from "react";

export const PageCreate = () => {
  const { formProps, saveButtonProps, form } = useForm();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (options: any) => {
    const { file, onSuccess, onError } = options;
    try {
      setUploading(true);
      const fileName = `${Date.now()}-${file.name}`;
      const { data, error } = await supabaseClient.storage
        .from("website-assets")
        .upload(fileName, file);

      if (error) throw error;

      const { data: { publicUrl } } = supabaseClient.storage
        .from("website-assets")
        .getPublicUrl(fileName);

      onSuccess(publicUrl);
      form.setFieldValue("hero_image_url", publicUrl);
      message.success("File uploaded successfully");
    } catch (error) {
      onError(error);
      message.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item
          label="Slug"
          name="slug"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          rules={[{ required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          label="Hero Image"
        >
           <Upload.Dragger
              name="file"
              customRequest={handleUpload}
              listType="picture"
              maxCount={1}
              accept="image/*"
              showUploadList={false}
            >
              <p className="ant-upload-drag-icon">
                <UploadOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
            </Upload.Dragger>
        </Form.Item>
        <Form.Item name="hero_image_url" hidden>
            <Input />
        </Form.Item>
        <Form.Item shouldUpdate>
            {() => {
                const url = form.getFieldValue("hero_image_url");
                return url ? (
                    <div style={{ marginTop: 10 }}>
                        <p>Current Image:</p>
                        <img src={url} alt="Hero" style={{ maxWidth: '100%', maxHeight: 200, objectFit: 'contain' }} />
                    </div>
                ) : null;
            }}
        </Form.Item>
         <Form.Item
          label="Hero Video URL"
          name="hero_video_url"
        >
          <Input placeholder="Enter video URL" />
        </Form.Item>
        <Form.Item
          label="Body Text"
          name="body_text"
        >
          <Input.TextArea rows={5} />
        </Form.Item>
      </Form>
    </Create>
  );
};
