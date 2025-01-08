"use client";

import { useDispatch } from "react-redux";
import { AppDispatch } from "@/utilities/redux/store";
import { addCustomer } from "@/utilities/redux/slices/customerSlice";
import { Button, Form, Input } from "antd";

export default function CustomerAddForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
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
      <h2 className="text-2xl font-bold text-center mb-8">Yeni Müşteri Ekle</h2>
      <Form
        name="addCustomerForm"
        form={form}
        onFinish={onFinish}
        layout="vertical"
        className="mx-auto p-8 bg-white rounded-lg"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          <Form.Item
            name="companyName"
            label="Şirket Adı"
            rules={[{ required: true, message: "Zorunlu alan" }]}
          >
            <Input className="h-10" />
          </Form.Item>
          <Form.Item
            name="contactName"
            label="Yetkili Adı"
            rules={[{ required: true, message: "Zorunlu alan" }]}
          >
            <Input className="h-10" />
          </Form.Item>
          <Form.Item
            name="contactTitle"
            label="Yetkili Ünvanı"
            rules={[{ required: true, message: "Zorunlu alan" }]}
          >
            <Input className="h-10" />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-posta"
            rules={[
              {
                required: true,
                type: "email",
                message: "Geçerli bir e-posta girin",
              },
            ]}
          >
            <Input className="h-10" />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Telefon"
            rules={[{ required: true, message: "Zorunlu alan" }]}
          >
            <Input className="h-10" />
          </Form.Item>
          <Form.Item
            name="taxNumber"
            label="Vergi Numarası"
            rules={[{ required: true, message: "Zorunlu alan" }]}
          >
            <Input className="h-10" />
          </Form.Item>
          <Form.Item
            name="postalCode"
            label="Posta Kodu"
            rules={[{ required: true, message: "Zorunlu alan" }]}
          >
            <Input className="h-10" />
          </Form.Item>
          <Form.Item
            name="city"
            label="Şehir"
            rules={[{ required: true, message: "Zorunlu alan" }]}
          >
            <Input className="h-10" />
          </Form.Item>
          <Form.Item
            name="country"
            label="Ülke"
            rules={[{ required: true, message: "Zorunlu alan" }]}
          >
            <Input className="h-10" />
          </Form.Item>
        </div>

        <Form.Item
          name="address"
          label="Adres"
          className="mt-6"
          rules={[{ required: true, message: "Zorunlu alan" }]}
        >
          <Input.TextArea rows={4} />
        </Form.Item>

        <div className="flex justify-end mt-8">
          <Button
            type="primary"
            htmlType="submit"
            className="px-8 h-10 text-white bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
          >
            Ekle
          </Button>
        </div>
      </Form>
    </>
  );
}
