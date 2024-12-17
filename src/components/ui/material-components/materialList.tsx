"use client";
import { useEffect, useState } from "react";
import AddMaterialForm from "./AddMaterialForm";
import { SearchOutlined } from "@ant-design/icons";
import IMaterial from "@/models/material/IMaterial";
import { useDispatch, useSelector } from "react-redux";
import { Button, Input, Modal, Space, Table, TableColumnsType } from "antd";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { fetchMaterials } from "@/utilities/redux/slices/materialSlice";

export default function MaterialList() {
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: RootState) => state.material.status);
  const materials: IMaterial[] = useSelector((state: RootState) => state.material.materials);
  const loading = status === "loading";

  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const filteredMaterials = materials.filter(
    (material) =>
      material && material.name && material.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    dispatch(fetchMaterials());
  };

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleEdit = (record: IMaterial) => {
    console.log("Düzenlenecek Malzeme:", record);
  };

  const handleDelete = (id: string) => {
    console.log("Silinecek Malzeme ID:", id);
  };

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

      // render: (price:number) =>`${price.toFixed(2)} ₺`
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
          <Button type="link" onClick={() => handleEdit(record)}>
            Düzenle
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Sil
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchMaterials());
  }, [dispatch]);

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
          Yeni Malzeme Ekle
        </Button>
        <Modal
          open={isModalVisible}
          okType="primary"
          onCancel={() => setIsModalVisible(false)}
          footer={null}
        >
          <AddMaterialForm onSuccess={handleModalClose} />
        </Modal>
      </div>

      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={filteredMaterials}
        pagination={{ pageSize: 8 }}
      />
    </>
  );
}
