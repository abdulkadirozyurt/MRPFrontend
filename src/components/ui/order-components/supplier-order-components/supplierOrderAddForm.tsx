"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { addSupplierOrder } from "@/utilities/redux/slices/supplierOrderSlice";
import { fetchSuppliers } from "@/utilities/redux/slices/supplierSlice";
import { fetchMaterials } from "@/utilities/redux/slices/materialSlice";
import { Button, Form, Input, InputNumber, Select, DatePicker } from "antd";
import { useEffect } from "react";

const { Option } = Select;

export default function SupplierOrderAddForm({ onSuccess }: { onSuccess: () => void }) {
  const dispatch: AppDispatch = useDispatch();
  const supplierOrderStatus = useSelector((state: RootState) => state.supplierOrders.status);
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const materials = useSelector((state: RootState) => state.material.materials);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchSuppliers());
    dispatch(fetchMaterials());
  }, [dispatch]);

  const onFinish = async (values: any) => {
    const utcDeliveryDate = values.deliveryDate ? values.deliveryDate.utc().format() : null;
    const supplierOrderData = {
      ...values,
      deliveryDate: utcDeliveryDate,
      products: values.products.map((item: any) => ({
        productId: item.materialId,
        quantity: item.quantity,
      })),
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
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item name="supplierId" label="Tedarikçi" rules={[{ required: true, message: "Lütfen bir tedarikçi seçiniz!" }]}>
        <Select placeholder="Tedarikçi Seçiniz">
          {suppliers.map((supplier) => (
            <Option key={supplier._id} value={supplier._id}>
              {supplier.companyName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item name="warehouseId" label="Depo ID" rules={[{ required: true, message: "Lütfen depo ID'sini giriniz!" }]}>
        <Input placeholder="Depo ID'sini giriniz" />
      </Form.Item>

      <Form.List name="products">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key} className="flex gap-4 mb-2">
                <Form.Item
                  {...restField}
                  name={[name, "materialId"]}
                  fieldKey={[fieldKey, "materialId"] as number[]}
                  rules={[{ required: true, message: "Malzeme seçiniz!" }]}
                  className="flex-1"
                >
                  <Select placeholder="Malzeme Seç">
                    {materials.map((material) => (
                      <Option key={material._id} value={material._id}>
                        {material.name}
                      </Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "quantity"]}
                  fieldKey={[fieldKey, "quantity"] as number[]}
                  rules={[{ required: true, message: "Miktar giriniz!" }]}
                >
                  <InputNumber placeholder="Miktar" min={1} />
                </Form.Item>
                <Button danger onClick={() => remove(name)}>
                  Sil
                </Button>
              </div>
            ))}
            <Form.Item>
              <Button type="dashed" onClick={() => add()}>
                + Malzeme Ekle
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <Form.Item
        name="deliveryDate"
        label="Teslim Tarihi"
        rules={[{ required: true, message: "Lütfen teslim tarihini giriniz!" }]}
      >
        <DatePicker className="w-full" showTime />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={supplierOrderStatus === "loading"}>
          Ekle
        </Button>
      </Form.Item>
    </Form>
  );
}
