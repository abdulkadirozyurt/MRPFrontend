// // "use client";

// // import { AppDispatch, RootState } from "@/utilities/redux/store";
// // import { Button, Form, FormInstance, Input, Select } from "antd";
// // import { useDispatch, useSelector } from "react-redux";

// // export default function AddSupplierForm({
// //   onSuccess,
// //   onSave,
// //   initialValues = {},
// //   mode = "add",
// // }: {
// //   onSuccess: () => void;
// //   onSave: (values: any) => void;
// //   initialValues?: any;
// //   mode: "add" | "edit";
// // }) {
// //   const [form] = Form.useForm<FormInstance>();
// //   const dispatch: AppDispatch = useDispatch();
// //   const supplierStatus = useSelector((state: RootState) => state.supplier.status);

// //   const onFinish = async (values: any) => {
// //     try {
// //       await onSave(values);
// //       form.resetFields();
// //       onSuccess();
// //     } catch (error: any) {
// //       console.error("Tedarikçi işlemi sırasında hata oluştu:", error);
// //     }
// //   };

// //   return (
// //     <>
// //       <h2 className="text-2xl font-bold text-center mb-6">{mode === "add" ? "Yeni Tedarikçi Ekle" : "Tedarikçi Güncelle"}</h2>
// //       <Form
// //         className="flex flex-col justify-between"
// //         form={form}
// //         name="addSupplierForm"
// //         layout="vertical"
// //         onFinish={onFinish}
// //         initialValues={initialValues}
// //       >
// //         <div className="container flex flex-col px-6 md:mx-auto md:px-12 md:flex-row md:justify-center md:gap-5">
// //           <div className="w-full md:w-3/5">
// //             <Form.Item
// //               name="_id"
// //               label="ID"
// //               rules={[{ required: true, message: "Lütfen ID giriniz!" }]}
// //               hidden={mode === "add"}
// //             >
// //               <Input placeholder="ID giriniz" />
// //             </Form.Item>

// //             <Form.Item
// //               name="companyName"
// //               label="Tedarikçi Adı"
// //               rules={[{ required: true, message: "Lütfen tedarikçi adını giriniz!" }]}
// //             >
// //               <Input placeholder="Tedarikçi adını giriniz" />
// //             </Form.Item>

// //             <Form.Item
// //               name="contactName"
// //               label="Yetkili Adı"
// //               rules={[{ required: true, message: "Yetkili kişi adını giriniz!" }]}
// //             >
// //               <Input placeholder="Yetkili adını giriniz" />
// //             </Form.Item>

// //             <Form.Item
// //               name="contactTitle"
// //               label="Yetkili Ünvanı"
// //               rules={[{ required: true, message: "Lütfen yetkili ünvanını giriniz!" }]}
// //             >
// //               <Input placeholder="Yetkili ünvanını giriniz" />
// //             </Form.Item>

// //             <Form.Item name="phone" label="Telefon" rules={[{ required: true, message: "Lütfen telefon numarasını giriniz!" }]}>
// //               <Input placeholder="+90xxxxxxxxxx" />
// //             </Form.Item>
// //           </div>
// //           <div className="w-full md:w-3/5">
// //             <Form.Item name="city" label="Şehir" rules={[{ required: true, message: "Lütfen şehri giriniz!" }]}>
// //               <Input placeholder="Şehir giriniz" />
// //             </Form.Item>

// //             <Form.Item name="country" label="Ülke" rules={[{ required: true, message: "Lütfen ülkeyi giriniz!" }]}>
// //               <Input placeholder="Ülke giriniz" />
// //             </Form.Item>

// //             <Form.Item name="address" label="Adres" rules={[{ required: true, message: "Lütfen adresi giriniz!" }]}>
// //               <Input placeholder="Adres giriniz" />
// //             </Form.Item>

// //             <Form.Item name="materialsOfSupplied" label="Tedarik Edilen Malzemeler">
// //               <Select
// //                 mode="multiple"
// //                 placeholder="Malzemeleri Seçiniz"
// //                 options={materials.map((material) => ({
// //                   label: material.name,
// //                   value: material._id,
// //                 }))}
// //               />
// //             </Form.Item>

// //             <Form.Item
// //               name="email"
// //               label="E-posta"
// //               rules={[
// //                 { required: true, message: "Lütfen e-posta adresini giriniz!" },
// //                 { type: "email", message: "Geçerli bir e-posta adresi giriniz!" },
// //               ]}
// //             >
// //               <Input placeholder="E-posta adresini giriniz" />
// //             </Form.Item>
// //           </div>
// //         </div>

// //         <div className="flex items-center justify-center">
// //           <Button type="primary" htmlType="submit" className="w-2/4" loading={supplierStatus === "loading"}>
// //             {mode === "add" ? "Ekle" : "Güncelle"}
// //           </Button>
// //         </div>
// //       </Form>
// //     </>
// //   );
// // }

// "use client";

// import { fetchMaterials } from "@/utilities/redux/slices/materialSlice";
// import { AppDispatch, RootState } from "@/utilities/redux/store";
// import { Button, Form, FormInstance, Input, Select } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";

// export default function AddSupplierForm({
//   onSuccess,
//   onSave,
//   initialValues = {},
//   mode = "add",
// }: {
//   onSuccess: () => void;
//   onSave: (values: any) => void;
//   initialValues?: any;
//   mode: "add" | "edit";
// }) {
//   const [form] = Form.useForm<FormInstance>();
//   const dispatch: AppDispatch = useDispatch();
//   const supplierStatus = useSelector((state: RootState) => state.supplier.status);
//   const materials = useSelector((state: RootState) => state.material.materials);

//   useEffect(() => {
//     dispatch(fetchMaterials());
//   }, [dispatch]);

//   const onFinish = async (values: any) => {
//     try {
//       await onSave(values);
//       form.resetFields();
//       onSuccess();
//     } catch (error: any) {
//       console.error("Tedarikçi işlemi sırasında hata oluştu:", error);
//     }
//   };

//   return (
//     <>
//       <h2 className="text-2xl font-bold text-center mb-6">{mode === "add" ? "Yeni Tedarikçi Ekle" : "Tedarikçi Güncelle"}</h2>
//       <Form
//         className="flex flex-col justify-between"
//         form={form}
//         name="addSupplierForm"
//         layout="vertical"
//         onFinish={onFinish}
//         initialValues={initialValues}
//       >
//         <div className="container flex flex-col px-6 md:mx-auto md:px-12 md:flex-row md:justify-center md:gap-5">
//           <div className="w-full md:w-3/5">
//             <Form.Item
//               name="companyName"
//               label="Tedarikçi Adı"
//               rules={[{ required: true, message: "Lütfen tedarikçi adını giriniz!" }]}
//             >
//               <Input placeholder="Tedarikçi adını giriniz" />
//             </Form.Item>

//             <Form.Item
//               name="contactName"
//               label="Yetkili Adı"
//               rules={[{ required: true, message: "Yetkili kişi adını giriniz!" }]}
//             >
//               <Input placeholder="Yetkili adını giriniz" />
//             </Form.Item>

//             <Form.Item
//               name="contactTitle"
//               label="Yetkili Ünvanı"
//               rules={[{ required: true, message: "Lütfen yetkili ünvanını giriniz!" }]}
//             >
//               <Input placeholder="Yetkili ünvanını giriniz" />
//             </Form.Item>

//             <Form.Item name="phone" label="Telefon" rules={[{ required: true, message: "Lütfen telefon numarasını giriniz!" }]}>
//               <Input placeholder="+90xxxxxxxxxx" />
//             </Form.Item>
//           </div>
//           <div className="w-full md:w-3/5">
//             <Form.Item name="city" label="Şehir" rules={[{ required: true, message: "Lütfen şehri giriniz!" }]}>
//               <Input placeholder="Şehir giriniz" />
//             </Form.Item>

//             <Form.Item name="country" label="Ülke" rules={[{ required: true, message: "Lütfen ülkeyi giriniz!" }]}>
//               <Input placeholder="Ülke giriniz" />
//             </Form.Item>

//             <Form.Item name="address" label="Adres" rules={[{ required: true, message: "Lütfen adresi giriniz!" }]}>
//               <Input placeholder="Adres giriniz" />
//             </Form.Item>

//             <Form.Item name="materialsOfSupplied" label="Tedarik Edilen Malzemeler">
//               <Select
//                 mode="multiple"
//                 placeholder="Malzemeleri Seçiniz"
//                 options={materials.map((material) => ({
//                   label: material.name,
//                   value: material._id,
//                 }))}
//               />
//             </Form.Item>

//             <Form.Item
//               name="email"
//               label="E-posta"
//               rules={[
//                 { required: true, message: "Lütfen e-posta adresini giriniz!" },
//                 { type: "email", message: "Geçerli bir e-posta adresi giriniz!" },
//               ]}
//             >
//               <Input placeholder="E-posta adresini giriniz" />
//             </Form.Item>
//           </div>
//         </div>

//         <div className="flex items-center justify-center">
//           <Button type="primary" htmlType="submit" className="w-2/4" loading={supplierStatus === "loading"}>
//             {mode === "add" ? "Ekle" : "Güncelle"}
//           </Button>
//         </div>
//       </Form>
//     </>
//   );
// }



// "use client";

// import { addSupplier } from "@/utilities/redux/slices/supplierSlice";
// import { AppDispatch, RootState } from "@/utilities/redux/store";
// import { Button, Form, Input, Select } from "antd";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
// import { fetchMaterials } from "@/utilities/redux/slices/materialSlice";

// export default function AddSupplierForm({ onSuccess }: { onSuccess: () => void }) {
//   const [form] = Form.useForm();
//   const dispatch: AppDispatch = useDispatch();
//   const materials = useSelector((state: RootState) => state.material.materials);
//   const supplierStatus = useSelector((state: RootState) => state.supplier.status);

//   useEffect(() => {
//     dispatch(fetchMaterials());
//   }, [dispatch]);

//   const onFinish = async (values: any) => {
//     try {
//       await dispatch(addSupplier(values)).unwrap();
//       form.resetFields();
//       onSuccess();
//     } catch (error) {
//       console.error("Tedarikçi eklenirken hata oluştu:", error);
//     }
//   };

//   return (
//     <Form
//       form={form}
//       layout="vertical"
//       onFinish={onFinish}
//       className="flex flex-col justify-between"
//     >
//       <h2 className="text-2xl font-bold text-center mb-6">Yeni Tedarikçi Ekle</h2>
//       <Form.Item
//         name="companyName"
//         label="Tedarikçi Adı"
//         rules={[{ required: true, message: "Lütfen tedarikçi adını giriniz!" }]}
//       >
//         <Input placeholder="Tedarikçi adını giriniz" />
//       </Form.Item>
//       <Form.Item
//         name="contactName"
//         label="Yetkili Adı"
//         rules={[{ required: true, message: "Lütfen yetkili adını giriniz!" }]}
//       >
//         <Input placeholder="Yetkili adını giriniz" />
//       </Form.Item>
//       <Form.Item name="materialsOfSupplied" label="Tedarik Edilen Malzemeler">
//         <Select
//           mode="multiple"
//           placeholder="Malzemeleri Seçiniz"
//           options={materials.map((material) => ({
//             label: material.name,
//             value: material._id,
//           }))}
//         />
//       </Form.Item>
//       <Button type="primary" htmlType="submit" className="w-full" loading={supplierStatus === "loading"}>
//         Ekle
//       </Button>
//     </Form>
//   );
// }

"use client";

import { addSupplier } from "@/utilities/redux/slices/supplierSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { Button, Form, FormInstance, Input, Select } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { fetchMaterials } from "@/utilities/redux/slices/materialSlice";
import { useEffect } from "react";

export default function SupplierAddForm({ onSuccess }: { onSuccess: () => void }) {
  const [form] = Form.useForm<FormInstance>();
  const dispatch: AppDispatch = useDispatch();
  const supplierStatus = useSelector((state: RootState) => state.supplier.status);
  const materials = useSelector((state: RootState) => state.material.materials);

  useEffect(() => {
    dispatch(fetchMaterials());
  }, [dispatch]);

  const onFinish = async (values: any) => {
    try {
      await dispatch(addSupplier(values)).unwrap();
      form.resetFields();
      onSuccess();
    } catch (error: any) {
      console.error("Tedarikçi ekleme sırasında hata oluştu:", error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold text-center mb-6">Yeni Tedarikçi Ekle</h2>
      <Form
        className="flex flex-col justify-between"
        form={form}
        name="addSupplierForm"
        layout="vertical"
        onFinish={onFinish}
      >
        <div className="container flex flex-col px-6 md:mx-auto md:px-12 md:flex-row md:justify-center md:gap-5">
          <div className="w-full md:w-3/5">
            <Form.Item
              name="companyName"
              label="Tedarikçi Adı"
              rules={[{ required: true, message: "Lütfen tedarikçi adını giriniz!" }]}
            >
              <Input placeholder="Tedarikçi adını giriniz" />
            </Form.Item>

            <Form.Item
              name="contactName"
              label="Yetkili Adı"
              rules={[{ required: true, message: "Yetkili kişi adını giriniz!" }]}
            >
              <Input placeholder="Yetkili adını giriniz" />
            </Form.Item>

            <Form.Item
              name="contactTitle"
              label="Yetkili Ünvanı"
              rules={[{ required: true, message: "Lütfen yetkili ünvanını giriniz!" }]}
            >
              <Input placeholder="Yetkili ünvanını giriniz" />
            </Form.Item>

            <Form.Item name="phone" label="Telefon" rules={[{ required: true, message: "Lütfen telefon numarasını giriniz!" }]}>
              <Input placeholder="+90xxxxxxxxxx" />
            </Form.Item>
          </div>
          <div className="w-full md:w-3/5">
            <Form.Item name="city" label="Şehir" rules={[{ required: true, message: "Lütfen şehri giriniz!" }]}>
              <Input placeholder="Şehir giriniz" />
            </Form.Item>

            <Form.Item name="country" label="Ülke" rules={[{ required: true, message: "Lütfen ülkeyi giriniz!" }]}>
              <Input placeholder="Ülke giriniz" />
            </Form.Item>

            <Form.Item name="address" label="Adres" rules={[{ required: true, message: "Lütfen adresi giriniz!" }]}>
              <Input placeholder="Adres giriniz" />
            </Form.Item>

            <Form.Item name="materialsOfSupplied" label="Tedarik Edilen Malzemeler">
              <Select
                mode="multiple"
                placeholder="Malzemeleri Seçiniz"
                options={materials.map((material) => ({
                  label: material.name,
                  value: material._id,
                }))}
              />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-posta"
              rules={[
                { required: true, message: "Lütfen e-posta adresini giriniz!" },
                { type: "email", message: "Geçerli bir e-posta adresi giriniz!" },
              ]}
            >
              <Input placeholder="E-posta adresini giriniz" />
            </Form.Item>
          </div>
        </div>

        <div className="flex items-center justify-center">
          <Button type="primary" htmlType="submit" className="w-2/4" loading={supplierStatus === "loading"}>
            Ekle
          </Button>
        </div>
      </Form>
    </>
  );
}
