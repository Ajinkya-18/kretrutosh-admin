import { useEffect, useState } from "react";
import { Edit, useForm } from "@refinedev/antd";
import { Form, Input, Card, Space, Button, Divider, Upload, message } from "antd";
import { DeleteOutlined, PlusOutlined, UploadOutlined } from "@ant-design/icons";
import { GripVertical } from "lucide-react";
import { supabaseClient } from "../../utility/supabaseClient";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

// Sortable menu item component
const SortableMenuItem = ({ id, index, name, remove, children }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card 
        size="small" 
        style={{ 
          marginBottom: 8, 
          background: '#f9f9f9',
          cursor: isDragging ? 'grabbing' : 'default',
        }}
      >
        <Space style={{ display: 'flex', width: '100%' }} align="baseline">
          {/* Drag Handle */}
          <div
            {...attributes}
            {...listeners}
            style={{ 
              cursor: 'grab',
              padding: '4px',
              color: '#999',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <GripVertical size={20} />
          </div>
          
          {children}
          
          <DeleteOutlined 
            onClick={() => remove(name)} 
            style={{ color: 'red', cursor: 'pointer' }}
          />
        </Space>
      </Card>
    </div>
  );
};

export const ConfigNavbarEdit = () => {
  const [loading, setLoading] = useState(false);
  const [recordId, setRecordId] = useState<string | number | undefined>(undefined);
  const [menuItems, setMenuItems] = useState<any[]>([]);

  useEffect(() => {
      const fetchId = async () => {
          const { data } = await supabaseClient.from('config_navbar').select('id').maybeSingle();
          if (data) {
              setRecordId(data.id);
          }
      }
      fetchId();
  }, []);

  const { formProps, saveButtonProps, form } = useForm({
    action: "edit",
    id: recordId,
    queryOptions: {
      enabled: !!recordId,
      select: ({ data }) => {
        const responseData = data;
        const menuItems = responseData.menu_items || [];
        const mappedItems = menuItems.map((item: any, index: number) => ({
            ...item,
            name: item.name || item.label,
            path: item.path || item.link,
            order: item.order ?? index, // Preserve or assign order
            id: `item-${index}`, // Unique ID for DnD
        }));
        setMenuItems(mappedItems);
        return { data: { ...responseData, menu_items: mappedItems } };
      },
    },
  });

  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const oldIndex = menuItems.findIndex((item) => item.id === active.id);
      const newIndex = menuItems.findIndex((item) => item.id === over.id);

      const newItems = arrayMove(menuItems, oldIndex, newIndex);
      setMenuItems(newItems);
      
      // Update form field with reordered items
      form.setFieldValue('menu_items', newItems);
    }
  };

  // MANUAL SAVE HANDLER
  const onFinish = async (values: any) => {
    if (!recordId) {
        message.error("No record ID found to update.");
        return;
    }
    setLoading(true);
    try {
      // Add order field to each menu item before saving
      const orderedMenuItems = (values.menu_items || []).map((item: any, index: number) => ({
        ...item,
        order: index,
      }));

      const { error } = await supabaseClient
        .from('config_navbar')
        .update({
          logo_url: values.logo_url,
          cta_text: values.cta_text,
          cta_link: values.cta_link,
          menu_items: orderedMenuItems,
        })
        .eq('id', recordId);

      if (error) {
        throw error;
      }

      message.success("Navbar updated successfully!");
    } catch (err: any) {
      console.error("Supabase Error:", err);
      message.error("Failed to save: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const customRequest = async ({ file, onSuccess, onError }: any) => {
    try {
      const fileName = `logos/${Date.now()}-${file.name.replace(/[^a-zA-Z0-9.]/g, '_')}`;
      const { error } = await supabaseClient.storage
        .from("website-assets")
        .upload(fileName, file, { cacheControl: '3600', upsert: false });

      if (error) throw error;
      
      const { data } = supabaseClient.storage.from("website-assets").getPublicUrl(fileName);
      const url = data.publicUrl;
      
      form.setFieldValue("logo_url", url);
      onSuccess(url);
    } catch (error: any) {
      console.error("Upload Error", error);
      message.error("Upload failed");
      onError(error);
    }
  };

  if (!recordId) return <div>Loading configuration...</div>;

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
            label="CTA Link" 
            name="cta_link"
            rules={[{ required: true, message: 'Please enter a CTA link' }]}
        >
          <Input placeholder="/contact" />
        </Form.Item>

        <Form.Item 
            label="CTA Button Text" 
            name="cta_text"
            rules={[{ required: true, message: 'Please enter CTA button text' }]}
        >
          <Input placeholder="Book Strategy Call" />
        </Form.Item>

        <Form.Item label="Logo URL" name="logo_url">
             <Input placeholder="https://..." />
        </Form.Item>
        
        <Form.Item label="Upload Logo">
             <Upload.Dragger customRequest={customRequest} maxCount={1} listType="picture" showUploadList={false}>
                 <p className="ant-upload-drag-icon"><UploadOutlined /></p>
                 <p className="ant-upload-text">Click or drag file to upload</p>
             </Upload.Dragger>
        </Form.Item>

        <Divider orientation="left">Menu Items - Drag to Reorder</Divider>
        <Form.List name="menu_items">
            {(fields, { add, remove }) => (
                <>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={menuItems.map(item => item.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {fields.map(({ key, name, ...restField }, index) => (
                      <SortableMenuItem
                        key={menuItems[index]?.id || key}
                        id={menuItems[index]?.id || `item-${index}`}
                        index={index}
                        name={name}
                        remove={remove}
                      >
                        <Form.Item
                            {...restField}
                            name={[name, 'name']}
                            label="Label Name"
                            rules={[{ required: true, message: 'Missing name' }]}
                            style={{ marginBottom: 0, flex: 1 }}
                        >
                            <Input placeholder="About" />
                        </Form.Item>
                        <Form.Item
                            {...restField}
                            name={[name, 'path']}
                            label="Path / Link"
                            rules={[{ required: true, message: 'Missing path' }]}
                            style={{ marginBottom: 0, flex: 1 }}
                        >
                            <Input placeholder="/about" />
                        </Form.Item>
                      </SortableMenuItem>
                    ))}
                  </SortableContext>
                </DndContext>
                <Form.Item>
                    <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                    Add Menu Item
                    </Button>
                </Form.Item>
                </>
            )}
        </Form.List>
      </Form>
    </Edit>
  );
};
