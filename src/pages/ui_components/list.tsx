import { BaseRecord } from "@refinedev/core";
import {
  List,
  useTable,
  EditButton,
} from "@refinedev/antd";
import { Table, Space, Tag, Switch } from "antd";

export const UIComponentsList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column 
           dataIndex="name" 
           title="Component Name" 
        />
        <Table.Column 
           dataIndex="component_key" 
           title="Key" 
           render={(value) => <Tag color="blue">{value}</Tag>}
        />
        <Table.Column 
            dataIndex="is_active" 
            title="Active"
            render={(value) => (value ? <Tag color="green">Active</Tag> : <Tag color="red">Inactive</Tag>)}
        />
        <Table.Column
          title="Actions"
          dataIndex="actions"
          render={(_, record: BaseRecord) => (
            <Space>
              <EditButton hideText size="small" recordItemId={record.id} />
            </Space>
          )}
        />
      </Table>
    </List>
  );
};
