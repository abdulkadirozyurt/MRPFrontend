"use client";

import { Button, Form, Input, Select } from "antd";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utilities/redux/store";
import { addUser } from "@/utilities/redux/slices/userSlice";
import { useState } from "react";
import { UserRoles } from "@/utilities/constants/UserRoles";

const { Option } = Select;

export default function AddUserForm({ onSuccess }: { onSuccess: () => void }) {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values: any) => {
    setLoading(true);
    try {
      await dispatch(addUser(values)).unwrap();
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error("Kullanıcı eklenirken hata oluştu:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
      <Form.Item
        name="firstname"
        label="Ad"
        rules={[{ required: true, message: "Lütfen kullanıcı adını giriniz!" }]}
      >
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

      <Form.Item
        name="role"
        label="Rol"
        rules={[{ required: true, message: "Lütfen bir rol seçiniz!" }]}
      >
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
          Ekle
        </Button>
      </Form.Item>
    </Form>
  );
}
