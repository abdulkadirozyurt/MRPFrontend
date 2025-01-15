"use client";

import Message from "@/components/common/Message";
import { ISupplierOrder } from "@/models/order/ISupplierOrder";
import {
  deleteSupplierOrder,
  fetchSupplierOrders,
  updateSupplierOrder,
} from "@/utilities/redux/slices/supplierOrderSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SupplierOrderAddForm from "./supplierOrderAddForm";
import SupplierOrderUpdateForm from "./supplierOrderUpdateForm";

export default function SupplierOrderList() {
  const dispatch: AppDispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.supplierOrders.orders);
  const status = useSelector((state: RootState) => state.supplierOrders.status);
  const alertMessage = useSelector((state: RootState) => state.supplierOrders.alertMessage);
  const alertResult = useSelector((state: RootState) => state.supplierOrders.alertResult);

  const [searchText, setSearchText] = useState<string>("");
  const [mode, setMode] = useState<"add" | "update">("add");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingOrder, setEditingOrder] = useState<ISupplierOrder | null>(null);

  const filteredOrders = orders?.filter((order) =>
    order?.supplierId.companyName.toLowerCase().includes(searchText.toLowerCase())
  );

  const loading = status === "loading";

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleEdit = async (updatedOrder: ISupplierOrder) => {
    try {
      await dispatch(updateSupplierOrder({ id: updatedOrder._id, updatedOrder })).unwrap();
      handleModalClose();
    } catch (error) {
      console.log("aaa");
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteSupplierOrder(id)).unwrap();
      dispatch(fetchSupplierOrders());
    } catch (error: any) {
      console.error(error || "Sipariş silinirken hata oluştu.");
    }
  };

  const showModal = (mode: "add" | "update", supplierOrder?: ISupplierOrder) => {
    setMode(mode);
    setEditingOrder(supplierOrder || null);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingOrder(null);
    dispatch(fetchSupplierOrders());
  };

  const columns: TableColumnsType<ISupplierOrder> = [
    {
      title: "Tedarikçi",
      dataIndex: ["supplierId", "companyName"],
      key: "supplierId",
    },
    {
      title: "Depo",
      dataIndex: ["warehouseId", "name"],
      key: "warehouseId",
    },
    {
      title: "Malzeme",
      dataIndex: ["materialId", "name"],
      key: "materialId",
    },
    {
      title: "Miktar",
      dataIndex: "quantity",
      key: "quantity",
    },
    {
      title: "Sipariş Tarihi",
      dataIndex: "orderDate",
      key: "orderDate",
      render: (text: string) =>
        new Date(text).toLocaleString(undefined, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      title: "Teslim Tarihi",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
      render: (text: string) =>
        new Date(text).toLocaleString(undefined, {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
        }),
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
    },
    {
      title: "İşlemler",
      key: "actions",
      align: "center",

      render: (_: any, record: ISupplierOrder) => (
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

  useEffect(() => {
    dispatch(fetchSupplierOrders());
  }, [dispatch]);

  return (
    <>
      {alertMessage && alertResult && <Message result={alertResult} alertMessage={alertMessage} />}

      <h2>Tedarikçi Sipariş Listesi</h2>

      <div className="flex items-center justify-between h-14">
        <Input
          className="!w-72"
          value={searchText}
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          placeholder="Ara"
        />
        <Button type="primary" onClick={() => showModal("add")}>
          Yeni Sipariş Ekle
        </Button>

        <Modal
          open={isModalVisible}
          okType="primary"
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          className="!w-4/6"
        >
          {mode === "add" ? (
            <SupplierOrderAddForm onSuccess={handleModalClose} />
          ) : (
            <SupplierOrderUpdateForm
              onSuccess={handleModalClose}
              initialValues={editingOrder || null}
              onUpdate={handleEdit}
            />
          )}
        </Modal>
      </div>
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={filteredOrders}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}
