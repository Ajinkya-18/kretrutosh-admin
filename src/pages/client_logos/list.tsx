import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Image } from "antd";

export const ClientLogoList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: {
      initial: [
        {
          field: "display_order",
          order: "asc",
        },
      ],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="client_name" title="Client Name" />
        <Table.Column 
          dataIndex="logo_url" 
          title="Logo"
          render={(value) => <Image height={40} src={value} />} 
        />
        <Table.Column dataIndex="display_order" title="Order" sorter />
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