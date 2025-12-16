import { useState } from "react";
import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag, message } from "antd";
import { GripVertical } from "lucide-react";
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { supabaseClient } from "../../utility";

// Sortable Row Component
const SortableRow = ({ children, ...props }: any) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: props['data-row-key'],
  });

  const style = {
    ...props.style,
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: 'move',
  };

  return (
    <tr
      {...props}
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
    >
      {children}
    </tr>
  );
};

export const IndustryList = () => {
  const { tableProps, tableQueryResult } = useTable({
    syncWithLocation: true,
    pagination: {
      pageSize: 100,
    },
    sorters: {
      initial: [
        {
          field: "display_order",
          order: "asc",
        },
      ],
    },
  });

  const [dataSource, setDataSource] = useState<any[]>([]);

  useState(() => {
    if (tableQueryResult?.data?.data) {
      setDataSource(tableQueryResult.data.data);
    }
  });

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    const data = tableQueryResult?.data?.data || [];
    const oldIndex = data.findIndex((item: any) => item.id === active.id);
    const newIndex = data.findIndex((item: any) => item.id === over.id);

    const reordered = arrayMove(data, oldIndex, newIndex);
    setDataSource(reordered);

    try {
      const updates = reordered.map((item: any, index: number) => ({
        id: item.id,
        display_order: index,
      }));

      const { error } = await supabaseClient
        .from('industries')
        .upsert(updates, { onConflict: 'id' });

      if (error) throw error;

      message.success('Industry order updated successfully');
      tableQueryResult?.refetch();
    } catch (error: any) {
      message.error('Failed to update order: ' + error.message);
      tableQueryResult?.refetch();
    }
  };

  return (
    <List>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext
          items={(tableQueryResult?.data?.data || []).map((item: any) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            {...tableProps}
            dataSource={tableQueryResult?.data?.data}
            rowKey="id"
            pagination={false}
            components={{
              body: {
                row: SortableRow,
              },
            }}
          >
            <Table.Column
              width={50}
              render={() => (
                <div style={{ cursor: 'grab', color: '#999', display: 'flex', alignItems: 'center' }}>
                  <GripVertical size={16} />
                </div>
              )}
            />
            <Table.Column dataIndex="display_order" title="#" width={60} />
            <Table.Column dataIndex="title" title="Title" />
            <Table.Column dataIndex="slug" title="Slug (URL)" />
            <Table.Column 
              dataIndex="subtitle" 
              title="Subtitle" 
            />
            
            {/* Display frameworks as tags */}
            <Table.Column 
              dataIndex="framework_slugs" 
              title="Frameworks"
              render={(tags: string[]) => (
                <>
                  {tags?.slice(0, 2).map((tag) => (
                    <Tag key={tag} color="blue">{tag}</Tag>
                  ))}
          {tags?.length > 2 && <Tag>+{tags.length - 2} more</Tag>}
                </>
              )}
            />

            <Table.Column
              title="Actions"
              dataIndex="actions"
              render={(_, record: any) => (
                <Space>
                  <EditButton hideText size="small" recordItemId={record.id} />
                  <DeleteButton hideText size="small" recordItemId={record.id} />
                </Space>
              )}
            />
          </Table>
        </SortableContext>
      </DndContext>
    </List>
  );
};