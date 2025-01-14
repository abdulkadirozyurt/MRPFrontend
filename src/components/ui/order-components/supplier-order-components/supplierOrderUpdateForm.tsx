import { ICustomerOrder } from "@/models/order/ICustomerOrder";
import { ISupplierOrder } from "@/models/order/ISupplierOrder";
import { toLocalTime, toUTC } from "@/utilities/dates/datetime-util";
import { fetchCustomers } from "@/utilities/redux/slices/customerSlice";
import { fetchProducts } from "@/utilities/redux/slices/productSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { Button, DatePicker, Form, Input, InputNumber, Select } from "antd";
import dayjs from "dayjs";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

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
  const dispatch = useDispatch<AppDispatch>();
  const customers = useSelector((state: RootState) => state.customer.customers);
  const products = useSelector((state: RootState) => state.product.products);

  const onFinish = async (values: any) => {
    try {
      const customerOrderData = {
        ...values,
        customerId: values.customerId,
        deliveryDate: toUTC(values.deliveryDate),
        products: values.products.map((item: any) => ({
          productId: item.productId,
          quantity: item.quantity,
        })),
      };

      await onUpdate(customerOrderData);
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error("Müşteri siparişi güncellenirken hata oluştu:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(fetchCustomers());
  }, [dispatch]);

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initialValues,
        supplierId: initialValues?.supplierId?._id,
        materials: initialValues?.materials?.map((item) => ({
          materialId: item.materialId?._id,
          quantity: item.quantity,
        })),
        deliveryDate: initialValues?.deliveryDate
          ? dayjs(initialValues?.deliveryDate)
          : null,
      }}
    >
      <Form.Item
        name="customerId"
        label="Müşteri"
        rules={[{ required: true, message: "Lütfen bir müşteri seçiniz!" }]}
      >
        <Select
          placeholder="Müşteri Seçiniz"
          defaultValue={initialValues?.supplierId}
          options={customers.map((customer) => ({
            label: customer.companyName,
            value: customer._id,
          }))}
        />
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
                  <Select
                    mode="multiple"
                    placeholder="Ürün Seç"
                    options={products.map((product) => ({
                      label: product.name,
                      value: product._id,
                    }))}
                  />
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
