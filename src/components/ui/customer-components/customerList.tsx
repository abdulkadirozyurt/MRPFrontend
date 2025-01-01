"use client";

import { Table, Button, Space, message, TableColumnsType, Input, Modal } from "antd";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { fetchCustomers, deleteCustomer } from "@/utilities/redux/slices/customerSlice";
import ICustomer from "@/models/customer/ICustomer";
import Message from "@/components/common/Message";
import AddProductForm from "../product-components/addProductForm";
import { SearchOutlined } from "@ant-design/icons";
import AddCustomerForm from "./addCustomerForm";

export default function CustomerList() {
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector((state: RootState) => state.customer.customers);
  const status = useSelector((state: RootState) => state.customer.status);
  const alertResult = useSelector((state: RootState) => state.customer.alertResult);
  const alertMessage = useSelector((state: RootState) => state.customer.alertMessage);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleEdit = (id: string) => {
    // console.log("Düzenlenecek Malzeme:", record);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteCustomer(id));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    dispatch(fetchCustomers());
  };

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const columns: TableColumnsType<ICustomer> = [
    { title: "Şirket Adı", dataIndex: "companyName", key: "companyName" },
    { title: "Yetkili Adı", dataIndex: "contactName", key: "contactName" },
    { title: "E-posta", dataIndex: "email", key: "email" },
    { title: "Telefon", dataIndex: "phone", key: "phone" },
    { title: "Şehir", dataIndex: "city", key: "city" },
    {
      title: "İşlemler",
      key: "actions",
      render: (_: any, record: ICustomer) => (
        <Space>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Sil
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <>
      {alertMessage && alertResult && <Message result={alertResult} alertMessage={alertMessage} />}
      <div className="flex items-center justify-between h-14">
        <Input className=" !w-72" value={searchText} onChange={handleSearch} prefix={<SearchOutlined />} placeholder="Ara" />

        <Button type="primary" onClick={showModal} className="!m-5">
          Yeni Ürün Ekle
        </Button>
        <Modal open={isModalVisible} okType="primary" onCancel={() => setIsModalVisible(false)} footer={null} className="!w-4/6">
          <AddCustomerForm onSuccess={handleModalClose} />
        </Modal>
      </div>
      <Table dataSource={customers} columns={columns} loading={status === "loading"} rowKey="_id" pagination={{ pageSize: 10 }} />
    </>
  );
}
