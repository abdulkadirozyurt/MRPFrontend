"use client";

import { Button, Form, Input, InputNumber, Select } from "antd";
import { fetchUsers } from "@/utilities/redux/slices/userSlice";
import { updateWarehouse } from "@/utilities/redux/slices/warehouseSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const { Option } = Select;

export default function UpdateWarehouseForm({
  onSuccess,
  onUpdate,
  initialValues,
}: {
  onSuccess: () => void;
  onUpdate: (values: any) => void;
  initialValues: any;
}) {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const warehouseStatus = useSelector((state: RootState) => state.warehouse.status);

  const onFinish = async (values: any) => {
    const updatedWarehouse = { ...initialValues, ...values };
    await onUpdate(updatedWarehouse);
    onSuccess();
  };

  useEffect(() => {
    dispatch(fetchUsers()); // Kullanıcıları çekiyoruz
    form.resetFields();
  }, [dispatch, form, initialValues]);

  //   useEffect(() => {
  //     if (initialValues) {
  //       const managerId = initialValues.managerId?._id || initialValues.managerId; // Hem ID hem nesne kontrolü
  //       form.setFieldsValue({ ...initialValues, managerId });
  //     }
  //   }, [initialValues, form]);

  return (
    <>
      <h2>Depo Düzenle</h2>
      <Form
        className="flex flex-col justify-between"
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={{ ...initialValues, managerId: initialValues.managerId?._id }}
      >
        <Form.Item name="name" label="Depo Adı" rules={[{ required: true, message: "Lütfen depo adını giriniz!" }]}>
          <Input placeholder="Depo adı" />
        </Form.Item>

        <Form.Item name="location" label="Konum" rules={[{ required: true, message: "Lütfen konum giriniz!" }]}>
          <Input placeholder="Konum" />
        </Form.Item>

        <Form.Item name="capacity" label="Kapasite" rules={[{ required: true, message: "Lütfen kapasiteyi giriniz!" }]}>
          <InputNumber placeholder="Kapasite" min={1} className="!w-full" />
        </Form.Item>

        <Form.Item name="description" label="Açıklama">
          <Input.TextArea placeholder="Depo açıklaması" />
        </Form.Item>

        <Form.Item name="managerId" label="Yönetici" rules={[{ required: true, message: "Lütfen bir yönetici seçiniz!" }]}>
          <Select
            mode="multiple"
            placeholder="Yönetici Seç"
            options={users.map((user) => ({ label: `${user.firstname} ${user.lastname}`, value: user._id }))}
            value={initialValues.managerId?._id || initialValues.managerId}
          />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" loading={warehouseStatus === "loading"}>
            Güncelle
          </Button>
        </Form.Item>
      </Form>
    </>
  );
}

// "use client";

// import IWarehouse from "@/models/warehouse/IWarehouse";
// import { updateWarehouse } from "@/utilities/redux/slices/warehouseSlice";
// import { AppDispatch, RootState } from "@/utilities/redux/store";
// import { Button, Form, Input, InputNumber } from "antd";
// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";

// export default function UpdateWarehouseForm({
//   onSuccess,
//   onUpdate,
//   initialValues,
// }: {
//   onSuccess: () => void;
//   onUpdate: (values: IWarehouse) => void;
//   initialValues: IWarehouse | null;
// }) {
//   const [form] = Form.useForm<IWarehouse>();
//   const dispatch: AppDispatch = useDispatch();
//   const warehouseStatus = useSelector((state: RootState) => state.warehouse.status);

//   const onFinish = async (values: IWarehouse) => {
//     const updatedWarehouse = { ...initialValues, ...values };
//     await onUpdate(updatedWarehouse);
//     form.resetFields();
//     onSuccess();
//   };

//   useEffect(() => {
//     form.resetFields();
//   }, [initialValues]);

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-center mb-4">Depo Güncelle</h2>
//       <Form
//         form={form}
//         layout="vertical"
//         onFinish={onFinish}
//         initialValues={initialValues || undefined}
//       >
//         <Form.Item
//           name="name"
//           label="Depo Adı"
//           rules={[{ required: true, message: "Lütfen depo adını giriniz!" }]}
//         >
//           <Input placeholder="Depo adı" />
//         </Form.Item>

//         <Form.Item
//           name="location"
//           label="Konum"
//           rules={[{ required: true, message: "Lütfen konum bilgisi giriniz!" }]}
//         >
//           <Input placeholder="Konum" />
//         </Form.Item>

//         <Form.Item
//           name="capacity"
//           label="Kapasite"
//           rules={[{ required: true, message: "Lütfen kapasite giriniz!" }]}
//         >
//           <InputNumber min={1} placeholder="Kapasite" className="w-full" />
//         </Form.Item>

//         <Form.Item
//           name="description"
//           label="Açıklama"
//           rules={[{ type: "string", message: "Lütfen geçerli bir metin giriniz." }]}
//         >
//           <Input.TextArea placeholder="Açıklama" />
//         </Form.Item>

//         <div className="flex justify-center">
//           <Button
//             type="primary"
//             htmlType="submit"
//             className="w-1/2"
//             loading={warehouseStatus === "loading"}
//           >
//             Güncelle
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// }
