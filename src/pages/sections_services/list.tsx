import { BaseRecord, HttpError } from "@refinedev/core";
import {
  List,
  useTable,
  EditButton,
  FilterDropdown,
  useSelect,
} from "@refinedev/antd";
import { Table, Space, Tag, Select } from "antd";

export const SectionsServicesList = () => {
  const { tableProps } = useTable({
    syncWithLocation: true,
    sorters: {
      initial: [
        {
          field: "page_slug",
          order: "asc",
        },
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
        <Table.Column 
            dataIndex="page_slug" 
            title="Service Page"
            render={(value) => <Tag color="purple">{value}</Tag>}
            filterDropdown={(props) => (
                <FilterDropdown {...props}>
                  <Select
                    mode="multiple"
                    placeholder="Search Service"
                    style={{ minWidth: 200 }}
                    options={[
                        { label: "Pre-Sales", value: "pre-sales" },
                        { label: "Sales Velocity", value: "sales-velocity" },
                        { label: "Digital & AI", value: "digital-ai" },
                        { label: "Customer Success", value: "customer-success" },
                        { label: "Culture & Leadership", value: "culture-transformation" },
                    ]}
                  />
                </FilterDropdown>
              )}
        />
        <Table.Column dataIndex="display_order" title="Order" sorter />
        <Table.Column 
           dataIndex="section_key" 
           title="Section" 
           render={(value) => <Tag color="blue">{value}</Tag>}
        />
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column 
            dataIndex="grid_columns" 
            title="Grid"
            render={(val) => <Tag>{val}</Tag>} 
        />
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
