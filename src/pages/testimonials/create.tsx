import { Create, useForm } from "@refinedev/antd";
import { Form, Input, Upload, Rate } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { supabaseClient } from "../../utility/supabaseClient";

export const TestimonialCreate = () => {
  const { formProps, saveButtonProps } = useForm();

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `testimonials/${Date.now()}-${file.name}`;
      const { error } = await supabaseClient.storage.from("public-assets").upload(fileName, file);
      if (error) throw error;
      const { data } = supabaseClient.storage.from("public-assets").getPublicUrl(fileName);
      onSuccess(data.publicUrl);
    } catch (error) { onError(error); }
  };

  return (
    <Create saveButtonProps={saveButtonProps}>
      <Form {...formProps} layout="vertical">
        <Form.Item label="Client Name" name="client_name" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <div style={{ display: 'flex', gap: '16px' }}>
          <Form.Item label="Role" name="client_role" style={{ flex: 1 }}>
            <Input placeholder="e.g. CEO" />
          </Form.Item>
          <Form.Item label="Company" name="company" style={{ flex: 1 }}>
            <Input placeholder="e.g. Acme Corp" />
          </Form.Item>
        </div>
        <Form.Item label="Quote" name="quote" rules={[{ required: true }]}>
          <Input.TextArea rows={3} />
        </Form.Item>
        <Form.Item label="Rating" name="rating" initialValue={5}>
          <Rate />
        </Form.Item>
        <Form.Item
          label="Client Avatar"
          name="avatar_url"
          getValueFromEvent={(e) => {
            if (Array.isArray(e)) return e;
            return e?.fileList[0]?.response;
          }}
        >
          <Upload.Dragger name="file" customRequest={customRequest} listType="picture" maxCount={1}>
            <p className="ant-upload-drag-icon"><UploadOutlined /></p>
            <p className="ant-upload-text">Upload Avatar</p>
          </Upload.Dragger>
        </Form.Item>
      </Form>
    </Create>
  );
};