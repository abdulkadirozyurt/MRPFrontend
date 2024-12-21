"use client";

import { addSupplier } from "@/utilities/redux/slices/supplierSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { Button, Form, FormInstance, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";

export default function AddSupplierForm({ onSuccess }: { onSuccess: () => void }) {
  const [form] = Form.useForm<FormInstance>();
  const dispatch: AppDispatch = useDispatch();
  const supplierStatus = useSelector((state: RootState) => state.supplier.status);

  const onFinish = async (values: any) => {
    try {
      await dispatch(addSupplier(values)).unwrap();
      form.resetFields();
      onSuccess();
    } catch (error: any) {
      console.error("Tedarikçi ekleme hatası:", error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Yeni Tedarikçi Ekle</h2>
      <Form
        // className="flex flex-col grid-cols-1 md:grid-cols-2"
        className="flex flex-col justify-between"
        form={form}
        name="addSupplierForm"
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="container flex flex-col px-6 md:mx-auto md:px-12 md:flex-row md:justify-center md:gap-5">
          <div className="w-full md:w-3/5">
            <Form.Item
              name="name"
              label="Tedarikçi Adı"
              rules={[{ required: true, message: "Lütfen tedarikçi adını giriniz!" }]}
            >
              <Input placeholder="Tedarikçi adını giriniz" />
            </Form.Item>

            <Form.Item
              name="contactName"
              label="Yetkili Adı"
              rules={[{ required: true, message: "Yetkili kişi adını giriniz!" }]}
            >
              <Input placeholder="Yetkili adını giriniz" />
            </Form.Item>

            <Form.Item
              name="contactTitle"
              label="Yetkili Ünvanı"
              rules={[{ required: true, message: "Lütfen yetkili ünvanını giriniz!" }]}
            >
              <Input placeholder="Yetkili ünvanını giriniz" />
            </Form.Item>

            <Form.Item
              name="phone"
              label="Telefon"
              rules={[{ required: true, message: "Lütfen telefon numarasını giriniz!" }]}
            >
              <Input placeholder="+90xxxxxxxxxx" />
            </Form.Item>
          </div>
          <div className="w-full md:w-3/5">
            <Form.Item
              name="city"
              label="Şehir"
              rules={[{ required: true, message: "Lütfen şehri giriniz!" }]}
            >
              <Input placeholder="Şehir giriniz" />
            </Form.Item>

            <Form.Item
              name="country"
              label="Ülke"
              rules={[{ required: true, message: "Lütfen ülkeyi giriniz!" }]}
            >
              <Input placeholder="Ülke giriniz" />
            </Form.Item>

            <Form.Item
              name="address"
              label="Adres"
              rules={[{ required: true, message: "Lütfen adresi giriniz!" }]}
            >
              <Input placeholder="Adres giriniz" />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-posta"
              rules={[
                { required: true, message: "Lütfen e-posta adresini giriniz!" },
                { type: "email", message: "Geçerli bir e-posta adresi giriniz!" },
              ]}
            >
              <Input placeholder="E-posta adresini giriniz" />
            </Form.Item>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button
            type="primary"
            htmlType="submit"
            className="w-2/4"
            loading={supplierStatus === "loading"}
          >
            Ekle
          </Button>

          {/* <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              className="w-2/3"
              loading={supplierStatus === "loading"}
            >
              Ekle
            </Button>
          </Form.Item> */}
        </div>
      </Form>
    </>
  );
}
