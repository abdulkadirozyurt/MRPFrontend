"use client";

import Message from "@/components/common/Message";
import IMaterial from "@/models/material/IMaterial";
import { fetchMaterials } from "@/utilities/redux/slices/materialSlice";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, Table, TableColumnsType } from "antd";
import { useEffect } from "react";

interface TableProps {
  entityName: string;
  searchText?: string;
  handleSearch?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  showModal?: () => void;
  isModalVisible?: boolean;
  setIsModalVisible?: (visible: boolean) => void;
  loading?: boolean;
  filteredEntities?: IMaterial[];
  handleEdit?: (record: IMaterial) => void;
  handleDelete?: (id: string) => void;
  rowKey?: string;
  columns?: TableColumnsType<IMaterial>;
  dataSource?: IMaterial[];
  pagination?: { pageSize: number };
}

export default function CommonTable({
  entityName,
  searchText,
  handleSearch,
  showModal,
  isModalVisible,
  setIsModalVisible,
  loading,
  filteredEntities,
  handleEdit,
  handleDelete,
  rowKey,
  dataSource,
  pagination,
}: TableProps) {
  const columns: TableColumnsType<IMaterial> = [
    {
      title: "Malzeme Adı",
      dataIndex: "name",
      key: "name",
      align: "center",
      sorter: function (a: IMaterial, b: IMaterial) {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: "Stok Miktarı",
      dataIndex: "stockAmount",
      key: "stockAmount",
      align: "center",
    },
    {
      title: "Birim",
      dataIndex: "unitType",
      key: "unitType",
      align: "center",
    },
    {
      title: "Fiyat",
      dataIndex: "price",
      key: "price",
      align: "center",

      render: (price: number | undefined) =>
        typeof price === "number" ? `${price.toFixed(2)} ₺` : "Belirtilmedi",
    },
    {
      title: "Yeniden Sipariş Seviyesi",
      dataIndex: "reorderLevel",
      key: "reorderLevel",
      align: "center",
    },
    {
      title: "İşlemler",
      key: "actions",
      align: "center",

      render: (_: any, record: IMaterial) => (
        <Space size="middle">
          {/* <Button type="link" onClick={() => handleEdit(record)}>
            Düzenle
          </Button> */}
          {/* <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Sil
          </Button> */}
        </Space>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between h-14">
        <Input
          className=" !w-72"
          value={searchText}
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          placeholder="Ara"
        />

        <Button type="primary" onClick={showModal} className="!m-5">
          Yeni {entityName} Ekle
        </Button>
        <Modal
          open={isModalVisible}
          okType="primary"
          onCancel={() => setIsModalVisible && setIsModalVisible(false)}
          footer={null}
          className="!w-5/6"
        >
          {/* <AddMaterialForm onSuccess={handleModalClose} /> */}
        </Modal>
      </div>
      <Table
        rowKey={rowKey}
        loading={loading}
        columns={columns}
        dataSource={dataSource}
        pagination={pagination}
      />
    </>
  );
}
