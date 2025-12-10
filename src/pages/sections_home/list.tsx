import { BaseRecord } from "@refinedev/core";
import {
  List,
  useTable,
  EditButton,
} from "@refinedev/antd";
import { Table, Space, Tag } from "antd";

export const SectionsHomeList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: {
      initial: [
        {
          field: "display_order",
          order: "asc",
        },
      ],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="display_order" title="Order" sorter />
        <Table.Column 
           dataIndex="title" 
           title="Section Title" 
           render={(val) => <span style={{ fontWeight: 500 }}>{val}</span>}
        />
        <Table.Column 
            dataIndex="grid_columns" 
            title="Layout"
            render={(val) => {
              if (val === 1) return <Tag>Full Width</Tag>;
              if (val === 2) return <Tag color="blue">Split (2 Col)</Tag>;
              if (val === 3) return <Tag color="green">Cards (3 Col)</Tag>;
              return <Tag>{val} Cols</Tag>;
            }} 
        />
        <Table.Column 
            dataIndex="is_visible" 
            title="Status"
            render={(value) => (value ? <Tag color="success">Live</Tag> : <Tag color="default">Hidden</Tag>)}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
