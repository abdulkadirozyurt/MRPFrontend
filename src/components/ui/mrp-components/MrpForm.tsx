"use client";

import { Button, Form, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { calculateMRP, updateStock } from "@/utilities/redux/slices/mrpSlice";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/utilities/redux/slices/productSlice";

const { Option } = Select;

export default function MrpForm() {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const products = useSelector((state: RootState) => state.product.products);
  const mrpResult = useSelector((state: RootState) => state.mrp.data);
  const mrpStatus = useSelector((state: RootState) => state.mrp.status);

  const handleCalculate = async (values: { productId: string; requiredQuantity: number }) => {
    setLoading(true);
    try {
      await dispatch(calculateMRP(values)).unwrap();
    } catch (error) {
      console.error("MRP calculation error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
  },[]);

  return (
    <div>
      <h2 className="text-xl font-bold mb-4">MRP Hesaplama</h2>
      <Form form={form} layout="vertical" onFinish={handleCalculate}>
        <Form.Item name="productId" label="Ürün" rules={[{ required: true, message: "Lütfen bir ürün seçiniz!" }]}>
          <Select placeholder="Ürün Seçiniz" loading={mrpStatus === "loading"}>
            {products.map((product) => (
              <Option key={product._id} value={product._id}>
                {product.name}
              </Option>
            ))}
          </Select>
        </Form.Item>

        <Form.Item name="requiredQuantity" label="Gerekli Miktar" rules={[{ required: true, message: "Lütfen bir miktar giriniz!" }]}>
          <Input type="number" placeholder="Gerekli Miktar" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Hesapla
          </Button>
        </Form.Item>

        <Button
          type="primary"
          danger
          className="mt-4"
          onClick={() =>
            dispatch(
              updateStock(
                Object.values(mrpResult).map((result: any) => ({
                  materialId: result.materialId,
                  quantityToAdd: result.shortfall,
                }))
              )
            )
          }
          disabled={Object.values(mrpResult).every((result: any) => result.shortfall === 0)}
        >
          Eksik Stokları Güncelle
        </Button>
      </Form>

      {Object.keys(mrpResult).length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-4">MRP Sonuçları</h3>
          <ul>
            {Object.values(mrpResult).map((result: any, index) => (
              <li key={index} className="mb-2">
                <strong>{result.materialName}:</strong>
                Gerekli: {result.totalRequiredQuantity}, Stokta: {result.availableStock}, Eksik: {result.shortfall}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
