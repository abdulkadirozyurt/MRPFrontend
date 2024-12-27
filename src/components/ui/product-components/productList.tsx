"use client";

import axios from "axios";
import { Badge, Button, Input, Modal, Space, Table, TableColumnsType, Tag } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { IProduct } from "@/models/product/IProduct";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { IBillOfMaterial } from "@/models/bom/IBillOfMaterial";
import { deleteProduct, fetchProducts } from "@/utilities/redux/slices/productSlice";
import Message from "@/components/common/Message";
import AddProductForm from "./addProductForm";

export default function ProductList() {
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  const status = useSelector((state: RootState) => state.product.status);
  const alertResult = useSelector((state: RootState) => state.product.alertResult);
  const alertMessage = useSelector((state: RootState) => state.product.alertMessage);
  const loading = status === "loading";

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const columns: TableColumnsType<IProduct> = [
    {
      title: "Ürün",
      dataIndex: "name",
      key: "name",
      sorter: function (a: IProduct, b: IProduct) {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: "Açıklama",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Birim",
      dataIndex: "unitType",
      key: "unitType",
    },
    {
      title: "Ürün Ağacı",
      dataIndex: "billOfMaterials",
      key: "billOfMaterials",
      render: (billOfMaterials: IBillOfMaterial[]) => (
        <>
          {billOfMaterials &&
            billOfMaterials.map((bom) => (
              <div>
                <Tag key={bom.materialId}>
                  {typeof bom.materialId === "object" && "name" in bom.materialId ? bom.materialId.name : bom.materialId}
                </Tag>{" "}
                <Tag key={bom.materialId}>{bom.quantity} </Tag>
              </div>
            ))}

          {/* <Space>
            {...billOfMaterials.map((bom) => (
              <Badge
                key={bom._id}
                count={bom.quantity}
                style={{ backgroundColor: "grey", marginRight: "1px" }}
              />
            ))}
          </Space> */}
        </>
      ),
    },
    {
      title: "İşlemler",
      key: "actions",
      align: "center",

      render: (_: any, record: IProduct) => (
        <Space size="middle">
          <Button type="link" onClick={() => handleEdit(record._id)}>
            Düzenle
          </Button>
          <Button type="link" danger onClick={() => handleDelete(record._id)}>
            Sil
          </Button>
        </Space>
      ),
    },
  ];

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleEdit = (id: string) => {
    // console.log("Düzenlenecek Malzeme:", record);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteProduct(id));
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    dispatch(fetchProducts());
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

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
          Yeni Ürün Ekle
        </Button>
        <Modal
          open={isModalVisible}
          okType="primary"
          onCancel={() => setIsModalVisible(false)}
          footer={null}
          className="!w-4/6"
        >
          <AddProductForm onSuccess={handleModalClose} />
        </Modal>
      </div>
      <Table
        rowKey="_id"
        loading={loading}
        columns={columns}
        dataSource={filteredProducts}
        pagination={{ pageSize: 10 }}
      />
    </>
  );
}
