import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Tag } from "antd";

export const IndustryList = () => {
  const { tableProps } = useTable({ syncWithLocation: true });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="slug" title="Slug (URL)" />
        <Table.Column 
          dataIndex="subtitle" 
          title="Subtitle" 
        />
        
        {/* Display frameworks as tags */}
        <Table.Column 
          dataIndex="framework_slugs" 
          title="Frameworks"
          render={(tags: string[]) => (
            <>
              {tags?.slice(0, 2).map((tag) => (
                <Tag key={tag} color="blue">{tag}</Tag>
              ))}
              {tags?.length > 2 && <Tag>+{tags.length - 2} more</Tag>}
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