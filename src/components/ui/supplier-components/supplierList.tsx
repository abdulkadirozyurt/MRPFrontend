"use client";

import { useEffect, useState } from "react";
import AddSupplierForm from "./AddSupplierForm";
import { SearchOutlined } from "@ant-design/icons";
import ISupplier from "@/models/supplier/ISupplier";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { fetchMaterials } from "@/utilities/redux/slices/materialSlice";
import { fetchSuppliers } from "@/utilities/redux/slices/supplierSlice";
import { Button, Form, FormInstance, Input, Modal, Space, Table, TableColumnsType } from "antd";
import Message from "@/components/common/Message";

export default function SupplierList() {
  const [form] = Form.useForm<FormInstance>();

  const dispatch: AppDispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const status = useSelector((state: RootState) => state.supplier.status);
  const alertResult = useSelector((state: RootState) => state.supplier.alertResult);
  const alertMessage = useSelector((state: RootState) => state.supplier.alertMessage);
  const suppliers: ISupplier[] = useSelector((state: RootState) => state.supplier.suppliers);

  const loading = status === "loading";

  const filteredSuppliers = suppliers.filter(
    (supplier) =>
      supplier && supplier.name && supplier.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    dispatch(fetchSuppliers());
  };

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleEdit = (record: ISupplier) => {
    console.log("Düzenlenecek Malzeme:", record);
  };

  const handleDelete = (id: string) => {
    console.log("Silinecek Malzeme ID:", id);
  };

  const columns: TableColumnsType<ISupplier> = [
    {
      title: "Tedarikçi",
      dataIndex: "name",
      key: "name",
      align: "center",
      sorter: function (a: ISupplier, b: ISupplier) {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: "Yetkili",
      dataIndex: "contactName",
      key: "contactName",
      align: "center",
    },
    {
      title: "Yetkili Unvan",
      dataIndex: "contactTitle",
      key: "contactTitle",
      align: "center",
    },

    {
      title: "Adres",
      dataIndex: "address",
      key: "address",
      align: "center",
    },
    {
      title: "Şehir",
      dataIndex: "city",
      key: "city",
      align: "center",
    },
    {
      title: "Ülke",
      dataIndex: "country",
      key: "country",
      align: "center",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
      align: "center",
    },
    {
      title: "E-Posta",
      dataIndex: "email",
      key: "email",
      align: "center",
    },

    {
      title: "İşlemler",
      key: "actions",
      align: "center",

      render: (_: any, record: ISupplier) => (
        <Space size="middle">
          <Button type="primary" onClick={() => handleEdit(record)}>
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
        <Input
          className=" !w-72"
          value={searchText}
          onChange={handleSearch}
          prefix={<SearchOutlined />}
          placeholder="Ara"
        />

        <Button type="primary" onClick={showModal} className="!m-5">
          Yeni Tedarikçi Ekle
        </Button>
        <Modal
          open={isModalVisible}
          okType="primary"
          onCancel={() => handleModalClose()}
          footer={null}
          className="!w-4/6"
        >
          <AddSupplierForm onSuccess={handleModalClose} />
        </Modal>
      </div>
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={filteredSuppliers}
        pagination={{ pageSize: 8 }}
      />
    </>
  );
}
