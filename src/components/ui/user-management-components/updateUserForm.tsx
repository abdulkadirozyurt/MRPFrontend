"use client";

import { Button, Form, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utilities/redux/store";
import { updateUser } from "@/utilities/redux/slices/userSlice";
import { useEffect, useState } from "react";
import { UserRoles } from "@/utilities/constants/UserRoles";
import IUser from "@/models/user/IUser";
import { io } from "socket.io-client";

const { Option } = Select;

const socket = io(`${process.env.NEXT_PUBLIC_API_URL}`, {
  transports: ["websocket", "polling"],
});

export default function UpdateUserForm({
  initialValues,
  onSuccess,
  onUpdate,
}: {
  initialValues: IUser | null;
  onSuccess: () => void;
  onUpdate: (values: IUser) => void;
}) {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    form.setFieldsValue(initialValues);
  }, [initialValues, form]);

  const onFinish = async (values: any) => {
    const updatedUser = { ...initialValues, ...values };
    await onUpdate(updatedUser);

    if (initialValues?.role !== values.role) {
      socket.emit("updateRole", { userId: updatedUser._id, newRole: values.role });
    }

    form.resetFields();
    onSuccess();
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item name="firstname" label="Ad" rules={[{ required: true, message: "Lütfen kullanıcı adını giriniz!" }]}>
        <Input placeholder="Ad" />
      </Form.Item>

      <Form.Item
        name="lastname"
        label="Soyad"
        rules={[{ required: true, message: "Lütfen kullanıcı soyadını giriniz!" }]}
      >
        <Input placeholder="Soyad" />
      </Form.Item>

      <Form.Item
        name="email"
        label="E-posta"
        rules={[{ required: true, type: "email", message: "Lütfen geçerli bir e-posta adresi giriniz!" }]}
      >
        <Input placeholder="E-posta" />
      </Form.Item>

      <Form.Item name="role" label="Rol" rules={[{ required: true, message: "Lütfen bir rol seçiniz!" }]}>
        <Select placeholder="Rol Seçiniz">
          {Object.values(UserRoles).map((role) => (
            <Option key={role} value={role}>
              {role}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={loading}>
          Güncelle
        </Button>
      </Form.Item>
    </Form>
  );
}
