"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { fetchUsers, deleteUser, updateUser } from "@/utilities/redux/slices/userSlice";
import { Button, Input, Modal, Space, Table, TableColumnsType, Tag } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import IUser from "@/models/user/IUser";
import AddUserForm from "./addUserForm";
import UpdateUserForm from "./updateUserForm";
import Message from "@/components/common/Message";
import { UserLabels, UserRoles } from "@/utilities/constants/UserRoles";

export default function UserList() {
  const [searchText, setSearchText] = useState<string>("");
  const [mode, setMode] = useState<"add" | "update">("add");
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const status = useSelector((state: RootState) => state.user.status);
  const alertMessage = useSelector((state: RootState) => state.user.alertMessage);
  const alertResult = useSelector((state: RootState) => state.user.alertResult);
  const loading = status === "loading";

  const filteredUsers = users?.filter((user: IUser) => user.firstname.toLowerCase().includes(searchText.toLowerCase()));

  const handleSearch = (e: any) => {
    setSearchText(e.target.value);
  };

  const handleEdit = async (updatedUser: IUser) => {
    try {
      await dispatch(updateUser({ id: updatedUser._id, updatedUser })).unwrap();
      handleModalClose();
    } catch (error) {
      
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await dispatch(deleteUser(id)).unwrap();
      dispatch(fetchUsers());
    } catch (error) {
      
    }
  };

  const showModal = (mode: "add" | "update", user?: IUser) => {
    setMode(mode);
    setEditingUser(user || null);
    setIsModalVisible(true);
  };

  const handleModalClose = () => {
    setIsModalVisible(false);
    setEditingUser(null);
    dispatch(fetchUsers());
  };

  const columns: TableColumnsType<IUser> = [
    {
      title: "Ad",
      dataIndex: "firstname",
      key: "firstname",
      sorter: (a: IUser, b: IUser) => a.firstname.localeCompare(b.firstname),
    },
    {
      title: "Soyad",
      dataIndex: "lastname",
      key: "lastname",
    },
    {
      title: "E-posta",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Rol",
      dataIndex: "role",
      key: "role",
      render: (role: string) => (
        <Tag color={
          role === UserRoles.Admin ? "red" :
          role === UserRoles.User ? "blue" :
          role === UserRoles.Manager ? "green" :
          role === UserRoles.Viewer ? "purple" :
          role === UserRoles.ProductionPlanner ? "orange" :
          role === UserRoles.SalesStaff ? "cyan" :
          role === UserRoles.ProcurementManager ? "magenta" : "default"
        }>
          {UserLabels.find((label) => label.key === role)?.label}
        </Tag>
      ),
    },
    {
      title: "İşlemler",
      key: "actions",
      align: "center",
      render: (_: any, record: IUser) => (
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
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      {alertMessage && alertResult && <Message result={alertResult} alertMessage={alertMessage} />}

      <div className="flex items-center justify-between h-14">
        <Input className="!w-72" value={searchText} onChange={handleSearch} prefix={<SearchOutlined />} placeholder="Ara" />
        <Button type="primary" onClick={() => showModal("add")} className="!m-5">
          Yeni Kullanıcı Ekle
        </Button>
        <Modal open={isModalVisible} onCancel={() => setIsModalVisible(false)} footer={null} className="!w-4/6">
          {mode === "add" ? (
            <AddUserForm onSuccess={handleModalClose} />
          ) : (
            <UpdateUserForm onSuccess={handleModalClose} onUpdate={handleEdit} initialValues={editingUser || null} />
          )}
        </Modal>
      </div>
      <Table rowKey="_id" loading={loading} columns={columns} dataSource={filteredUsers} pagination={{ pageSize: 10 }} />
    </>
  );
}
