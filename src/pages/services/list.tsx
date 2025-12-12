import {
  List,
  useTable,
  EditButton,
  ShowButton,
  DeleteButton,
} from "@refinedev/antd";
import { Table, Space } from "antd";

export const ServiceList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="slug">
        <Table.Column dataIndex="slug" title="Slug (Url Key)" />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="subtitle" title="Subtitle" />
        
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: any) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.slug} />
              <ShowButton hideText size="small" recordItemId={record.slug} />
              <DeleteButton hideText size="small" recordItemId={record.slug} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
