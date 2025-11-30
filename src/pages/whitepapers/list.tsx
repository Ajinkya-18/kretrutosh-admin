import { List, useTable, EditButton, DeleteButton } from "@refinedev/antd";
import { Table, Space, Image, Button } from "antd";
import { DownloadOutlined } from "@ant-design/icons";

export const WhitepaperList = () => {
  const { tableProps } = useTable({ syncWithLocation: true });

  return (
    <List>
      <Table {...tableProps} rowKey="id">
        <Table.Column dataIndex="title" title="Title" />
        <Table.Column 
          dataIndex="cover_image_url" 
          title="Cover"
          render={(val) => <Image height={50} src={val} />} 
        />
        <Table.Column 
          dataIndex="download_url" 
          title="PDF"
          render={(val) => val ? (
            <Button type="link" href={val} target="_blank" icon={<DownloadOutlined />}>
              Download
            </Button>
          ) : "No File"} 
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