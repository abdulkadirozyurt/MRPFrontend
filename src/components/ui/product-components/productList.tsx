"use client";

import axios from "axios";
import { Input, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { IProduct } from "@/models/product/IProduct";
import { IBillOfMaterial } from "@/models/bom/IBillOfMaterial";

export default function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [searhText, setSearchText] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searhText.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: function (a: IProduct, b: IProduct) {
        return a.name.localeCompare(b.name);
      },
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Materials",
      dataIndex: "billOfMaterials",
      key: "billOfMaterials",
      render: (billOfMaterials: IBillOfMaterial[]) => (
        <>
          {billOfMaterials &&
            billOfMaterials.map((bom) => (
              <Tag key={bom.material._id}>{bom.material.name}</Tag>
            ))}
        </>
      ),
    },
  ];

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`
      );
      setProducts(data.products);
    } catch (error: any) {
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <div>
      <Input
        className="!mb-5 !w-72"
        value={searhText}
        onChange={handleSearch}
        prefix={<SearchOutlined />}
        placeholder="Search product"
      />
      <Table
        rowKey="id"
        loading={loading}
        columns={columns}
        dataSource={filteredProducts}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
