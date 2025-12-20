import { useState, useEffect } from "react";
import { List, useTable, EditButton, DeleteButton, ShowButton } from "@refinedev/antd";
import { Table, Space, message } from "antd";
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

export const VideoList = () => {
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

  // Sync dataSource with table data when it changes
  useEffect(() => {
    if (tableQueryResult?.data?.data) {
      setDataSource(tableQueryResult.data.data);
    }
  }, [tableQueryResult?.data?.data]);


  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || active.id === over.id) return;

    // Use dataSource state instead of tableQueryResult
    const oldIndex = dataSource.findIndex((item: any) => item.id === active.id);
    const newIndex = dataSource.findIndex((item: any) => item.id === over.id);

    const reordered = arrayMove(dataSource, oldIndex, newIndex);
    
    // Update UI immediately (Optimistic update)
    setDataSource(reordered);

    try {
      // Prepare batch update with new display_order indices
      const updates = reordered.map((video: any, index: number) => ({
        id: video.id,
        display_order: index,
      }));

      // Batch upsert to Supabase
      const { error } = await supabaseClient
        .from('videos')
        .upsert(updates, { onConflict: 'id' });

      if (error) {
        throw error;
      }

      message.success('Video order updated successfully');
      console.log('✅ Video reorder saved to database');
      
      // Refetch to ensure sync
      tableQueryResult?.refetch();
    } catch (error: any) {
      console.error('❌ Reorder failed:', error);
      message.error('Failed to update order: ' + error.message);
      
      // Revert to original order on error
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
          items={dataSource.map((item: any) => item.id)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            {...tableProps}
            dataSource={dataSource}
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
              dataIndex="description" 
              title="Description" 
              ellipsis={true}
            />
            <Table.Column dataIndex="youtube_id" title="YouTube ID" />
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