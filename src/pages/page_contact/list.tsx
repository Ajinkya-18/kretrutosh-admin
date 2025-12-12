import { List, useTable, EditButton } from "@refinedev/antd";
import { Table, Space } from "antd";
export const PageContactList = () => {
  const { tableProps } = useTable({ syncWithLocation: true });
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="hero_title" title="Hero Title" />
        <Table.Column title="Actions" dataIndex="actions" render={(_, record: any) => (
            <Space><EditButton hideText size="small" recordItemId={record.id} /></Space>
        )}/>
      </Table>
    </List>
  );
};
