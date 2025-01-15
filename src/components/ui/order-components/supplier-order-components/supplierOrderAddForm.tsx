"use client";

import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { addSupplierOrder } from "@/utilities/redux/slices/supplierOrderSlice";
import { fetchSuppliers, fetchSuppliersByMaterial } from "@/utilities/redux/slices/supplierSlice";
import { fetchMaterials, fetchMaterialsBySupplier } from "@/utilities/redux/slices/materialSlice";
import { Button, Form, InputNumber, Select, DatePicker } from "antd";
import { useEffect, useState } from "react";

const { Option } = Select;

interface SupplierOrderAddFormProps {
  onSuccess: () => void;
  initialValues?: any;
}

export default function SupplierOrderAddForm({ onSuccess, initialValues }: SupplierOrderAddFormProps) {
  const dispatch: AppDispatch = useDispatch();
  const supplierOrderStatus = useSelector((state: RootState) => state.supplierOrders.status);
  const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
  const materials = useSelector((state: RootState) => state.material.materials);
  const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);

  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchSuppliers());
    dispatch(fetchMaterials());
  }, [dispatch]);

  const handleMaterialChange = (materialId: string) => {
    setSelectedMaterialId(materialId);
    dispatch(fetchSuppliersByMaterial(materialId));
  };

  const handleSupplierChange = (supplierId: string) => {
    dispatch(fetchMaterialsBySupplier(supplierId));
  };

  const onFinish = async (values: any) => {
    const utcDeliveryDate = values.deliveryDate ? values.deliveryDate.utc().format() : null;
    const supplierOrderData = {
      ...values,
      deliveryDate: utcDeliveryDate,
      materials: values.materials.map((item: any) => ({
        materialId: item.materialId,
        quantity: item.quantity,
      })),
    };

    try {
      await dispatch(addSupplierOrder(supplierOrderData)).unwrap();
      form.resetFields();
      onSuccess();
    } catch (error) {
      console.error("Tedarikçi siparişi eklenirken hata oluştu:", error);
    }
  };

  return (
    <Form form={form} onFinish={onFinish} layout="vertical" initialValues={initialValues}>
      <Form.Item
        name="materialId"
        label="Malzeme"
        rules={[{ required: true, message: "Lütfen bir malzeme seçiniz!" }]}
      >
        <Select placeholder="Malzeme Seçiniz" onChange={handleMaterialChange}>
          {materials.map((material) => (
            <Option key={material._id} value={material._id}>
              {material.name}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.Item
        name="supplierId"
        label="Tedarikçi"
        rules={[{ required: true, message: "Lütfen bir tedarikçi seçiniz!" }]}
      >
        <Select
          placeholder="Tedarikçi Seçiniz"
          disabled={!selectedMaterialId}
          onChange={handleSupplierChange}
        >
          {suppliers.map((supplier) => (
            <Option key={supplier._id} value={supplier._id}>
              {supplier.companyName}
            </Option>
          ))}
        </Select>
      </Form.Item>

      <Form.List name="materials">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <div key={key} className="flex gap-4 mb-2">
                <Form.Item
                  {...restField}
                  name={[name, "materialId"]}
                  fieldKey={[fieldKey, "materialId"] as number[]}
                  rules={[{ required: true, message: "Malzeme seçiniz!" }]}
                  className="flex-1"
                >
                  <Select placeholder="Malzeme Seçiniz">
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
                + Malzeme Ekle
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
        <DatePicker className="w-full" showTime />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" loading={supplierOrderStatus === "loading"}>
          Ekle
        </Button>
      </Form.Item>
    </Form>
  );
}





// "use client";

// import { useDispatch, useSelector } from "react-redux";
// import { AppDispatch, RootState } from "@/utilities/redux/store";
// import { addSupplierOrder } from "@/utilities/redux/slices/supplierOrderSlice";
// import { fetchSuppliers, fetchSuppliersByMaterial } from "@/utilities/redux/slices/supplierSlice";
// import { fetchMaterials, fetchMaterialsBySupplier } from "@/utilities/redux/slices/materialSlice";
// import { Button, Form, InputNumber, Select, DatePicker } from "antd";
// import { useEffect, useState } from "react";

// const { Option } = Select;

// interface SupplierOrderAddFormProps {
//   onSuccess: () => void;
//   initialValues?: any;
// }

// export default function SupplierOrderAddForm({ onSuccess, initialValues }: SupplierOrderAddFormProps) {
//   const dispatch: AppDispatch = useDispatch();
//   const supplierOrderStatus = useSelector((state: RootState) => state.supplierOrders.status);
//   const suppliers = useSelector((state: RootState) => state.supplier.suppliers);
//   const materials = useSelector((state: RootState) => state.material.materials);
//   const [selectedSupplier, setSelectedSupplier] = useState<string | null>(null);
//   const [selectedMaterialId, setSelectedMaterialId] = useState<string | null>(null);

//   const [form] = Form.useForm();

//   useEffect(() => {
//     dispatch(fetchSuppliers());
//     dispatch(fetchMaterials());
//   }, [dispatch]);

//   const handleSupplierChange = (supplierId: string) => {
//     setSelectedSupplier(supplierId);
//     dispatch(fetchMaterialsBySupplier(supplierId));
//   };

//   const handleMaterialChange = (materialId: string) => {
//     setSelectedMaterialId(materialId);
//     dispatch(fetchSuppliersByMaterial(materialId));
//   };

//   const onFinish = async (values: any) => {
//     const utcDeliveryDate = values.deliveryDate ? values.deliveryDate.utc().format() : null;
//     const supplierOrderData = {
//       ...values,
//       deliveryDate: utcDeliveryDate,
//       materials: values.materials.map((item: any) => ({
//         materialId: item.materialId,
//         quantity: item.quantity,
//       })),
//     };

//     try {
//       await dispatch(addSupplierOrder(supplierOrderData)).unwrap();
//       form.resetFields();
//       onSuccess();
//     } catch (error) {
//       console.error("Tedarikçi siparişi eklenirken hata oluştu:", error);
//     }
//   };

//   return (
//     <Form form={form} onFinish={onFinish} layout="vertical" initialValues={initialValues}>
//       <Form.Item name="supplierId" label="Tedarikçi" rules={[{ required: true, message: "Lütfen bir tedarikçi seçiniz!" }]}>
//         <Select placeholder="Tedarikçi Seçiniz" onChange={handleSupplierChange}>
//           {suppliers.map((supplier) => (
//             <Option key={supplier._id} value={supplier._id}>
//               {supplier.companyName}
//             </Option>
//           ))}
//         </Select>
//       </Form.Item>

//       <Form.List name="materials">
//         {(fields, { add, remove }) => (
//           <>
//             {fields.map(({ key, name, fieldKey, ...restField }) => (
//               <div key={key} className="flex gap-4 mb-2">
//                 <Form.Item
//                   {...restField}
//                   name={[name, "materialId"]}
//                   fieldKey={[fieldKey, "materialId"] as number[]}
//                   rules={[{ required: true, message: "Malzeme seçiniz!" }]}
//                   className="flex-1"
//                 >
//                   <Select placeholder="Malzeme Seçiniz" onChange={handleMaterialChange}>
//                     {materials.map((material) => (
//                       <Option key={material._id} value={material._id}>
//                         {material.name}
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
//                 + Malzeme Ekle
//               </Button>
//             </Form.Item>
//           </>
//         )}
//       </Form.List>

//       <Form.Item name="deliveryDate" label="Teslim Tarihi" rules={[{ required: true, message: "Lütfen teslim tarihini giriniz!" }]}>
//         <DatePicker className="w-full" showTime />
//       </Form.Item>

//       <Form.Item>
//         <Button type="primary" htmlType="submit" loading={supplierOrderStatus === "loading"}>
//           Ekle
//         </Button>
//       </Form.Item>
//     </Form>
//   );
// }
