"use client";

import Message from "@/components/common/Message";
import IMaterial from "@/models/material/IMaterial";
import ISupplier from "@/models/supplier/ISupplier";
import { deleteMaterial, fetchMaterials, updateMaterial } from "@/utilities/redux/slices/materialSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, Table, TableColumnsType, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddMaterialForm from "./addMaterialForm";
import UpdateMaterialForm from "./updateMaterialForm";

export default function MaterialList() {
  const dispatch: AppDispatch = useDispatch();
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingMaterial, setEditingMaterial] = useState<IMaterial | null>(null);
  const status = useSelector((state: RootState) => state.material.status);
  const alertResult = useSelector((state: RootState) => state.material.alertResult);
  const alertMessage = useSelector((state: RootState) => state.material.alertMessage);
  const materials: IMaterial[] = useSelector((state: RootState) => state.material.materials);

  const loading = status === "loading";

  const filteredMaterials = materials.filter(
    (material) => material && material.name && material.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const showModal = (mode: "add" | "edit", material?: IMaterial) => {
    setMode(mode);
    setIsModalVisible(true);
    setEditingMaterial(material || null);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingMaterial(null);
    dispatch(fetchMaterials());
  };

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteMaterial(id)).unwrap();
      dispatch(fetchMaterials());
    } catch (error) {}
  };

  const handleEdit = async (updatedMaterial: IMaterial) => {
    try {
      
      await dispatch(updateMaterial({ id: updatedMaterial._id, updatedMaterial })).unwrap();
      handleModalClose();
    } catch (error) {
      
    }
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
      title: "Tedarikçiler",
      dataIndex: "suppliers",
      key: "suppliers",
      align: "center",
      className: "",
      render: (suppliers: ISupplier[]) => (
        <Space>{...suppliers.map((supplier: ISupplier) => <Tag key={supplier._id}>{supplier.companyName}</Tag>)}</Space>
      ),
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

      render: (price: number | undefined) => (typeof price === "number" ? `${price.toFixed(2)} ₺` : "Belirtilmedi"),
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
          <Button type="link" onClick={() => showModal("edit", record)}>
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
      {alertMessage && alertResult && <Message result={alertResult} alertMessage={alertMessage} />}

      <div className="flex items-center justify-between h-14">
        <Input className="!w-72" value={searchText} onChange={handleSearch} prefix={<SearchOutlined />} placeholder="Ara" />

        <Button type="primary" onClick={() => showModal("add")} className="!m-5">
          Yeni Malzeme Ekle
        </Button>
      </div>
      <Table rowKey="_id" loading={loading} columns={columns} dataSource={filteredMaterials} pagination={{ pageSize: 8 }} />

      <Modal open={isModalVisible} onCancel={handleModalClose} footer={null} className="!w-4/6">
        {mode === "add" ? (
          <AddMaterialForm onSuccess={handleModalClose} />
        ) : (
          <UpdateMaterialForm initialValues={editingMaterial || null} onSuccess={handleModalClose} onUpdate={handleEdit} />
        )}
      </Modal>
    </>
  );
}
