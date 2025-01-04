"use client";

import Message from "@/components/common/Message";
import ISupplier from "@/models/supplier/ISupplier";
import { deleteSupplier, fetchSuppliers, updateSupplier } from "@/utilities/redux/slices/supplierSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import SupplierUpdateForm from "./updateSupplierForm";
import SupplierAddForm from "./addSupplierForm";

export default function SupplierList() {
  const dispatch: AppDispatch = useDispatch();
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const status = useSelector((state: RootState) => state.supplier.status);
  const [editingSupplier, setEditingSupplier] = useState<ISupplier | null>(null);
  const alertResult = useSelector((state: RootState) => state.supplier.alertResult);
  const alertMessage = useSelector((state: RootState) => state.supplier.alertMessage);
  const suppliers: ISupplier[] = useSelector((state: RootState) => state.supplier.suppliers);

  const loading = status === "loading";

  const filteredSuppliers = suppliers.filter(
    (supplier) => supplier && supplier.companyName && supplier.companyName.toLowerCase().includes(searchText.toLowerCase())
  );

  const showModal = (mode: "add" | "edit", supplier?: ISupplier) => {
    setMode(mode);
    setIsModalVisible(true);
    setEditingSupplier(supplier || null);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingSupplier(null);
    dispatch(fetchSuppliers());
  };

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteSupplier(id)).unwrap();
      dispatch(fetchSuppliers());
    } catch (error) {}
  };

  const handleUpdate = async (updatedSupplier: ISupplier) => {
    try {
      await dispatch(updateSupplier({ id: updatedSupplier._id, updatedSupplier })).unwrap();
      handleModalClose();
    } catch (error: any) {
      console.log(error);
    }
  };

  // const columns: TableColumnsType<ISupplier> = [
  //   {
  //     title: "Tedarikçi",
  //     dataIndex: "companyName",
  //     key: "companyName",
  //     sorter: (a, b) => a.companyName.localeCompare(b.companyName),
  //   },
  //   {
  //     title: "Yetkili",
  //     dataIndex: "contactName",
  //     key: "contactName",
  //   },
  //   {
  //     title: "Telefon",
  //     dataIndex: "phone",
  //     key: "phone",
  //   },
  //   {
  //     title: "E-posta",
  //     dataIndex: "email",
  //     key: "email",
  //   },
  //   {
  //     title: "İşlemler",
  //     key: "actions",
  //     render: (_, record) => (
  //       <Space size="middle">
  //         <Button type="primary" onClick={() => showModal("edit", record)}>
  //           Düzenle
  //         </Button>
  //         <Button type="primary" danger onClick={() => handleDelete(record._id)}>
  //           Sil
  //         </Button>
  //       </Space>
  //     ),
  //   },
  // ];

  const columns: TableColumnsType<ISupplier> = [
    {
      title: "Şirket Adı",
      dataIndex: "companyName",
      key: "companyName",
    },
    {
      title: "İletişim Adı",
      dataIndex: "contactName",
      key: "contactName",
    },
    {
      title: "İletişim Ünvanı",
      dataIndex: "contactTitle",
      key: "contactTitle",
    },
    {
      title: "Adres",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Şehir",
      dataIndex: "city",
      key: "city",
    },
    {
      title: "Ülke",
      dataIndex: "country",
      key: "country",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_: any, record: ISupplier) => (
        <Space size="middle">
          <Button type="primary" onClick={() => showModal("edit", record)}>
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
    dispatch(fetchSuppliers());
  }, [dispatch]);

  return (
    <>
      {alertMessage && alertResult && <Message result={alertResult} alertMessage={alertMessage} />}

      <div className="flex items-center justify-between h-14">
        <Input className="!w-72" value={searchText} onChange={handleSearch} prefix={<SearchOutlined />} placeholder="Ara" />

        <Button type="primary" onClick={() => showModal("add")}>
          Yeni Tedarikçi Ekle
        </Button>
      </div>

      <Table rowKey="_id" loading={loading} columns={columns} dataSource={filteredSuppliers} pagination={{ pageSize: 10 }} />

      <Modal open={isModalVisible} onCancel={handleModalClose} footer={null} className="!w-4/6">
        {mode === "add" ? (
          <SupplierAddForm onSuccess={handleModalClose} />
        ) : (
          <SupplierUpdateForm initialValues={editingSupplier || null} onSuccess={handleModalClose} onUpdate={handleUpdate} />
        )}
      </Modal>
    </>
  );
}
