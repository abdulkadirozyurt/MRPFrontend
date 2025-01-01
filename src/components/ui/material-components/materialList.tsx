"use client";

import { useEffect, useState } from "react";
import Message from "@/components/common/Message";
import { SearchOutlined } from "@ant-design/icons";
import IMaterial from "@/models/material/IMaterial";
import ISupplier from "@/models/supplier/ISupplier";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { fetchMaterials } from "@/utilities/redux/slices/materialSlice";
import { Badge, Button, Input, Modal, Space, Table, TableColumnsType } from "antd";
import AddMaterialForm from "./addMaterialForm";

export default function MaterialList() {
  const dispatch: AppDispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const status = useSelector((state: RootState) => state.material.status);
  const alertResult = useSelector((state: RootState) => state.material.alertResult);
  const alertMessage = useSelector((state: RootState) => state.material.alertMessage);
  const materials: IMaterial[] = useSelector((state: RootState) => state.material.materials);

  const loading = status === "loading";

  const filteredMaterials = materials.filter(
    (material) => material && material.name && material.name.toLowerCase().includes(searchText.toLowerCase())
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
      title: "Tedarikçiler",
      dataIndex: "suppliers",
      key: "suppliers",
      align: "center",
      className: "",
      render: (suppliers: ISupplier[]) => (
        // <Space>
        //   <Select
        //     className="!text-red-500"
        //     mode="multiple"
        //     disabled
        //     // style={{ width: "100%" }}
        //     defaultValue={[...suppliers.map((supplier) => supplier.name)]}
        //   />
        // </Space>

        // <Badge
        // text={suppliers.map((supplier) => supplier.name)}
        // count={suppliers.length}
        // style={{ backgroundColor: '#52c41a' }}
        // >

        <Space>
          {...suppliers.map((supplier: ISupplier) => (
            <Badge
              key={supplier._id}
              count={supplier.companyName}
              style={{ backgroundColor: "grey", marginRight: "1px" }}
            />
          ))}
        </Space>
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
          Yeni Malzeme Ekle
        </Button>
        <Modal
          open={isModalVisible}
          okType="primary"
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          className="!w-4/6"
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
