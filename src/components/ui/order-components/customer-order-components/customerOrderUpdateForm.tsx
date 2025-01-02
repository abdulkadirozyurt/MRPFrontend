import { ICustomerOrder } from "@/models/order/ICustomerOrder";
import { toLocalTime, toUTC } from "@/utilities/dates/datetime-util";
import { Button, DatePicker, Form, Input, Select } from "antd";

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

  const onFinish = async (values: any) => {
    const utcDeliveryDate = values.deliveryDate ? toUTC(values.deliveryDate) : null;
    const updatedOrder = { ...initialValues, ...values, deliveryDate: utcDeliveryDate };
    await onUpdate(updatedOrder);
    form.resetFields();
    onSuccess();
  };

  return (
    <Form
      form={form}
      layout="vertical"
      onFinish={onFinish}
      initialValues={{
        ...initialValues,
        deliveryDate: initialValues.deliveryDate ? new Date(initialValues.deliveryDate) : null,
      }}
    >
      <Form.Item name="deliveryAddress" label="Teslimat Adresi" rules={[{ required: true, message: "Zorunlu alan" }]}>
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
          format={(value) => toLocalTime(value.toString())}
          onChange={(date) => form.setFieldsValue({ deliveryDate: date ? date.toISOString() : null })}
        />
      </Form.Item>

      <Form.Item name="status" label="Durum" rules={[{ required: true, message: "Zorunlu alan" }]}>
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
