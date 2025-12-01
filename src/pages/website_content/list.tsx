import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";

export const WebsiteContentList = () => {
  const { tableProps } = useTable({ syncWithLocation: true, sorters: { initial: [{ field: "page_name", order: "asc" }] } });

  return (
    <List title="Website Text Manager">
      <Table {...tableProps} rowKey="id">
        <Table.Column 
          dataIndex="page_name" 
          title="Page" 
          render={(val) => <Tag color="blue">{val.toUpperCase()}</Tag>}
          sorter
        />
        <Table.Column dataIndex="section_name" title="Section" />
        <Table.Column dataIndex="element_key" title="Element Key" />
        
        <Table.Column 
          dataIndex="content_text" 
          title="Current Text" 
          width="40%"
        />
        
        <Table.Column dataIndex="helper_note" title="Note" />

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