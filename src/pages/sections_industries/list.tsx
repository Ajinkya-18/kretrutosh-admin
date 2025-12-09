import { BaseRecord } from "@refinedev/core";
import {
  List,
  useTable,
  EditButton,
  FilterDropdown,
} from "@refinedev/antd";
import { Table, Space, Tag, Select } from "antd";

export const SectionsIndustriesList = () => {
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
            title="Industry"
            render={(value) => <Tag color="cyan">{value}</Tag>}
            filterDropdown={(props) => (
                <FilterDropdown {...props}>
                  <Select
                    mode="multiple"
                    placeholder="Search Industry"
                    style={{ minWidth: 200 }}
                    // We could fetch dynamic options here in a real app, hardcoding notable ones for now
                    options={[
                        { label: "SaaS", value: "saas" },
                        { label: "FinTech", value: "fintech" },
                        { label: "Manufacturing", value: "manufacturing" },
                        { label: "Healthcare", value: "healthcare" },
                        { label: "Retail", value: "retail" },
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
