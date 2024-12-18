"use client";

import React from "react";
import { Button, Form, Input, InputNumber, message, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { addMaterial } from "@/utilities/redux/slices/materialSlice";
import { FormInstance } from "antd";
import { ENTRY_TYPES, UNIT_TYPES } from "@/utilities/constants/material";
import FormItem from "antd/es/form/FormItem";

const { Option } = Select;

export default function AddMaterialForm({ onSuccess }: { onSuccess: () => void }) {
  const [form] = Form.useForm<FormInstance>();
  const dispatch: AppDispatch = useDispatch();
  const materialStatus = useSelector((state: RootState) => state.material.status);
  const materialError = useSelector((state: RootState) => state.material.error);

  // const onFinish = async (values: any) => {
  //   const result = await dispatch(addMaterial(values))
  //     .unwrap()
  //     // .then(() => {
  //     //   message.success("Malzeme başarıyla eklendi!");
  //     //   form.resetFields();
  //     // })
  //     // .catch((error: any) => {
  //     //   message.error("Malzeme eklenirken hata oluştu!");
  //     // });

  //   if (result) {
  //     console.log("ressssss",result);

  //     onSuccess(); // Başarı olduğunda form kapanır
  //   }
  // };

  const onFinish = async (values: any) => {
    try {
      await dispatch(addMaterial(values)).unwrap();
      message.success("Malzeme başarıyla eklendi!");
      form.resetFields();
      onSuccess(); // Modal kapanır ve liste yenilenir
    } catch (error) {
      console.error("Material eklenirken hata oluştu:", error);
      message.error("Malzeme eklenirken hata oluştu!");
    }
  };

  return (
    <div>
      <h2 className="text-2xl font-bold text-center mb-6">Yeni Malzeme Ekle</h2>
      <Form name="addMaterialForm" layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="name"
          label="Malzeme Adı"
          rules={[{ required: true, message: "Lütfen malzeme adını giriniz!" }]}
        >
          <Input placeholder="Malzeme adını giriniz" />
        </Form.Item>

        <Form.Item
          name="stockAmount"
          label="Stok Miktarı"
          rules={[
            { required: true, message: "Lütfen değeri giriniz!" },
            { type: "number", min: 1, message: "Değer 1'den büyük olmalıdır!" },
          ]}
        >
          <InputNumber min={0} placeholder="Stok miktarını giriniz" className="w-full" />
        </Form.Item>

        <Form.Item
          name="unitType"
          label="Birim Türü"
          rules={[{ required: true, message: "Lütfen birim türünü seçiniz!" }]}
        >
          <Select placeholder="Birim türünü seçiniz">
            {UNIT_TYPES.map((type) => (
              <Option key={type.key}>{type.label}</Option>
            ))}
          </Select>
        </Form.Item>

        <FormItem
          name="entryType"
          label="Giriş Türü"
          rules={[{ required: true, message: "Lütfen giriş türünü seçiniz!" }]}
        >
          <Select placeholder="Giriş türünü seçiniz">
            {ENTRY_TYPES.map((type) => (
              <Option key={type.key}>{type.label}</Option>
            ))}
          </Select>
        </FormItem>

        <Form.Item
          name="price"
          label="Fiyat"
          rules={[
            { required: true, message: "Lütfen değeri giriniz!" },
            { type: "number", min: 1, message: "Değer 0'den büyük olmalıdır!" },
          ]}
        >
          <InputNumber min={0} placeholder="Fiyatı giriniz" className="w-full" />
        </Form.Item>

        <Form.Item
          name="reorderLevel"
          label="Yeniden Sipariş Seviyesi"
          rules={[{ required: true, message: "Lütfen yeniden sipariş seviyesini giriniz!" }]}
        >
          <InputNumber
            min={0}
            placeholder="Yeniden sipariş seviyesini giriniz"
            className="w-full"
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="w-full"
            loading={materialStatus === "loading"}
          >
            Ekle
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
