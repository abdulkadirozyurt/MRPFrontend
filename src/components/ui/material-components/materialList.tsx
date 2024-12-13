"use client";
import axios from "axios";
import { Input, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { SearchOutlined } from "@ant-design/icons";
import { IProduct } from "@/models/product/IProduct";
import { IBillOfMaterial } from "@/models/bom/IBillOfMaterial";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { fetchMaterials } from "@/utilities/redux/slices/materialSlice";
import { IMaterial } from "@/models/material/IMaterial";

export default function MaterialList() {
  const materials:IMaterial[] = useSelector((state: RootState) => state.material.materials);
  const dispatch: AppDispatch = useDispatch();


  //   const [products, setProducts] = useState<IProduct[]>([]);
    const [searhText, setSearchText] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false);

  const filteredMaterials = materials.filter((material) =>
    material.name.toLowerCase().includes(searhText.toLowerCase())
  );

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      sorter: function (a: IMaterial, b: IMaterial) {
        return a.name.localeCompare(b.name);
      },
    },
    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    // },
    // {
    //   title: "Materials",
    //   dataIndex: "billOfMaterials",
    //   key: "billOfMaterials",
    //   render: (billOfMaterials: IBillOfMaterial[]) => (
    //     <>
    //       {billOfMaterials &&
    //         billOfMaterials.map((bom) => <Tag key={bom.material.id}>{bom.material.name}</Tag>)}
    //     </>
    //   ),
    // },
  ];

//   const fetchProducts = async () => {
//     try {
//       setLoading(true);
//       const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/products`);
//       setProducts(data.products);
//     } catch (error: any) {
//       console.error(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };
  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  useEffect(() => {
    // fetchProducts();
    dispatch(fetchMaterials());

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
        dataSource={filteredMaterials}
        pagination={{ pageSize: 10 }}
      />
    </div>
  );
}
