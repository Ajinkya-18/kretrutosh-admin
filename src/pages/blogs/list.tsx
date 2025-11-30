import { List, useTable, EditButton, DeleteButton, DateField } from "@refinedev/antd";
import { Table, Space, Image } from "antd";

export const BlogList = () => {
  const { tableProps } = useTable({ syncWithLocation: true });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Title" />
        
        <Table.Column 
          dataIndex="image_url" 
          title="Cover Image"
          render={(value) => <Image width={50} src={value} />} 
        />
        
        <Table.Column 
          dataIndex="publish_date" 
          title="Published"
          render={(value) => <DateField value={value} />} 
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