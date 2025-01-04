"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Multiselect from "@/components/common/Multiselect";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { addMaterial } from "@/utilities/redux/slices/materialSlice";
import { fetchSuppliers } from "@/utilities/redux/slices/supplierSlice";
import { ENTRY_TYPES, UNIT_TYPES } from "@/utilities/constants/material";
import { Button, Form, FormInstance, Input, InputNumber, Select } from "antd";
import ISupplier from "@/models/supplier/ISupplier";
import IMaterial from "@/models/material/IMaterial";

const { Option } = Select;

export default function AddMaterialForm({ onSuccess }: { onSuccess: () => void }) {
  const [form] = Form.useForm<IMaterial>();
  const dispatch: AppDispatch = useDispatch();
  const materialStatus = useSelector((state: RootState) => state.supplier.status);
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  // const [selectedSupplierIds, setSelectedSupplierIds] = useState<string[]>([]);

  const onFinish = async (values: any) => {
    try {
      await dispatch(addMaterial(values)).unwrap();
      form.resetFields();
      onSuccess();
    } catch (error: any) {
      console.error("Malzeme ekleme hatası:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchSuppliers());
  }, [dispatch]);

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Yeni Malzeme Ekle</h2>
      <Form className="flex flex-col justify-between" form={form} name="addMaterialForm" layout="vertical" onFinish={onFinish}>
        <div className="container flex flex-col px-6 md:mx-auto md:px-12 md:flex-row md:justify-center md:gap-5">
          <div className="w-full md:w-2/5">
            <Form.Item name="name" label="Malzeme Adı" rules={[{ required: true, message: "Lütfen malzeme adını giriniz!" }]}>
              <Input placeholder="Malzeme adını giriniz" />
            </Form.Item>

            <Form.Item
              name="stockAmount"
              label="Stok Miktarı"
              rules={[
                { required: true, message: "Lütfen değeri giriniz!" },
                {
                  type: "number",
                  min: 1,
                  message: "Değer 1'den büyük olmalıdır!",
                },
              ]}
            >
              <InputNumber min={0} placeholder="Stok miktarını giriniz" className="!w-full" />
            </Form.Item>

            <Form.Item
              name="suppliers"
              label="Tedarikçiler"
              rules={[
                {
                  required: true,
                  message: "Lütfen tedarikçi seçiniz!",
                },
              ]}
            >
              <Select
                mode="multiple"
                placeholder="Tedarikçi Seçiniz"
                options={suppliers.map((supplier: ISupplier) => ({
                  label: supplier.companyName,
                  value: supplier._id,
                }))}
              />
            </Form.Item>
          </div>

          <div className="w-full md:w-2/5">
            <div className="flex flex-row gap-2">
              <Form.Item name="unitType" label="Birim Türü" rules={[{ required: true, message: "Lütfen birim türünü seçiniz!" }]} className="w-32">
                <Select placeholder="Seçiniz">
                  {UNIT_TYPES.map((type) => (
                    <Option key={type.key}>{type.label}</Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="entryType" label="Giriş Türü" className="w-32" rules={[{ required: true, message: "Lütfen giriş türünü seçiniz!" }]}>
                <Select placeholder="Seçiniz">
                  {ENTRY_TYPES.map((type) => (
                    <Option key={type.key}>{type.label}</Option>
                  ))}
                </Select>
              </Form.Item>
            </div>

            <Form.Item
              name="price"
              label="Fiyat"
              className="w-full"
              rules={[
                { required: true, message: "Lütfen değeri giriniz!" },
                {
                  type: "number",
                  min: 1,
                  message: "Değer 0'den büyük olmalıdır!",
                },
              ]}
            >
              <InputNumber min={0} placeholder="Fiyatı giriniz" className="!w-full" />
            </Form.Item>

            <Form.Item
              name="reorderLevel"
              label="Yeniden Sipariş Seviyesi"
              rules={[
                {
                  required: true,
                  message: "Lütfen yeniden sipariş seviyesini giriniz!",
                },
              ]}
            >
              <InputNumber min={0} placeholder="Yeniden sipariş seviyesini giriniz" className="!w-full" />
            </Form.Item>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button type="primary" htmlType="submit" className="w-1/2" loading={materialStatus === "loading"}>
            Ekle
          </Button>
        </div>
      </Form>
    </>
  );
}
