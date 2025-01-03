"use client";

import ICustomer from "@/models/customer/ICustomer";
import { Button, Form, Input } from "antd";
import { useEffect } from "react";

export default function UpdateCustomerForm({
  initialValues,
  onSuccess,
  onUpdate,
}: {
  initialValues: ICustomer | null;
  onSuccess: () => void;
  onUpdate: (values: ICustomer) => void;
}) {
  // const dispatch = useDispatch<AppDispatch>();
  const [form] = Form.useForm<ICustomer>();

  const onFinish = async (values: any) => {
    const updatedCustomer = {
      ...initialValues,
      ...values,
    };
    try {
      await onUpdate(updatedCustomer);
      // form.resetFields();
      onSuccess();
    } catch (error) {
      console.error("Müşteri güncellenirken hata oluştu:", error);
    }
  };

  useEffect(() => {
    if (initialValues) {
      form.setFieldsValue(initialValues);
    }
  }, [initialValues, form]);

  return (
    <Form form={form} initialValues={initialValues || {}} onFinish={onFinish} layout="horizontal">
      <Form.Item name="companyName" label="Şirket Adı" rules={[{ required: true, message: "Zorunlu alan" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="contactName" label="Yetkili Adı" rules={[{ required: true, message: "Zorunlu alan" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="contactTitle" label="Yetkili Ünvanı" rules={[{ required: true, message: "Zorunlu alan" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="email" label="E-posta" rules={[{ required: true, type: "email", message: "Geçerli bir e-posta girin" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="phone" label="Telefon" rules={[{ required: true, message: "Zorunlu alan" }]}>
        <Input />
      </Form.Item>
      <Form.Item name="taxNumber" label="Vergi Numarası">
        <Input />
      </Form.Item>
      <Form.Item name="postalCode" label="Posta Kodu">
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
        Güncelle
      </Button>
    </Form>
  );
}
