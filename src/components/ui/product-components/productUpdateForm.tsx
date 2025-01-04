"use client";

import IMaterial from "@/models/material/IMaterial";
import { IProduct } from "@/models/product/IProduct";
import { UNIT_TYPES } from "@/utilities/constants/product";
import { fetchMaterials } from "@/utilities/redux/slices/materialSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { Button, Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

export default function UpdateProductForm({
  onSuccess,
  onUpdate,
  initialValues,
}: {
  onSuccess: () => void;
  onUpdate: (values: IProduct) => void;
  initialValues: IProduct | null;
}) {
  const [form] = Form.useForm<IProduct>();
  const dispatch: AppDispatch = useDispatch();
  const productStatus = useSelector((state: RootState) => state.product.status);
  const products = useSelector((state: RootState) => state.product.products);
  const materials = useSelector((state: RootState) => state.material.materials);

  //   const onFinish = async (values: any) => {
  //     const updatedProduct = {
  //       ...initialValues,
  //       ...values,
  //     };

  //     try {
  //       const billOfMaterials = values.billOfMaterials.map((item: any) => ({
  //         materialId: item.materialId,
  //         quantity: item.quantity,
  //       }));

  //       const productData = {
  //         ...values,
  //         billOfMaterials,
  //       };

  //       await dispatch(addProduct(productData)).unwrap();
  //       form.resetFields();
  //       onSuccess();
  //     } catch (error) {
  //       console.error("Ürün ekleme hatası:", error);
  //     }
  //   };

  const onFinish = async (values: any) => {
    const updatedProduct = { ...initialValues, ...values };
    await onUpdate(updatedProduct);
    form.resetFields();
    onSuccess();
  };

  const getMaterials = async () => {
    await dispatch(fetchMaterials());
  };

  useEffect(() => {
    form.resetFields();
  }, [initialValues]);

  useEffect(() => {
    // getMaterials();
    dispatch(fetchMaterials());
  }, [dispatch]);

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">Ürün Düzenle</h2>
      <Form
        // className="grid grid-cols-1 md:grid-cols-2"
        className="flex flex-col justify-between"
        form={form}
        name="updateProductForm"
        layout="vertical"
        onFinish={onFinish}
        initialValues={{
          ...initialValues,
          billOfMaterials: initialValues?.billOfMaterials?.map((item) => ({
            materialId: item.materialId._id,
            quantity: item.quantity,
          })),
        }}
      >
        <div className="container flex flex-col px-6 md:mx-auto md:px-12 md:flex-row md:justify-center md:gap-5">
          <div className="w-full md:w-2/5">
            <Form.Item name="name" label="Ürün Adı" rules={[{ required: true, message: "Lütfen ürün adını giriniz!" }]}>
              <Input placeholder="Ürün adını giriniz" />
            </Form.Item>

            <Form.Item name="description" label="Açıklama" rules={[{ type: "string", message: "Lütfen bir metin giriniz." }]}>
              <Input placeholder="Ürün Açıklaması" className="!w-full" />
            </Form.Item>
            <Form.Item
              name="unitType"
              label="Birim Türü"
              rules={[{ required: true, message: "Lütfen birim türünü seçiniz!" }]}
              className="w-32"
            >
              <Select placeholder="Seçiniz">
                {UNIT_TYPES.map((type) => (
                  <Option key={type.key}>{type.label}</Option>
                ))}
              </Select>
            </Form.Item>
          </div>

          <div className="w-full md:w-3/5">
            <Form.List name="billOfMaterials">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, fieldKey, ...restField }) => (
                    <div className="flex flex-row gap-5 ">
                      <Form.Item
                        {...restField}
                        name={[name, "materialId"]}
                        fieldKey={[fieldKey ?? 0, "materialId"]}
                        rules={[{ required: true, message: "Malzeme seçiniz!" }]}
                        className="h-full w-1/2"
                      >
                        <Select
                          mode="multiple"
                          placeholder="Malzeme Seç"
                          options={materials.map((material) => ({ label: material.name, value: material._id }))}
                        />
                      </Form.Item>

                      <Form.Item
                        {...restField}
                        name={[name, "quantity"]}
                        fieldKey={[fieldKey ?? 0, "quantity"]}
                        rules={[{ required: true, message: "Miktar giriniz!" }]}
                        // className="w-1/4"
                      >
                        <InputNumber placeholder="Miktar" min={1} />
                      </Form.Item>

                      <Button className="!h-full" type="primary" danger shape="round" onClick={() => remove(name)}>
                        Sil
                      </Button>
                    </div>
                  ))}

                  <Form.Item>
                    <Button type="dashed" className="!w-1/2" onClick={() => add()} block>
                      + Malzeme Ekle
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button type="primary" htmlType="submit" className="w-1/2" loading={productStatus === "loading"}>
            Güncelle
          </Button>
        </div>
      </Form>
    </>
  );
}
