import { useState } from "react";
import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Image, message } from "antd";
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

export const FrameworkList = () => {
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
      // Update each item individually to avoid NOT NULL constraint issues
      const updatePromises = reordered.map((item: any, index: number) =>
        supabaseClient
          .from('frameworks')
          .update({ display_order: index })
          .eq('id', item.id)
      );

      const results = await Promise.all(updatePromises);
      
      // Check for errors
      const errors = results.filter(r => r.error);
      if (errors.length > 0) {
        throw errors[0].error;
      }

      message.success('Framework order updated successfully');
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
            <Table.Column 
              dataIndex="short_description" 
              title="Short Desc" 
              ellipsis={true} 
            />
            <Table.Column 
              dataIndex="image_url" 
              title="Image"
              render={(val) => <Image height={40} src={val} />} 
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