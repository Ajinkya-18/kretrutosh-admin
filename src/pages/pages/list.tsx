import {
  List,
  useTable,
  DateField,
} from "@refinedev/antd";
import { Table, Space, Tag } from "antd";
import { EditButton } from "@refinedev/antd";

export const PagesList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List title="Page SEO & Hero Manager">
      <Table {...tableProps} rowKey="id">
        <Table.Column 
            dataIndex="slug" 
            title="Page" 
            render={(val) => <Tag color="blue">{val}</Tag>}
            sorter
        />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column 
            dataIndex="media_type" 
            title="Hero Type" 
            render={(val) => (
                <Tag color={val === 'video' ? 'purple' : 'green'}>
                    {val?.toUpperCase() || 'IMAGE'}
                </Tag>
            )}
        />
        <Table.Column
            title="Actions"
            dataIndex="actions"
            render={(_, record: any) => (
                <Space>
                    <EditButton hideText size="small" recordItemId={record.id} />
                </Space>
            )}
        />
      </Table>
    </List>
  );
};
