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
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Yeni Müşteri Ekle</h2>
      <Form name="addCustomerForm" form={form} onFinish={onFinish} layout="vertical" className="flex flex-col justify-between">
        <div className="container flex flex-col px-6 md:mx-auto md:px-12 md:flex-row md:justify-center md:gap-5">
          <div className="w-full md:w-3/5">
            <Form.Item name="companyName" label="Şirket Adı" rules={[{ required: true, message: "Zorunlu alan" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="contactName" label="Yetkili Adı" rules={[{ required: true, message: "Zorunlu alan" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="contactTitle" label="Yetkili Ünvanı" rules={[{ required: true, message: "Zorunlu alan" }]}>
              <Input />
            </Form.Item>
          </div>
          <div className="w-full md:w-3/5">
            <Form.Item name="email" label="E-posta" rules={[{ required: true, type: "email", message: "Geçerli bir e-posta girin" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="phone" label="Telefon" rules={[{ required: true, message: "Zorunlu alan" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="taxNumber" label="Vergi Numarası" rules={[{ required: true, message: "Zorunlu alan" }]}>
              <Input />
            </Form.Item>
          </div>

          <div className="w-full md:w-3/5">
            <Form.Item name="postalCode" label="Posta Kodu" rules={[{ required: true, message: "Zorunlu alan" }]}>
              <Input />
            </Form.Item>

            <Form.Item name="city" label="Şehir" rules={[{ required: true, message: "Zorunlu alan" }]}>
              <Input />
            </Form.Item>
            <Form.Item name="country" label="Ülke" rules={[{ required: true, message: "Zorunlu alan" }]}>
              <Input />
            </Form.Item>
          </div>

          <Form.Item name="address" label="Adres" rules={[{ required: true, message: "Zorunlu alan" }]}>
            <Input.TextArea />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Ekle
          </Button>
        </div>
      </Form>
    </>
  );
}
