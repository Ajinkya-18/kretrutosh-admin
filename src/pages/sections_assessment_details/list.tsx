import { BaseRecord } from "@refinedev/core";
import {
  List,
  useTable,
  EditButton,
  FilterDropdown,
} from "@refinedev/antd";
import { Table, Space, Tag, Select } from "antd";

export const SectionsAssessmentDetailsList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: {
      initial: [
        { field: "parent_slug", order: "asc" },
        { field: "display_order", order: "asc" },
      ],
    },
  });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column 
            dataIndex="parent_slug" 
            title="Assessment Slug"
            render={(value) => <Tag color="orange">{value}</Tag>}
            filterDropdown={(props) => (
                <FilterDropdown {...props}>
                  <Select
                    mode="multiple"
                    placeholder="Search Assessment"
                    style={{ minWidth: 200 }}
                  />
                </FilterDropdown>
              )}
        />
        <Table.Column dataIndex="display_order" title="Order" sorter />
        <Table.Column 
           dataIndex="section_key" 
           title="Section Key" 
           render={(value) => <Tag color="blue">{value}</Tag>}
        />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column dataIndex="grid_columns" title="Grid" />
        <Table.Column 
            dataIndex="is_visible" 
            title="Visible"
            render={(value) => (value ? <Tag color="green">Yes</Tag> : <Tag color="red">No</Tag>)}
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
