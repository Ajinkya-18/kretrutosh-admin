import { List, useTable, EditButton } from "@refinedev/antd";
import { Table, Space } from "antd";
export const ConfigFooterList = () => {
  const { tableProps } = useTable({ syncWithLocation: true });
  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="copyright_text" title="Copyright Text" />
        <Table.Column title="Actions" dataIndex="actions" render={(_, record: any) => (
            <Space><EditButton hideText size="small" recordItemId={record.id} /></Space>
        )}/>
      </Table>
    </List>
  );
};
