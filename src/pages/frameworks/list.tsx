import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Image } from "antd";

export const FrameworkList = () => {
  const { tableProps } = useTable({ syncWithLocation: true });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
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
    </List>
  );
};