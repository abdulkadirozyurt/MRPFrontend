import { ICustomerOrder } from "@/models/order/ICustomerOrder";
import { toLocalTime, toUTC } from "@/utilities/dates/datetime-util";
import { fetchCustomers } from "@/utilities/redux/slices/customerSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const { Option } = Select;

export default function CustomerOrderUpdateForm({
  initialValues,
  onSuccess,
  onUpdate,
}: {
  initialValues: ICustomerOrder;
  onSuccess: () => void;
  onUpdate: (values: ICustomerOrder) => void;
}) {
  const [form] = Form.useForm();
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector((state: RootState) => state.customer.customers);
  const products = useSelector((state: RootState) => state.product.products);

  const onFinish = async (values: any) => {
    const utcDeliveryDate = values.deliveryDate
      ? toUTC(values.deliveryDate)
      : null;
    const updatedOrder = {
      ...initialValues,
      ...values,
      deliveryDate: utcDeliveryDate,
    };
    await onUpdate(updatedOrder);
    form.resetFields();
    onSuccess();
  };

  useEffect(() => {
    // dispatch(fetchProducts());
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initialValues,
        deliveryDate: initialValues.deliveryDate
          ? dayjs(initialValues.deliveryDate)
          : null,
        // customerId:
        //   typeof initialValues.customerId === "object"
        //     ? initialValues.customerId._id
        //     : initialValues.customerId,
      }}
    >
      {/* <Form.Item
        name="customerId"
        label="Müşteri"
        rules={[{ required: true, message: "Lütfen bir müşteri seçiniz!" }]}
      >
        <Select
          mode="multiple"
          placeholder="Müşteri Seçiniz"
          defaultValue={initialValues.customerId}
        >
          {customers.map((customer) => (
            <Option key={customer._id} value={customer._id}>
              {customer.companyName}
            </Option>
          ))}
        </Select>
      </Form.Item> */}

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
        rules={[{ required: true, message: "Zorunlu alan" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="deliveryDate"
        label="Teslim Tarihi"
        rules={[{ required: true, message: "Lütfen teslim tarihini giriniz!" }]}
      >
        <DatePicker
          className="w-full"
          showTime
          format={(value) => toLocalTime(value.toDate())}
          onChange={(date) =>
            form.setFieldsValue({
              deliveryDate: date ? date.toISOString() : null,
            })
          }
        />
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
        name="status"
        label="Durum"
        rules={[{ required: true, message: "Zorunlu alan" }]}
      >
        <Select>
          <Option value="pending">Bekliyor</Option>
          <Option value="completed">Tamamlandı</Option>
          <Option value="canceled">İptal Edildi</Option>
        </Select>
      </Form.Item>

      <Button type="primary" htmlType="submit">
        Güncelle
      </Button>
    </Form>
  );
}
