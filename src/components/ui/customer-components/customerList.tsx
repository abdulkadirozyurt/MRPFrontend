// "use client";

// import Message from "@/components/common/Message";
// import ICustomer from "@/models/customer/ICustomer";
// import { deleteCustomer, fetchCustomers } from "@/utilities/redux/slices/customerSlice";
// import { AppDispatch, RootState } from "@/utilities/redux/store";
// import { SearchOutlined } from "@ant-design/icons";
// import { Button, Input, Modal, Space, Table, TableColumnsType } from "antd";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import AddCustomerForm from "./addCustomerForm";

// export default function CustomerList() {
//   const [searchText, setSearchText] = useState<string>("");
//   const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
//   const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<boolean>(false);
//   const [editingCustomer, setEditingCustomer] = useState(null);

//   const dispatch = useDispatch<AppDispatch>();
//   const customers = useSelector((state: RootState) => state.customer.customers);
//   const status = useSelector((state: RootState) => state.customer.status);
//   const alertResult = useSelector((state: RootState) => state.customer.alertResult);
//   const alertMessage = useSelector((state: RootState) => state.customer.alertMessage);

//   const handleSearch = (e: any) => {
//     setSearchText(e.target.value);
//   };

//   const handleEdit = (id: string) => {
//     // console.log("Düzenlenecek Malzeme:", record);
//   };

//   const handleDelete = (id: string) => {
//     dispatch(deleteCustomer(id));
//   };

//   const showAddModal = () => {
//     setIsAddModalVisible(true);
//   };

//   const showUpdateModal = (id: string) => {
//     setIsUpdateModalVisible(true);
//     setEditingCustomer(id);
//   };

//   const handleAddModalClose = () => {
//     setIsAddModalVisible(false);
//     dispatch(fetchCustomers());
//   };

//   const handleUpdateModalClose = () => {
//     setIsUpdateModalVisible(false);
//     dispatch(fetchCustomers());
//   };

//   useEffect(() => {
//     dispatch(fetchCustomers());
//   }, [dispatch]);

//   const columns: TableColumnsType<ICustomer> = [
//     { title: "Şirket Adı", dataIndex: "companyName", key: "companyName" },
//     { title: "Yetkili Adı", dataIndex: "contactName", key: "contactName" },
//     { title: "E-posta", dataIndex: "email", key: "email" },
//     { title: "Telefon", dataIndex: "phone", key: "phone" },
//     { title: "Şehir", dataIndex: "city", key: "city" },
//     {
//       title: "İşlemler",
//       key: "actions",
//       render: (_: any, record: ICustomer) => (
//         <Space>
//           <Button type="primary" onClick={() => {
//             setEditingCustomer(record);
//             showUpdateModal(record._id);
//           }}>
//             Güncelle
//           </Button>
//           <Button type="primary" danger onClick={() => handleDelete(record._id)}>
//             Sil
//           </Button>
//         </Space>
//       ),
//     },
//   ];

//   return (
//     <>
//       {alertMessage && alertResult && <Message result={alertResult} alertMessage={alertMessage} />}
//       <div className="flex items-center justify-between h-14">
//         <Input className=" !w-72" value={searchText} onChange={handleSearch} prefix={<SearchOutlined />} placeholder="Ara" />

//         <Button type="primary" onClick={showAddModal} className="!m-5">
//           Yeni Ürün Ekle
//         </Button>
//         <Modal open={isAddModalVisible} okType="primary" onCancel={() => setIsAddModalVisible(false)} footer={null} className="!w-4/6">

//           <AddCustomerForm onSuccess={handleAddModalClose} />
//         </Modal>
//       </div>
//       <Table dataSource={customers} columns={columns} loading={status === "loading"} rowKey="_id" pagination={{ pageSize: 10 }} />
//     </>
//   );
// }

"use client";

import Message from "@/components/common/Message";
import ICustomer from "@/models/customer/ICustomer";
import { deleteCustomer, fetchCustomers, updateCustomer } from "@/utilities/redux/slices/customerSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { SearchOutlined } from "@ant-design/icons";
import { Button, Form, Input, Modal, Space, Table, TableColumnsType } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import AddCustomerForm from "./addCustomerForm";
import UpdateCustomerForm from "./updateCustomerForm";

export default function CustomerList() {
  const [searchText, setSearchText] = useState<string>("");
  const [isAddModalVisible, setIsAddModalVisible] = useState<boolean>(false);
  const [isUpdateModalVisible, setIsUpdateModalVisible] = useState<boolean>(false);
  const [editingCustomer, setEditingCustomer] = useState<ICustomer | null>(null);
  const [mode, setMode] = useState<"add" | "update">("add");
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector((state: RootState) => state.customer.customers);
  const status = useSelector((state: RootState) => state.customer.status);
  const alertResult = useSelector((state: RootState) => state.customer.alertResult);
  const alertMessage = useSelector((state: RootState) => state.customer.alertMessage);

  useEffect(() => {
    dispatch(fetchCustomers());
  }, [dispatch]);

  const handleSearch = (e: any) => {
    setSearchText(e.target.value.toLowerCase());
  };

  const filteredCustomers = customers.filter((customer) => customer.companyName.toLowerCase().includes(searchText));

  const showModal = (mode: "add" | "update", customer?: ICustomer) => {
    setMode(mode);
    setEditingCustomer(customer || null);
    setIsUpdateModalVisible(true);
  };

  const handleModalClose = () => {
    setIsUpdateModalVisible(false);
    setEditingCustomer(null);
    console.log(editingCustomer);
    
    dispatch(fetchCustomers());
  };

  const handleEdit = async (updatedCustomer: ICustomer) => {
    try {
      await dispatch(updateCustomer({ id: updatedCustomer._id, updatedCustomer })).unwrap();
      handleModalClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteCustomer(id)).unwrap();
      dispatch(fetchCustomers());
    } catch (error) {
      console.log(error);
    }
  };

  const columns: TableColumnsType<ICustomer> = [
    { title: "Şirket Adı", dataIndex: "companyName", key: "companyName" },
    { title: "Yetkili Adı", dataIndex: "contactName", key: "contactName" },
    { title: "Yetkili Ünvanı", dataIndex: "contactTitle", key: "contactTitle" },
    { title: "E-posta", dataIndex: "email", key: "email" },
    { title: "Telefon", dataIndex: "phone", key: "phone" },
    { title: "Şehir", dataIndex: "city", key: "city" },
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

  return (
    <>
      {alertMessage && alertResult && <Message result={alertResult} alertMessage={alertMessage} />}
      <div className="flex items-center justify-between h-14 mb-4">
        <Input className="!w-72" value={searchText} onChange={handleSearch} prefix={<SearchOutlined />} placeholder="Müşteri Ara" />
        <Button type="primary" onClick={() => showModal("add")}>
          Yeni Müşteri Ekle
        </Button>
      </div>
      <Table dataSource={filteredCustomers} columns={columns} loading={status === "loading"} rowKey="_id" pagination={{ pageSize: 10 }} />

      <Modal open={isUpdateModalVisible} onCancel={handleModalClose} footer={null}>
        {mode === "add" ? (
          <AddCustomerForm onSuccess={handleModalClose} />
        ) : (
          <UpdateCustomerForm initialValues={editingCustomer || null} onSuccess={handleModalClose} onUpdate={handleEdit} />
        )}
      </Modal>
    </>
  );
}
