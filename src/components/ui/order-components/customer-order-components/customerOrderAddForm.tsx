// "use client";

// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/utilities/redux/store";
// import { fetchProducts } from "@/utilities/redux/slices/productSlice";
// import { Button, Form, Input, InputNumber, Select, DatePicker } from "antd";
// import { fetchCustomerOrders, addCustomerOrder } from "@/utilities/redux/slices/customerOrderSlice";

// const { Option } = Select;

// export default function CustomerOrderAddForm({ onSuccess }: { onSuccess: () => void }) {
//   const dispatch: AppDispatch = useDispatch();
//   const customers = useSelector((state: RootState) => state.customerOrders.orders);
//   const products = useSelector((state: RootState) => state.product.products);
//   const customerOrderStatus = useSelector((state: RootState) => state.customerOrders.status);

//   const [form] = Form.useForm();

//   useEffect(() => {
//     dispatch(fetchCustomerOrders());
//     dispatch(fetchProducts());
//   }, [dispatch]);

//   const onFinish = async (values: any) => {
//     const customerOrderData = {
//       ...values,
//       products: values.products.map((item: any) => ({
//         productId: item.productId,
//         quantity: item.quantity,
//       })),
//     };

//     try {
//       await dispatch(addCustomerOrder(customerOrderData)).unwrap();
//       form.resetFields();
//       onSuccess();
//     } catch (error) {
//       console.error("Müşteri siparişi eklenirken hata oluştu:", error);
//     }
//   };

//   return (
//     <Form form={form} onFinish={onFinish} layout="vertical">
//       <Form.Item name="customerId" label="Müşteri" rules={[{ required: true, message: "Lütfen bir müşteri seçiniz!" }]}>
//         <Select placeholder="Müşteri Seçiniz">
//           {customers.map((customer) => (
//             <Option key={customer._id} value={customer._id}>
//               {customer.customerId}
//             </Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.Item
//         name="deliveryAddress"
//         label="Teslimat Adresi"
//         rules={[{ required: true, message: "Lütfen teslimat adresini giriniz!" }]}
//       >
//         <Input placeholder="Teslimat adresini giriniz" />
//       </Form.Item>

//       <Form.List name="products">
//         {(fields, { add, remove }) => (
//           <>
//             {fields.map(({ key, name, fieldKey, ...restField }) => (
//               <div key={key} className="flex gap-4 mb-2">
//                 <Form.Item
//                   {...restField}
//                   name={[name, "productId"]}
//                   fieldKey={[fieldKey, "productId"] as number[]}
//                   rules={[{ required: true, message: "Ürün seçiniz!" }]}
//                   className="flex-1"
//                 >
//                   <Select placeholder="Ürün Seç">
//                     {products.map((product) => (
//                       <Option key={product._id} value={product._id}>
//                         {product.name}
//                       </Option>
//                     ))}
//                   </Select>
//                 </Form.Item>
//                 <Form.Item
//                   {...restField}
//                   name={[name, "quantity"]}
//                   fieldKey={[fieldKey, "quantity"] as number[]}
//                   rules={[{ required: true, message: "Miktar giriniz!" }]}
//                 >
//                   <InputNumber placeholder="Miktar" min={1} />
//                 </Form.Item>
//                 <Button danger onClick={() => remove(name)}>
//                   Sil
//                 </Button>
//               </div>
//             ))}
//             <Form.Item>
//               <Button type="dashed" onClick={() => add()}>
//                 + Ürün Ekle
//               </Button>
//             </Form.Item>
//           </>
//         )}
//       </Form.List>

//       <Form.Item
//         name="deliveryDate"
//         label="Teslim Tarihi"
//         rules={[{ required: true, message: "Lütfen teslim tarihini giriniz!" }]}
//       >
//         <DatePicker className="w-full" />
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit" loading={customerOrderStatus === "loading"}>
//           Ekle
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// }



"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { fetchProducts } from "@/utilities/redux/slices/productSlice";
import { addCustomerOrder } from "@/utilities/redux/slices/customerOrderSlice";
import { Button, Form, Input, InputNumber, Select, DatePicker, Space } from "antd";

const { Option } = Select;

export default function AddCustomerOrderForm({ onSuccess }: { onSuccess: () => void }) {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  const customerOrderStatus = useSelector((state: RootState) => state.customerOrders.status);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  const onFinish = async (values: any) => {
    const customerOrderData = {
      ...values,
      products: values.products.map((item: any) => ({
        productId: item.productId,
        quantity: item.quantity,
      })),
    };

    try {
      await dispatch(addCustomerOrder(customerOrderData)).unwrap();
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error("Müşteri siparişi eklenirken hata oluştu:", error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical">
      <Form.Item
        name="customerId"
        label="Müşteri"
        rules={[{ required: true, message: "Lütfen bir müşteri seçiniz!" }]}
      >
        <Input placeholder="Müşteri ID'si giriniz" />
      </Form.Item>

      <Form.Item
        name="deliveryAddress"
        label="Teslimat Adresi"
        rules={[{ required: true, message: "Lütfen teslimat adresi giriniz!" }]}
      >
        <Input placeholder="Teslimat adresi giriniz" />
      </Form.Item>

      <Form.List name="products">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key} className="flex gap-4 mb-2">
                <Form.Item
                  {...restField}
                  name={[name, "productId"]}
                  fieldKey={[fieldKey, "productId"] as number[]}
                  rules={[{ required: true, message: "Ürün seçiniz!" }]}
                  className="flex-1"
                >
                  <Select placeholder="Ürün Seç">
                    {products.map((product) => (
                      <Option key={product._id} value={product._id}>
                        {product.name}
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
                + Ürün Ekle
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
        <DatePicker className="w-full" />
      </Form.Item>

      <Form.Item
        name="paymentMethod"
        label="Ödeme Yöntemi"
        rules={[{ required: true, message: "Lütfen ödeme yöntemini seçiniz!" }]}
      >
        <Select placeholder="Ödeme Yöntemi Seçiniz">
          <Option value="creditCard">Kredi Kartı</Option>
          <Option value="cash">Nakit</Option>
          <Option value="transfer">Havale/EFT</Option>
        </Select>
      </Form.Item>

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          loading={customerOrderStatus === "loading"}
        >
          Ekle
        </Button>
      </Form.Item>
    </Form>
  );
}
