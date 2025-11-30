import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";

export const CaseStudyList = () => {
  const { tableProps } = useTable({ syncWithLocation: true });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="client" title="Client" />
        <Table.Column dataIndex="industry" title="Industry" />
        
        {/* Render Tags as visual badges */}
        <Table.Column 
          dataIndex="tags" 
          title="Tags"
          render={(tags: string[]) => (
            <>
              {tags?.slice(0, 3).map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
              {tags?.length > 3 && <Tag>+{tags.length - 3} more</Tag>}
            </>
          )}
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