import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, Space } from 'antd';
import { GripVertical } from 'lucide-react';

interface SortableItemProps {
  id: string;
  children: React.ReactNode;
  disabled?: boolean;
  showHandle?: boolean;
}

export const SortableItem: React.FC<SortableItemProps> = ({ 
  id, 
  children, 
  disabled = false,
  showHandle = true,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ 
    id,
    disabled,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
    cursor: disabled ? 'default' : 'move',
  };

  return (
    <div ref={setNodeRef} style={style}>
      <Card 
        size="small"
        style={{ 
          marginBottom: 8,
          background: disabled ? '#f5f5f5' : '#ffffff',
          border: isDragging ? '2px dashed #FF9933' : undefined,
        }}
      >
        <Space style={{ width: '100%', justifyContent: 'space-between' }} align="center">
          {showHandle && !disabled && (
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
          )}
          {disabled && showHandle && (
            <div style={{ width: 28 }} /> 
          )}
          <div style={{ flex: 1 }}>
            {children}
          </div>
        </Space>
      </Card>
    </div>
  );
};
