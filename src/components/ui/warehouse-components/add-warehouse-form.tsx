"use client";

import { Button, Form, Input, InputNumber, Select } from "antd";
import { fetchUsers } from "@/utilities/redux/slices/userSlice";
import { addWarehouse } from "@/utilities/redux/slices/warehouseSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

const { Option } = Select;

export default function AddWarehouseForm({ onSuccess }: { onSuccess: () => void }) {
  const [form] = Form.useForm();
  const dispatch: AppDispatch = useDispatch();
  const users = useSelector((state: RootState) => state.user.users);
  const warehouseStatus = useSelector((state: RootState) => state.warehouse.status);

  const onFinish = async (values: any) => {
    try {
      await dispatch(addWarehouse(values)).unwrap();
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error("Depo eklenirken hata oluştu:", error);
    }
  };

  useEffect(() => {
    dispatch(fetchUsers()); // Kullanıcıları çekiyoruz
  }, [dispatch]);

  return (
    <Form form={form} layout="vertical" onFinish={onFinish}>
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
        //   mode=""
          placeholder="Yönetici Seç"
          options={users.map((user) => ({ label: `${user.firstname} ${user.lastname}`, value: user._id }))}
        />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={warehouseStatus === "loading"}>
          Ekle
        </Button>
      </Form.Item>
    </Form>
  );
}

// "use client";

// import IWarehouse from "@/models/warehouse/IWarehouse";
// import { addWarehouse } from "@/utilities/redux/slices/warehouseSlice";
// import { AppDispatch, RootState } from "@/utilities/redux/store";
// import { Button, Form, Input, InputNumber } from "antd";
// import { useDispatch, useSelector } from "react-redux";

// export default function AddWarehouseForm({ onSuccess }: { onSuccess: () => void }) {
//   const [form] = Form.useForm<IWarehouse>();
//   const dispatch: AppDispatch = useDispatch();
//   const warehouseStatus = useSelector((state: RootState) => state.warehouse.status);

//   const onFinish = async (values: IWarehouse) => {
//     try {
//       await dispatch(addWarehouse(values)).unwrap();
//       form.resetFields();
//       onSuccess();
//     } catch (error) {
//       console.error("Depo ekleme hatası:", error);
//     }
//   };

//   return (
//     <div>
//       <h2 className="text-2xl font-bold text-center mb-4">Yeni Depo Ekle</h2>
//       <Form form={form} layout="vertical" onFinish={onFinish}>
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
//             Ekle
//           </Button>
//         </div>
//       </Form>
//     </div>
//   );
// }
