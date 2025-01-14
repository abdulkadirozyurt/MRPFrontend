"use client";

import Message from "@/components/common/Message";
import IWarehouse from "@/models/warehouse/IWarehouse";
import { deleteWarehouse, fetchWarehouses, updateWarehouse } from "@/utilities/redux/slices/warehouseSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddWarehouseForm from "./add-warehouse-form";
import UpdateWarehouseForm from "./update-warehouse-form";
import IUser from "@/models/user/IUser";

export default function WarehouseList() {
  const [searchText, setSearchText] = useState<string>("");
  const [mode, setMode] = useState<"add" | "update">("add");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingProduct, setEditingProduct] = useState<IWarehouse | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const warehouses = useSelector((state: RootState) => state.warehouse.warehouses);
  const status = useSelector((state: RootState) => state.warehouse.status);
  const alertResult = useSelector((state: RootState) => state.product.alertResult);
  const alertMessage = useSelector((state: RootState) => state.product.alertMessage);
  const loading = status === "loading";

  const filteredWarehouses = warehouses?.filter((warehouse) => warehouse?.name.toLowerCase().includes(searchText.toLowerCase()));

  const columns: TableColumnsType<IWarehouse> = [
    {
      title: "Depo Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Konum",
      dataIndex: "location",
      key: "location",
    },
    {
      title: "Kapasite",
      dataIndex: "capacity",
      key: "capacity",
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Yönetici",
      dataIndex: ["managerId", "firstname", "lastname"],
      key: "managerName",
      render: (text: string, record: any) => `${record.managerId?.firstname} ${record.managerId?.lastname}`,
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_: any, record: any) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal("update", record)}>
            Düzenle
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record._id)}>
            Sil
          </Button>
        </Space>
      ),
    },
  ];

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleEdit = async (updatedWarehouse: IWarehouse) => {
    try {
      await dispatch(updateWarehouse({ id: updatedWarehouse._id, updatedWarehouse })).unwrap();
      handleModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteWarehouse(id)).unwrap();
      dispatch(fetchWarehouses());
    } catch (error) {
      console.log(error);
    }
  };

  const showModal = (mode: "add" | "update", product?: IWarehouse) => {
    setMode(mode);
    setEditingProduct(product || null);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
    dispatch(fetchWarehouses());
  };

  useEffect(() => {
    dispatch(fetchWarehouses());
  }, [dispatch]);

  return (
    <>
      {alertMessage && alertResult && <Message result={alertResult} alertMessage={alertMessage} />}

      <div className="flex items-center justify-between h-14">
        <Input className=" !w-72" value={searchText} onChange={handleSearch} prefix={<SearchOutlined />} placeholder="Ara" />

        <Button type="primary" onClick={() => showModal("add")} className="!m-5">
          Yeni Ürün Ekle
        </Button>
        <Modal open={isModalVisible} okType="primary" onCancel={() => setIsModalVisible(false)} footer={null} className="!w-4/6">
          {mode === "add" ? (
            <AddWarehouseForm onSuccess={handleModalClose} />
          ) : (
            <UpdateWarehouseForm onSuccess={handleModalClose} onUpdate={handleEdit} initialValues={editingProduct || null} />
          )}
        </Modal>
      </div>
      <Table rowKey="_id" loading={loading} columns={columns} dataSource={filteredWarehouses} pagination={{ pageSize: 10 }} />
    </>
  );
}
