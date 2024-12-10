"use client";

import { Button, Form, Input } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { register, resetRegistrationState } from "@/utilities/redux/slices/authSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { useEffect } from "react";
import DoneRegister from "./doneRegister";

export default function RegisterForm() {
  const dispatch: AppDispatch = useDispatch();
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const authError = useSelector((state: RootState) => state.auth.error);
  const isRegistered = useSelector((state: RootState) => state.auth.isRegistered);

  useEffect(() => {
    if (isRegistered) {
      // Kayıt işlemi tamamlandığında onay mesajını gösterelim
      // alert("Kayıt işlemi başarılı! Giriş yapmak için buraya tıklayın.");
      // dispatch(resetRegistrationState());
    }
  }, [isRegistered, dispatch]);

  const onFinish = (values: any) => {
    console.log("Alınan değerler:", values);
    dispatch(
      register({
        firstname: values.firstname,
        lastname: values.lastname,
        email: values.email,
        password: values.confirmPassword,
      })
    );
  };

  return (
    <>
      {isRegistered ? (
        <DoneRegister />
      ) : (
        <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-md">
          <h2 className="text-2xl font-bold text-center mb-6">Kayıt Ol</h2>
          <Form name="registerForm" layout="vertical" onFinish={onFinish}>
            <Form.Item
              name="firstname"
              label="Ad"
              rules={[{ required: true, message: "Lütfen adınızı giriniz!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Adınızı giriniz" />
            </Form.Item>

            <Form.Item
              name="lastname"
              label="Soyad"
              rules={[{ required: true, message: "Lütfen soyadınızı giriniz!" }]}
            >
              <Input prefix={<UserOutlined />} placeholder="Soyadınızı giriniz" />
            </Form.Item>

            <Form.Item
              name="email"
              label="E-posta"
              rules={[
                { required: true, message: "Lütfen e-posta adresinizi giriniz!" },
                { type: "email", message: "Geçerli bir e-posta adresi giriniz!" },
              ]}
            >
              <Input prefix={<MailOutlined />} placeholder="E-posta adresinizi giriniz" />
            </Form.Item>

            <Form.Item
              name="password"
              label="Şifre"
              rules={[
                { required: true, message: "Lütfen şifrenizi giriniz!" },
                {
                  pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
                  message:
                    "Şifre en az 8 karakter uzunluğunda ve büyük harf, küçük harf, rakam ve özel karakter içermelidir!",
                },
              ]}
              hasFeedback
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Şifrenizi giriniz" />
            </Form.Item>

            <Form.Item
              name="confirmPassword"
              label="Şifre Tekrar"
              dependencies={["password"]}
              hasFeedback
              rules={[
                { required: true, message: "Lütfen şifrenizi tekrar giriniz!" },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error("Şifreler eşleşmiyor!"));
                  },
                }),
              ]}
            >
              <Input.Password prefix={<LockOutlined />} placeholder="Şifrenizi tekrar giriniz" />
            </Form.Item>

            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                className="w-full"
                disabled={authStatus === "loading"}
              >
                Kayıt Ol
              </Button>
            </Form.Item>
          </Form>
        </div>
      )}
    </>
  );
}
