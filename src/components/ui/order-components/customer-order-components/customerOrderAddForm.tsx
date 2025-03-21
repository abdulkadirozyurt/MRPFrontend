"use client";

import { toLocalTime } from "@/utilities/dates/datetime-util";
import { addCustomerOrder } from "@/utilities/redux/slices/customerOrderSlice";
import { fetchCustomers } from "@/utilities/redux/slices/customerSlice";
import { fetchProducts } from "@/utilities/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

export default function AddCustomerOrderForm({
  onSuccess,
}: {
  onSuccess: () => void;
}) {
  const dispatch: AppDispatch = useDispatch();
  const products = useSelector((state: RootState) => state.product.products);
  const customers = useSelector((state: RootState) => state.customer.customers);
  const customerOrderStatus = useSelector(
    (state: RootState) => state.customerOrders.status
  );

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCustomers());
  }, [dispatch]);

  const onFinish = async (values: any) => {
    const customerOrderData = {
      ...values,
      deliveryDate: values.deliveryDate.toISOString(),
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
        <Select placeholder="Müşteri Seçiniz">
          {customers.map((customer) => (
            <Option key={customer._id} value={customer._id}>
              {customer.companyName}
            </Option>
          ))}
        </Select>
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
        rules={[
          { required: true, message: "Lütfen teslim tarihini giriniz!" },
          () => ({
            validator(_, value) {
              const selectedDate = new Date(value);
              const currentDate = new Date();
              if (!value || selectedDate > currentDate) {
                return Promise.resolve();
              }
              return Promise.reject(new Error("Geçmiş bir tarih seçilemez!"));
            },
          }),
        ]}
      >
        <DatePicker
          className="w-full"
          showTime
          showHour
          showMinute
          format={(value) => toLocalTime(value.toDate())}
        />
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
