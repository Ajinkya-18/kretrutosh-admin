import React from 'react';
import { Segmented } from 'antd';
import { AlignLeft, AlignCenter, AlignRight } from 'lucide-react';

type Alignment = 'left' | 'center' | 'right';

interface AlignmentToggleProps {
  value?: Alignment;
  onChange: (value: Alignment) => void;
}

export const AlignmentToggle: React.FC<AlignmentToggleProps> = ({ 
  value = 'left', 
  onChange 
}) => {
  return (
    <Segmented
      value={value}
      onChange={(val) => onChange(val as Alignment)}
      options={[
        {
          label: (
            <div style={{ padding: 4 }}>
              <AlignLeft size={16} />
            </div>
          ),
          value: 'left',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <AlignCenter size={16} />
            </div>
          ),
          value: 'center',
        },
        {
          label: (
            <div style={{ padding: 4 }}>
              <AlignRight size={16} />
            </div>
          ),
          value: 'right',
        },
      ]}
    />
  );
};
