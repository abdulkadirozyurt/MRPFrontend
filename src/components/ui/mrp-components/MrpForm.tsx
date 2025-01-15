"use client";

import { Button, Form, Input, Modal, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { calculateMRP, createSupplierOrdersFromMRP } from "@/utilities/redux/slices/mrpSlice";
import { useEffect, useState } from "react";
import { fetchProducts } from "@/utilities/redux/slices/productSlice";
import { fetchWarehouses } from "@/utilities/redux/slices/warehouseSlice";

const { Option } = Select;

export default function MrpForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  const warehouses = useSelector((state: RootState) => state.warehouse.warehouses);
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

  const handleCreateOrders = async (values: { warehouseId: string }) => {
    try {
      setLoading(true);
      await dispatch(createSupplierOrdersFromMRP({ warehouseId: values.warehouseId, mrpResult })).unwrap();
      Modal.success({ content: "Siparişler başarıyla oluşturuldu." });
    } catch (error) {
      console.error("Sipariş oluşturma hatası:", error);
      Modal.error({ content: "Siparişler oluşturulurken hata oluştu." });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchWarehouses()); // Depoların yüklenmesi
  }, [dispatch]);

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

        <Form.Item
          name="requiredQuantity"
          label="Gerekli Miktar"
          rules={[{ required: true, message: "Lütfen bir miktar giriniz!" }]}
        >
          <Input type="number" placeholder="Gerekli Miktar" />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={loading}>
            Hesapla
          </Button>
        </Form.Item>
      </Form>

      {Object.keys(mrpResult).length > 0 && (
        <Form onFinish={handleCreateOrders} layout="vertical">
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">MRP Sonuçları</h3>
            <ul>
              {Object.values(mrpResult).map((result: any, index) => (
                <li key={index} className="mb-2">
                  <strong>{result.materialName}:</strong> Gerekli: {result.totalRequiredQuantity}, Stokta:{" "}
                  {result.availableStock}, Eksik: {result.shortfall}
                </li>
              ))}
            </ul>

            <Form.Item
              name="warehouseId"
              label="Depo"
              rules={[{ required: true, message: "Lütfen bir depo seçiniz!" }]}
            >
              <Select placeholder="Depo Seçiniz" loading={loading}>
                {warehouses.map((warehouse) => (
                  <Option key={warehouse._id} value={warehouse._id}>
                    {warehouse.name}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" danger loading={loading}>
                Eksik Stokları Siparişe Dönüştür
              </Button>
            </Form.Item>
          </div>
        </Form>
      )}
    </div>
  );
}

// "use client";

// import { Button, Form, Input, Modal, Select } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/utilities/redux/store";
// import { calculateMRP, createSupplierOrdersFromMRP } from "@/utilities/redux/slices/mrpSlice";
// import { useEffect, useState } from "react";
// import { fetchProducts } from "@/utilities/redux/slices/productSlice";

// const { Option } = Select;

// export default function MrpForm() {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

//   const dispatch: AppDispatch = useDispatch();
//   const products = useSelector((state: RootState) => state.product.products);
//   const mrpResult = useSelector((state: RootState) => state.mrp.data);
//   const mrpStatus = useSelector((state: RootState) => state.mrp.status);

//   const handleCalculate = async (values: { productId: string; requiredQuantity: number }) => {
//     setLoading(true);
//     try {
//       await dispatch(calculateMRP(values)).unwrap();
//     } catch (error) {
//       console.error("MRP calculation error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleCreateOrders = async () => {
//     try {
//       setLoading(true);
//       await dispatch(createSupplierOrdersFromMRP({ warehouseId: "your-warehouse-id", mrpResult })).unwrap();
//       Modal.success({ content: "Siparişler başarıyla oluşturuldu." });
//     } catch (error) {
//       console.error("Sipariş oluşturma hatası:", error);
//       Modal.error({ content: "Siparişler oluşturulurken hata oluştu." });
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">MRP Hesaplama</h2>
//       <Form form={form} layout="vertical" onFinish={handleCalculate}>
//         <Form.Item name="productId" label="Ürün" rules={[{ required: true, message: "Lütfen bir ürün seçiniz!" }]}>
//           <Select placeholder="Ürün Seçiniz" loading={mrpStatus === "loading"}>
//             {products.map((product) => (
//               <Option key={product._id} value={product._id}>
//                 {product.name}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item
//           name="requiredQuantity"
//           label="Gerekli Miktar"
//           rules={[{ required: true, message: "Lütfen bir miktar giriniz!" }]}
//         >
//           <Input type="number" placeholder="Gerekli Miktar" />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" loading={loading}>
//             Hesapla
//           </Button>
//         </Form.Item>
//       </Form>

//       {Object.keys(mrpResult).length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-4">MRP Sonuçları</h3>
//           <ul>
//             {Object.values(mrpResult).map((result: any, index) => (
//               <li key={index} className="mb-2">
//                 <strong>{result.materialName}:</strong> Gerekli: {result.totalRequiredQuantity}, Stokta:{" "}
//                 {result.availableStock}, Eksik: {result.shortfall}
//               </li>
//             ))}
//           </ul>
//           <Button type="primary" danger onClick={handleCreateOrders} loading={loading}>
//             Eksik Stokları Siparişe Dönüştür
//           </Button>
//         </div>
//       )}
//     </div>
//   );
// }

// "use client";

// import { calculateMRP } from "@/utilities/redux/slices/mrpSlice";
// import { fetchProducts } from "@/utilities/redux/slices/productSlice";
// import { AppDispatch, RootState } from "@/utilities/redux/store";
// import { Button, Form, Input, Modal, Select } from "antd";
// import { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import SupplierOrderAddForm from "../order-components/supplier-order-components/supplierOrderAddForm";

// const { Option } = Select;

// export default function MrpForm() {
//   const [form] = Form.useForm();
//   const [loading, setLoading] = useState(false);
//   const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

//   const dispatch: AppDispatch = useDispatch();
//   const products = useSelector((state: RootState) => state.product.products);
//   const mrpResult = useSelector((state: RootState) => state.mrp.data);
//   const mrpStatus = useSelector((state: RootState) => state.mrp.status);

//   

//   const handleCalculate = async (values: { productId: string; requiredQuantity: number }) => {
//     setLoading(true);
//     try {
//       await dispatch(calculateMRP(values)).unwrap();
//     } catch (error) {
//       console.error("MRP calculation error:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const showModal = () => {
//     setIsModalVisible(true);
//   };

//   const handleModalClose = () => {
//     setIsModalVisible(false);
//     // setEditingOrder(null);
//     // dispatch(fetchSupplierOrders());
//   };

//   useEffect(() => {
//     dispatch(fetchProducts());
//   }, []);

//   return (
//     <div>
//       <h2 className="text-xl font-bold mb-4">MRP Hesaplama</h2>
//       <Form form={form} layout="vertical" onFinish={handleCalculate}>
//         <Form.Item name="productId" label="Ürün" rules={[{ required: true, message: "Lütfen bir ürün seçiniz!" }]}>
//           <Select placeholder="Ürün Seçiniz" loading={mrpStatus === "loading"}>
//             {products.map((product) => (
//               <Option key={product._id} value={product._id}>
//                 {product.name}
//               </Option>
//             ))}
//           </Select>
//         </Form.Item>

//         <Form.Item name="requiredQuantity" label="Gerekli Miktar" rules={[{ required: true, message: "Lütfen bir miktar giriniz!" }]}>
//           <Input type="number" placeholder="Gerekli Miktar" />
//         </Form.Item>

//         <Form.Item>
//           <Button type="primary" htmlType="submit" loading={loading}>
//             Hesapla
//           </Button>
//         </Form.Item>

//         <Button type="primary" danger onClick={() => showModal()}>
//           Eksik Stokları Güncelle
//         </Button>

//         <Modal open={isModalVisible} okType="primary" onCancel={() => setIsModalVisible(false)} footer={null} className="!w-4/6">
//           <SupplierOrderAddForm onSuccess={handleModalClose} initialValues={mrpResult}/>
//         </Modal>
//       </Form>

//       {Object.keys(mrpResult).length > 0 && (
//         <div className="mt-6">
//           <h3 className="text-lg font-semibold mb-4">MRP Sonuçları</h3>
//           <ul>
//             {Object.values(mrpResult).map((result: any, index) => (
//               <li key={index} className="mb-2">
//                 <strong>{result.materialName}:</strong>
//                 Gerekli: {result.totalRequiredQuantity}, Stokta: {result.availableStock}, Eksik: {result.shortfall}
//               </li>
//             ))}
//           </ul>
//         </div>
//       )}
//     </div>
//   );
// }
