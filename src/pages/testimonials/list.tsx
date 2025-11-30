import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Avatar, Rate } from "antd";

export const TestimonialList = () => {
  const { tableProps } = useTable({ syncWithLocation: true });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column 
          dataIndex="avatar_url" 
          title="Avatar"
          render={(val) => <Avatar src={val} />} 
        />
        <Table.Column dataIndex="client_name" title="Name" />
        <Table.Column dataIndex="company" title="Company" />
        <Table.Column 
          dataIndex="rating" 
          title="Rating" 
          render={(val) => <Rate disabled defaultValue={val} style={{ fontSize: 12 }} />} 
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
    </List>
  );
};