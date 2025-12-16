import { useState } from "react";
import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
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

export const ServiceList = () => {
  const { tableProps, tableQueryResult } = useTable({
    syncWithLocation: true,
    pagination: {
      pageSize: 100, // Show all items for drag-and-drop
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

  // Update local state when data loads
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
    const oldIndex = data.findIndex((item: any) => item.slug === active.id);
    const newIndex = data.findIndex((item: any) => item.slug === over.id);

    const reordered = arrayMove(data, oldIndex, newIndex);

    // Optimistic update
    setDataSource(reordered);

    // Batch update display_order
    try {
      const updates = reordered.map((item: any, index: number) => ({
        slug: item.slug,
        display_order: index,
      }));

      // Use upsert to update all at once
      const { error } = await supabaseClient
        .from('services')
        .upsert(updates, { onConflict: 'slug' });

      if (error) throw error;

      message.success('Service order updated successfully');
      tableQueryResult?.refetch();
    } catch (error: any) {
      message.error('Failed to update order: ' + error.message);
      tableQueryResult?.refetch(); // Revert on error
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
          items={(tableQueryResult?.data?.data || []).map((item: any) => item.slug)}
          strategy={verticalListSortingStrategy}
        >
          <Table
            {...tableProps}
            dataSource={tableQueryResult?.data?.data}
            rowKey="slug"
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
            <Table.Column dataIndex="subtitle" title="Subtitle" />

            <Table.Column
              title="Actions"
              dataIndex="actions"
              render={(_, record: any) => (
                <Space>
                  <EditButton hideText size="small" recordItemId={record.slug} />
                  <ShowButton hideText size="small" recordItemId={record.slug} />
                  <DeleteButton hideText size="small" recordItemId={record.slug} />
                </Space>
              )}
            />
          </Table>
        </SortableContext>
      </DndContext>
    </List>
  );
};
