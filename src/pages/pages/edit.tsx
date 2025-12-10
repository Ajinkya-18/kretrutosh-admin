import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Select, Slider, Switch, Radio, Tabs, Alert, Button, Divider } from "antd";
import { Link as LinkIcon, Eye } from "lucide-react";

export const PagesEdit = () => {
  const { formProps, saveButtonProps, queryResult } = useForm();
  const record = queryResult?.data?.data;
  
  // Watch media type to conditional render inputs
  const mediaType = Form.useWatch("media_type", formProps.form);

  return (
    <Edit 
        saveButtonProps={saveButtonProps}
        headerButtons={({ defaultButtons }) => (
            <>
                {defaultButtons}
                {record?.slug && (
                    <Button 
                        type="primary" 
                        ghost 
                        icon={<Eye size={16} />} 
                        onClick={() => window.open(`https://kretrutosh.com/${record.slug === 'home' ? '' : record.slug}`, '_blank')}
                    >
                        View Live Page
                    </Button>
                )}
            </>
        )}
    >
      <Form {...formProps} layout="vertical">
        {record?.slug && (
           <Alert 
              message={`Editing Configuration for: /${record.slug}`} 
              type="info" 
              className="mb-6 font-medium"
              showIcon
           />
        )}

        <Tabs defaultActiveKey="1" items={[
            {
                key: '1',
                label: 'Banner & Media',
                children: (
                    <div className="pt-4">
                        <div className="grid grid-cols-2 gap-6">
                            <Form.Item label="Page Slug (Read Only)" name="slug">
                                <Input disabled className="font-mono text-gray-500 bg-gray-50" />
                            </Form.Item>
                            <Form.Item 
                                label="Hero Media Type" 
                                name="media_type"
                                initialValue="image"
                            >
                                <Radio.Group buttonStyle="solid">
                                    <Radio.Button value="image">Static Image</Radio.Button>
                                    <Radio.Button value="video">Cinematic Video</Radio.Button>
                                </Radio.Group>
                            </Form.Item>
                        </div>
                        
                        <Divider />
                        
                        <div className="p-6 bg-gray-50 rounded-xl mb-6 border border-gray-200">
                             {mediaType === 'video' ? (
                                <div className="space-y-4">
                                     <Alert 
                                        message="Video Requirements" 
                                        description="For best performance, use a hosted MP4 link (e.g. from AWS S3, Cloudinary, or Supabase Storage). YouTube links are NOT supported for background playback."
                                        type="warning"
                                        showIcon
                                     />
                                     <Form.Item 
                                        label="Video URL (MP4)" 
                                        name="hero_video_url" 
                                        rules={[{ required: true, message: 'Video URL is required for video mode' }]}
                                        extra="Example: https://bucket.supabase.co/.../hero-bg.mp4"
                                    >
                                        <Input placeholder="https://..." prefix={<LinkIcon size={14} />} />
                                     </Form.Item>
                                      <Form.Item 
                                        label="Fallback Image (Poster)" 
                                        name="hero_image_url"
                                        help="Shown while video loads or on mobile power-save mode."
                                    >
                                        <Input placeholder="Image URL..." />
                                     </Form.Item>
                                </div>
                             ) : (
                                <Form.Item label="Background Image URL" name="hero_image_url">
                                     <Input placeholder="Image URL..." />
                                </Form.Item>
                             )}

                             <div className="mt-6">
                                <Form.Item 
                                    label="Text Readability (Overlay Opacity)" 
                                    name="overlay_opacity"
                                    help="0% = No Overlay, 90% = Very Dark Overlay. Adjust to make white text readable."
                                >
                                    <Slider min={0} max={90} marks={{ 0: '0%', 30: '30%', 60: '60%', 90: '90%' }} />
                                </Form.Item>
                             </div>
                        </div>

                        <Divider orientation="left">Hero Content</Divider>
                        <Form.Item label="Main Title" name="title" rules={[{ required: true }]}>
                            <Input size="large" className="font-bold text-lg" />
                        </Form.Item>
                        <Form.Item label="Subtitle / Tagline" name="subtitle">
                            <Input.TextArea rows={2} showCount maxLength={200} />
                        </Form.Item> 
                        <div className="grid grid-cols-2 gap-4">
                            <Form.Item label="CTA Button Text" name="cta_text"><Input /></Form.Item>
                            <Form.Item label="CTA Button Link" name="cta_link"><Input /></Form.Item>
                        </div>
                    </div>
                )
            },
            {
                key: '2',
                label: 'SEO & Metadata',
                children: (
                    <div className="pt-4 max-w-3xl">
                        <Alert message="Search Engine Optimization" description="These settings control how this page appears in Google search results." type="success" className="mb-6" />
                        <Form.Item label="Meta Title (Browser Tab)" name="meta_title">
                            <Input showCount maxLength={60} />
                        </Form.Item>
                        <Form.Item label="Meta Description" name="meta_description">
                            <Input.TextArea rows={4} showCount maxLength={160} />
                        </Form.Item>
                    </div>
                )
            }
        ]} />
      </Form>
    </Edit>
  );
};
