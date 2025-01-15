"use client";

import { useEffect } from "react";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { fetchSuppliersByMaterial } from "@/utilities/redux/slices/supplierSlice";
import { fetchMaterials } from "@/utilities/redux/slices/materialSlice";
import { ISupplierOrder } from "@/models/order/ISupplierOrder";
import { Button, DatePicker, Form, InputNumber, Select } from "antd";
import { toLocalTime, toUTC } from "@/utilities/dates/datetime-util";

const { Option } = Select;

export default function SupplierOrderUpdateForm({
  initialValues,
  onSuccess,
  onUpdate,
}: {
  initialValues: ISupplierOrder | null;
  onSuccess: () => void;
  onUpdate: (values: ISupplierOrder) => void;
}) {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const materials = useSelector((state: RootState) => state.material.materials);

  useEffect(() => {
    dispatch(fetchMaterials());
    if (initialValues?.materialId) {
      dispatch(fetchSuppliersByMaterial(initialValues.materialId._id));
    }
  }, [dispatch, initialValues]);

  const handleMaterialChange = async (materialId: string) => {
    await dispatch(fetchSuppliersByMaterial(materialId));
    form.setFieldsValue({ supplierId: null });
  };

  const onFinish = async (values: any) => {
    try {
      const updatedOrder = {
        ...initialValues,
        ...values,
        deliveryDate: values.deliveryDate ? toUTC(values.deliveryDate) : null,
      };
      await onUpdate(updatedOrder);
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error("Sipariş güncellenirken hata oluştu:", error);
    }
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initialValues,
        materialId: initialValues?.materialId?._id,
        supplierId: initialValues?.supplierId?._id,
        deliveryDate: initialValues?.deliveryDate ? dayjs(initialValues.deliveryDate) : null,
      }}
    >
      {/* Malzeme Seçimi */}
      <Form.Item name="materialId" label="Malzeme" rules={[{ required: true, message: "Lütfen bir malzeme seçiniz!" }]}>
        <Select placeholder="Malzeme Seçiniz" onChange={handleMaterialChange}>
          {materials.map((material) => (
            <Option key={material._id} value={material._id}>
              {material.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Tedarikçi Seçimi */}
      <Form.Item
        name="supplierId"
        label="Tedarikçi"
        rules={[{ required: true, message: "Lütfen bir tedarikçi seçiniz!" }]}
      >
        <Select placeholder="Tedarikçi Seçiniz">
          {suppliers.map((supplier) => (
            <Option key={supplier._id} value={supplier._id}>
              {supplier.companyName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Miktar */}
      <Form.Item name="quantity" label="Miktar" rules={[{ required: true, message: "Lütfen miktar giriniz!" }]}>
        <InputNumber min={1} className="w-full" />
      </Form.Item>

      {/* Teslim Tarihi */}
      <Form.Item
        name="deliveryDate"
        label="Teslim Tarihi"
        rules={[{ required: true, message: "Lütfen teslim tarihini giriniz!" }]}
      >
        <DatePicker className="w-full" showTime />
      </Form.Item>

      {/* Durum */}
      <Form.Item name="status" label="Durum" rules={[{ required: true, message: "Durum seçiniz!" }]}>
        <Select>
          <Option value="pending">Bekliyor</Option>
          <Option value="completed">Tamamlandı</Option>
          <Option value="canceled">İptal Edildi</Option>
        </Select>
      </Form.Item>

      {/* Gönder Butonu */}
      <Button type="primary" htmlType="submit" className="mt-4">
        Güncelle
      </Button>
    </Form>
  );
}
