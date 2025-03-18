"use client";

import Message from "@/components/common/Message";
import { IProduct } from "@/models/product/IProduct";
import { deleteProduct, fetchProducts, updateProduct } from "@/utilities/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { SearchOutlined } from "@ant-design/icons";
import { Badge, Button, Input, Modal, Space, Table, TableColumnsType, Tag } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddProductForm from "./addProductForm";
import UpdateProductForm from "./productUpdateForm";

export default function ProductList() {
  const dispatch: AppDispatch = useDispatch();
  const status = useSelector((state: RootState) => state.product.status);
  const products = useSelector((state: RootState) => state.product.products);
  const alertResult = useSelector((state: RootState) => state.product.alertResult);
  const alertMessage = useSelector((state: RootState) => state.product.alertMessage);

  const [searchText, setSearchText] = useState<string>("");
  const [mode, setMode] = useState<"add" | "update">("add");
  const [editingProduct, setEditingProduct] = useState<IProduct | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const loading = status === "loading";

  const filteredProducts = products?.filter((product) => product?.name.toLowerCase().includes(searchText.toLowerCase()));

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleEdit = async (updatedProduct: IProduct) => {
    try {
      await dispatch(updateProduct({ id: updatedProduct._id, updatedProduct })).unwrap();
      handleModalClose();
    } catch (error) {}
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteProduct(id)).unwrap();
      dispatch(fetchProducts());
    } catch (error) {}
  };

  const showModal = (mode: "add" | "update", product?: IProduct) => {
    setMode(mode);
    setEditingProduct(product || null);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingProduct(null);
    dispatch(fetchProducts());
  };

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
      render: (billOfMaterials) => (
        <>
          {/* {billOfMaterials &&
            billOfMaterials.map((bom: any) => (
              <div>
                <Tag key={bom._id}>{bom.materialId.name} </Tag> <Tag key={bom._id}>{bom.quantity} </Tag>
              </div>
            ))} */}

          <Space>
            {...billOfMaterials.map((bom: any) => (
              <div className="flex flex-col items-center justify-center gap-1">
                <div key={bom.materialId._id}>
                  <Tag>{bom.materialId.name} </Tag>
                  <Badge count={bom.quantity} style={{ backgroundColor: "grey", marginRight: "1px" }} />
                </div>
              </div>
            ))}
          </Space>
        </>
      ),
    },
    {
      title: "İşlemler",
      key: "actions",
      align: "center",

      render: (_: any, record: IProduct) => (
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
    dispatch(fetchProducts());
  }, []);

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
            <AddProductForm onSuccess={handleModalClose} />
          ) : (
            <UpdateProductForm onSuccess={handleModalClose} onUpdate={handleEdit} initialValues={editingProduct || null} />
          )}
        </Modal>
      </div>
      <Table rowKey="_id" loading={loading} columns={columns} dataSource={filteredProducts} pagination={{ pageSize: 10 }} />
    </>
  );
}
