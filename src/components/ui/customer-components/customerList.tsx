"use client";

import Message from "@/components/common/Message";
import ICustomer from "@/models/customer/ICustomer";
import { deleteCustomer, fetchCustomers, updateCustomer } from "@/utilities/redux/slices/customerSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCustomerForm from "./addCustomerForm";
import UpdateCustomerForm from "./updateCustomerForm";

export default function CustomerList() {
  const [searchText, setSearchText] = useState<string>("");
  const [mode, setMode] = useState<"add" | "update">("add");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingCustomer, setEditingCustomer] = useState<ICustomer | null>(null);

  const dispatch = useDispatch<AppDispatch>();
  const status = useSelector((state: RootState) => state.customer.status);
  const customers = useSelector((state: RootState) => state.customer.customers);
  const alertResult = useSelector((state: RootState) => state.customer.alertResult);
  const alertMessage = useSelector((state: RootState) => state.customer.alertMessage);
  const loading = status === "loading";

  const handleSearch = (e: any) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredCustomers = customers.filter((customer) => customer.companyName.toLowerCase().includes(searchText));

  const showModal = (mode: "add" | "update", customer?: ICustomer) => {
    setMode(mode);
    setEditingCustomer(customer || null);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingCustomer(null);
    dispatch(fetchCustomers());
  };

  const handleEdit = async (updatedCustomer: ICustomer) => {
    try {
      await dispatch(updateCustomer({ id: updatedCustomer._id, updatedCustomer })).unwrap();
      handleModalClose();
    } catch (error) {
      
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCustomer(id)).unwrap();
      dispatch(fetchCustomers());
    } catch (error) {
      
    }
  };

  const columns: TableColumnsType<ICustomer> = [
    { title: "Şirket Adı", dataIndex: "companyName", key: "companyName" },
    { title: "Yetkili Adı", dataIndex: "contactName", key: "contactName" },
    { title: "Yetkili Ünvanı", dataIndex: "contactTitle", key: "contactTitle" },
    { title: "E-posta", dataIndex: "email", key: "email" },
    { title: "Telefon", dataIndex: "phone", key: "phone" },
    { title: "Şehir", dataIndex: "city", key: "city" },
    { title: "Ülke", dataIndex: "country", key: "country" },
    { title: "Posta Kodu", dataIndex: "postalCode", key: "postalCode" },
    { title: "Vergi Numarası", dataIndex: "taxNumber", key: "taxNumber" },
    { title: "Adres", dataIndex: "address", key: "address" },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record: ICustomer) => (
        <Space>
          <Button type="primary" onClick={() => showModal("update", record)}>
            Güncelle
          </Button>
          <Button type="primary" danger onClick={() => handleDelete(record._id)}>
            Sil
          </Button>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <>
      {alertMessage && alertResult && <Message result={alertResult} alertMessage={alertMessage} />}
      <div className="flex items-center justify-between h-14 mb-4">
        <Input className="!w-72" value={searchText} onChange={handleSearch} prefix={<SearchOutlined />} placeholder="Müşteri Ara" />
        <Button type="primary" onClick={() => showModal("add")}>
          Yeni Müşteri Ekle
        </Button>
      </div>
      <Table dataSource={filteredCustomers} columns={columns} loading={loading} rowKey="_id" pagination={{ pageSize: 10 }} />

      <Modal className="!w-4/6" open={isModalVisible} onCancel={handleModalClose} footer={null}>
        {mode === "add" ? (
          <AddCustomerForm onSuccess={handleModalClose} />
        ) : (
          <UpdateCustomerForm initialValues={editingCustomer || null} onSuccess={handleModalClose} onUpdate={handleEdit} />
        )}
      </Modal>
    </>
  );
}
