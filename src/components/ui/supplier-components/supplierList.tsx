// "use client";

// import Message from "@/components/common/Message";
// import ISupplier from "@/models/supplier/ISupplier";
// import { addSupplier, deleteSupplier, fetchSuppliers, updateSupplier } from "@/utilities/redux/slices/supplierSlice";
// import { AppDispatch, RootState } from "@/utilities/redux/store";
// import { SearchOutlined } from "@ant-design/icons";
// import { Button, Form, FormInstance, Input, Modal, Space, Table, TableColumnsType, Tag } from "antd";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import AddSupplierForm from "./addSupplierForm";
// import IMaterial from "@/models/material/IMaterial";

// // Define the form values type
// interface SupplierFormValues {
//   companyName: string;
//   contactName: string;
//   contactTitle: string;
//   address?: string; // Add other fields as necessary
//   city?: string;
//   country?: string;
//   phone?: string;
//   email?: string;
//   materialsOfSupplied?: IMaterial[];
// }

// export default function SupplierList() {
//   const [form] = Form.useForm<SupplierFormValues>();

//   const dispatch: AppDispatch = useDispatch();
//   const [searchText, setSearchText] = useState<string>("");
//   const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
//   const [mode, setMode] = useState<"add" | "edit">("add");
//   const [editingSupplier, setEditingSupplier] = useState<ISupplier | null>(null);

//   const status = useSelector((state: RootState) => state.supplier.status);
//   const alertResult = useSelector((state: RootState) => state.supplier.alertResult);
//   const alertMessage = useSelector((state: RootState) => state.supplier.alertMessage);
//   const suppliers: ISupplier[] = useSelector((state: RootState) => state.supplier.suppliers);

//   const loading = status === "loading";

//   const filteredSuppliers = suppliers.filter(
//     (supplier) => supplier && supplier.companyName && supplier.companyName.toLowerCase().includes(searchText.toLowerCase())
//   );

//   const showModal = (mode: "add" | "edit", supplier?: ISupplier) => {
//     setMode(mode);
//     setIsModalVisible(true);
//     if (mode === "edit" && supplier) {
//       setEditingSupplier(supplier);
//       form.setFieldsValue({
//         companyName: supplier.companyName,
//         contactName: supplier.contactName,
//         contactTitle: supplier.contactTitle,
//         address: supplier.address,
//         city: supplier.city,
//         country: supplier.country,
//         phone: supplier.phone,
//         email: supplier.email,
//         materialsOfSupplied: supplier.materialsOfSupplied,
//       });
//     } else {
//       form.resetFields();
//     }
//   };

//   const handleModalClose = () => {
//     setIsModalVisible(false);
//     setEditingSupplier(null);
//     dispatch(fetchSuppliers());
//   };

//   const handleSearch = (e: any) => {
//     setSearchText(e.target.value);
//   };

//   const handleDelete = (id: string) => {
//     dispatch(deleteSupplier(id));
//     dispatch(fetchSuppliers());
//   };

//   const handleSave = async (values: any) => {
//     try {
//       if (mode === "add") {
//         await dispatch(addSupplier(values)).unwrap();
//       } else if (mode === "edit" && editingSupplier) {
//         await dispatch(updateSupplier({ id: editingSupplier._id, updatedSupplier: values })).unwrap();
//       }
//       handleModalClose();
//     } catch (error: any) {
//       console.error("Error saving supplier:", error);
//     }
//   };

//   const columns: TableColumnsType<ISupplier> = [
//     {
//       title: "Tedarikçi",
//       dataIndex: "companyName",
//       key: "companyName",
//       align: "center",
//       sorter: function (a: ISupplier, b: ISupplier) {
//         return a.companyName.localeCompare(b.companyName);
//       },
//     },
//     {
//       title: "Yetkili",
//       dataIndex: "contactName",
//       key: "contactName",
//       align: "center",
//     },
//     {
//       title: "Yetkili Unvan",
//       dataIndex: "contactTitle",
//       key: "contactTitle",
//       align: "center",
//     },
//     {
//       title: "Adres",
//       dataIndex: "address",
//       key: "address",
//       align: "center",
//     },
//     {
//       title: "Şehir",
//       dataIndex: "city",
//       key: "city",
//       align: "center",
//     },
//     {
//       title: "Ülke",
//       dataIndex: "country",
//       key: "country",
//       align: "center",
//     },
//     {
//       title: "Telefon",
//       dataIndex: "phone",
//       key: "phone",
//       align: "center",
//     },
//     {
//       title: "E-Posta",
//       dataIndex: "email",
//       key: "email",
//       align: "center",
//     },
//     {
//       title: "Tedarik Edilen Malzemeler",
//       dataIndex: "materialsOfSupplied",
//       key: "materialsOfSupplied",
//       render: (materials: string[]) => materials.map((material) => <Tag key={material}>{material}</Tag>),
//     },

//     {
//       title: "İşlemler",
//       key: "actions",
//       align: "center",
//       render: (_: any, record: ISupplier) => (
//         <Space size="middle">
//           <Button type="primary" onClick={() => showModal("edit", record)}>
//             Düzenle
//           </Button>
//           <Button type="primary" danger onClick={() => handleDelete(record._id)}>
//             Sil
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   useEffect(() => {
//     dispatch(fetchSuppliers());
//   }, [dispatch]);

//   return (
//     <>
//       {alertMessage && alertResult && <Message result={alertResult} alertMessage={alertMessage} />}

//       <div className="flex items-center justify-between h-14">
//         <Input className=" !w-72" value={searchText} onChange={handleSearch} prefix={<SearchOutlined />} placeholder="Ara" />

//         <Button type="primary" onClick={() => showModal("add")} className="!m-5">
//           Yeni Tedarikçi Ekle
//         </Button>
//         <Modal open={isModalVisible} onCancel={() => handleModalClose()} footer={null} className="!w-4/6">
//           <AddSupplierForm initialValues={editingSupplier || {}} onSuccess={handleModalClose} onSave={handleSave} mode={mode} />
//         </Modal>
//       </div>
//       <Table rowKey="_id" loading={loading} columns={columns} dataSource={filteredSuppliers} pagination={{ pageSize: 8 }} />
//     </>
//   );
// }

"use client";

import Message from "@/components/common/Message";
import ISupplier from "@/models/supplier/ISupplier";
import { deleteSupplier, fetchSuppliers } from "@/utilities/redux/slices/supplierSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Input, Modal, Space, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddSupplierForm from "./AddSupplierForm";
import UpdateSupplierForm from "./updateSupplierForm";

export default function SupplierList() {
  const dispatch: AppDispatch = useDispatch();
  const [searchText, setSearchText] = useState<string>("");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [mode, setMode] = useState<"add" | "edit">("add");
  const [editingSupplier, setEditingSupplier] = useState<ISupplier | null>(null);

  const status = useSelector((state: RootState) => state.supplier.status);
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
    if (mode === "edit" && supplier) {
      setEditingSupplier(supplier);
    }
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingSupplier(null);
    dispatch(fetchSuppliers());
  };

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleDelete = (id: string) => {
    dispatch(deleteSupplier(id));
    dispatch(fetchSuppliers());
  };

  const columns: TableColumnsType<ISupplier> = [
    {
      title: "Tedarikçi",
      dataIndex: "companyName",
      key: "companyName",
      sorter: (a, b) => a.companyName.localeCompare(b.companyName),
    },
    {
      title: "Yetkili",
      dataIndex: "contactName",
      key: "contactName",
    },
    {
      title: "Telefon",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "E-posta",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "İşlemler",
      key: "actions",
      render: (_, record) => (
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
          <AddSupplierForm onSuccess={handleModalClose} />
        ) : (
          <UpdateSupplierForm initialValues={editingSupplier || {}} onSuccess={handleModalClose} />
        )}
      </Modal>
    </>
  );
}
