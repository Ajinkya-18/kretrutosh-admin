import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, DatePicker, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";
import dayjs from "dayjs";

export const BlogEdit = () => {
  const { formProps, saveButtonProps, form, queryResult } = useForm();

  // Handle existing data for the DatePicker
  const blogData = queryResult?.data?.data;
  if (formProps.initialValues?.publish_date) {
    formProps.initialValues.publish_date = dayjs(formProps.initialValues.publish_date);
  }

  // Create a default fileList to show the existing image
  const defaultFileList = blogData?.image_url ? [
    {
      uid: '-1',
      name: 'current-image',
      status: 'done',
      url: blogData.image_url,
    }
  ] : [];

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `blogs/${Date.now()}-${file.name}`;
      const { error } = await supabaseClient.storage
        .from("website-assets")
        .upload(fileName, file);

      if (error) throw error;

      const { data } = supabaseClient.storage
        .from("website-assets")
        .getPublicUrl(fileName);

      const url = data.publicUrl;

      // Manually update the hidden form field
      form.setFieldValue("image_url", url);
      
      onSuccess(url);
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Edit saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
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

        {/* Hidden field to store the URL string */}
        <Form.Item name="image_url" hidden>
          <Input />
        </Form.Item>

        {/* Upload UI */}
        <Form.Item label="Cover Image">
          <Upload.Dragger
            name="file"
            customRequest={customRequest}
            listType="picture"
            maxCount={1}
            defaultFileList={defaultFileList as any} // Show existing image
            key={defaultFileList.length > 0 ? "loaded" : "empty"} // Force re-render when data loads
          >
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Upload new image to replace current</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Edit>
  );
};