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
           dataIndex="section_key" 
           title="Section" 
           render={(value) => <Tag color="blue">{value}</Tag>}
        />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column 
            dataIndex="grid_columns" 
            title="Grid"
            render={(val) => <Tag>{val} Cols</Tag>} 
        />
        <Table.Column 
            dataIndex="alignment" 
            title="Align" 
        />
        <Table.Column 
            dataIndex="is_visible" 
            title="Visible"
            render={(value) => (value ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>)}
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
