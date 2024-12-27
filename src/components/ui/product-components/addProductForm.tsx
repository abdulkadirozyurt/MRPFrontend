"use client";

import Multiselect from "@/components/common/Multiselect";
import { IBillOfMaterial } from "@/models/bom/IBillOfMaterial";
import { UNIT_TYPES } from "@/utilities/constants/product";
import { fetchMaterials } from "@/utilities/redux/slices/materialSlice";
import { addProduct } from "@/utilities/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { Button, Form, Input, InputNumber, Select, Space } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

export default function AddProductForm({ onSuccess }: { onSuccess: () => void }) {
  const [form] = Form.useForm<{
    name: string;
    description: string;
    billOfMaterials?: IBillOfMaterial[];
  }>();
  const dispatch: AppDispatch = useDispatch();
  const productStatus = useSelector((state: RootState) => state.product.status);
  const products = useSelector((state: RootState) => state.product.products);
  const materials = useSelector((state: RootState) => state.material.materials);
  const [selectedMaterialIds, setSelectedMaterialIds] = useState<string[]>([]);

  // const onFinish = async (values: any) => {
  //   console.log("values-> ", values);

  //   try {
  //     await dispatch(addProduct(values)).unwrap();
  //     form.resetFields();
  //     onSuccess();
  //   } catch (error: any) {
  //     console.error("Malzeme ekleme hatası:", error);
  //   }
  // };

  const onFinish = async (values: any) => {
    try {
      const billOfMaterials = values.billOfMaterials.map((item: any) => ({
        materialId: item.materialId,
        quantity: item.quantity,
      }));

      const productData = {
        ...values,
        billOfMaterials,
      };

      await dispatch(addProduct(productData)).unwrap();
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error("Ürün ekleme hatası:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchMaterials());
  }, [dispatch]);

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-4">Yeni Ürün Ekle</h2>
      <Form
        // className="grid grid-cols-1 md:grid-cols-2"
        className="flex flex-col justify-between"
        form={form}
        name="addProductForm"
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="container flex flex-col px-6 md:mx-auto md:px-12 md:flex-row md:justify-center md:gap-5">
          <div className="w-full md:w-2/5">
            <Form.Item
              name="name"
              label="Ürün Adı"
              rules={[{ required: true, message: "Lütfen ürün adını giriniz!" }]}
            >
              <Input placeholder="Ürün adını giriniz" />
            </Form.Item>

            <Form.Item
              name="description"
              label="Açıklama"
              rules={[{ type: "string", message: "Lütfen bir metin giriniz." }]}
            >
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
                    <div className="flex flex-row  gap-5 ">
                      <Form.Item
                        {...restField}
                        name={[name, "materialId"]}
                        fieldKey={[fieldKey, "materialId"]}
                        rules={[{ required: true, message: "Malzeme seçiniz!" }]}
                        className="h-full"
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
                        fieldKey={[fieldKey, "quantity"]}
                        rules={[{ required: true, message: "Miktar giriniz!" }]}
                        // className="w-1/4"
                      >
                        <InputNumber placeholder="Miktar" min={1} />
                      </Form.Item>

                      <Button
                        className="!h-full"
                        type="primary"
                        danger
                        shape="round"
                        onClick={() => remove(name)}
                      >
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
            Ekle
          </Button>
        </div>
      </Form>
    </>
  );
}

{
  /* <Form.Item
                name="entryType"
                label="Giriş Türü"
                className="w-32"
                rules={[{ required: true, message: "Lütfen giriş türünü seçiniz!" }]}
              >
                <Select placeholder="Seçiniz">
                  {ENTRY_TYPES.map((type) => (
                    <Option key={type.key}>{type.label}</Option>
                  ))}
                </Select>
              </Form.Item> */
}

{
  /* <Form.Item
              name="price"
              label="Fiyat"
              className="w-full"
              rules={[
                { required: true, message: "Lütfen değeri giriniz!" },
                { type: "number", min: 1, message: "Değer 0'den büyük olmalıdır!" },
              ]}
            >
              <InputNumber min={0} placeholder="Fiyatı giriniz" className="!w-full" />
            </Form.Item> */
}

{
  /* <Form.Item
              name="reorderLevel"
              label="Yeniden Sipariş Seviyesi"
              rules={[{ required: true, message: "Lütfen yeniden sipariş seviyesini giriniz!" }]}
            >
              <InputNumber min={0} placeholder="Yeniden sipariş seviyesini giriniz" className="!w-full" />
            </Form.Item> */
}
