"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { addSupplierOrder } from "@/utilities/redux/slices/supplierOrderSlice";
import { fetchSuppliersByMaterial } from "@/utilities/redux/slices/supplierSlice";
import { fetchMaterials } from "@/utilities/redux/slices/materialSlice";
import { fetchWarehouses } from "@/utilities/redux/slices/warehouseSlice";
import { Button, Form, InputNumber, Select, DatePicker } from "antd";
import { useEffect } from "react";

const { Option } = Select;

interface SupplierOrderAddFormProps {
  onSuccess: () => void;
  initialValues?: any;
}

export default function SupplierOrderAddForm({ onSuccess, initialValues }: SupplierOrderAddFormProps) {
  const dispatch: AppDispatch = useDispatch();
  const supplierOrderStatus = useSelector((state: RootState) => state.supplierOrders.status);
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const materials = useSelector((state: RootState) => state.material.materials);
  const warehouses = useSelector((state: RootState) => state.warehouse.warehouses);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchMaterials());
    dispatch(fetchWarehouses());
  }, [dispatch]);

  const handleMaterialChange = async (materialId: string) => {
    await dispatch(fetchSuppliersByMaterial(materialId));
    form.setFieldsValue({ supplierId: null });
  };

  const onFinish = async (values: any) => {
    const utcDeliveryDate = values.deliveryDate ? values.deliveryDate.utc().format() : null;
    const supplierOrderData = {
      ...values,
      deliveryDate: utcDeliveryDate,
    };

    try {
      await dispatch(addSupplierOrder(supplierOrderData)).unwrap();
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error("Tedarikçi siparişi eklenirken hata oluştu:", error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" initialValues={initialValues}>
      {/* Malzeme Seçimi */}
      <Form.Item
        name="materialId"
        label="Malzeme"
        rules={[{ required: true, message: "Lütfen bir malzeme seçiniz!" }]}
      >
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

      {/* Miktar Girişi */}
      <Form.Item
        name="quantity"
        label="Miktar"
        rules={[{ required: true, message: "Lütfen miktar giriniz!" }]}
      >
        <InputNumber placeholder="Miktar" min={1} />
      </Form.Item>

      {/* Depo Seçimi */}
      <Form.Item
        name="warehouseId"
        label="Depo"
        rules={[{ required: true, message: "Lütfen bir depo seçiniz!" }]}
      >
        <Select placeholder="Depo Seçiniz">
          {warehouses.map((warehouse) => (
            <Option key={warehouse._id} value={warehouse._id}>
              {warehouse.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      {/* Teslim Tarihi */}
      <Form.Item
        name="deliveryDate"
        label="Teslim Tarihi"
        rules={[{ required: true, message: "Lütfen teslim tarihini giriniz!" }]}
      >
        <DatePicker className="w-full" showTime />
      </Form.Item>

      {/* Form Gönder Butonu */}
      <Form.Item>
        <Button type="primary" htmlType="submit" loading={supplierOrderStatus === "loading"}>
          Sipariş Ekle
        </Button>
      </Form.Item>
    </Form>
  );
}

