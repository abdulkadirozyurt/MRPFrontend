"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utilities/redux/store";
import { addCustomer } from "@/utilities/redux/slices/customerSlice";
import { Button, Form, Input } from "antd";

export default function CustomerAddForm({ onSuccess }: { onSuccess: () => void }) {
  const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm();

  const onFinish = async (values: any) => {
    try {
      await dispatch(addCustomer(values)).unwrap();
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error("Müşteri eklenirken hata oluştu:", error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="horizontal">
      <Form.Item name="companyName" label="Şirket Adı" rules={[{ required: true, message: "Zorunlu alan" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="contactName" label="Yetkili Adı" rules={[{ required: true, message: "Zorunlu alan" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="E-posta" rules={[{ required: true, type: "email", message: "Geçerli bir e-posta girin" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Telefon" rules={[{ required: true, message: "Zorunlu alan" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="city" label="Şehir" rules={[{ required: true, message: "Zorunlu alan" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="country" label="Ülke" rules={[{ required: true, message: "Zorunlu alan" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="address" label="Adres" rules={[{ required: true, message: "Zorunlu alan" }]}>
        <Input.TextArea />
      </Form.Item>
      <Button type="primary" htmlType="submit">
        Ekle
      </Button>
    </Form>
  );
}
