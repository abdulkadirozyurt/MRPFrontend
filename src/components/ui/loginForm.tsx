"use client";

import React, { useState } from "react";
import { Button, Checkbox, Form, Input } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { login } from "@/utilities/redux/slices/authSlice";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const authStatus = useSelector((state: RootState) => state.auth.status);
  const authError = useSelector((state: RootState) => state.auth.error);

  const onFinish = (values: any) => {
    console.log("Success:", values);

    dispatch(login({ email: values.email, password: values.password }));
  };

  return (
    <div className="w-full max-w-md bg-white p-8 rounded-3xl shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Giriş Yap</h2>
      <Form
        name="loginForm"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          label="E-Posta"
          rules={[
            { required: true, message: "Lütfen e-posta adresinizi giriniz!" },
            { type: "email", message: "Geçerli bir e-posta adresi giriniz!" },
          ]}
        >
          <Input prefix={<MailOutlined />} placeholder="E-posta adresinizi giriniz" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Parola"
          rules={[{ required: true, message: "Lütfen şifrenizi giriniz!" }]}
          hasFeedback
        >
          <Input.Password prefix={<LockOutlined />} placeholder="Şifrenizi giriniz" />
        </Form.Item>

        <Form.Item>
          <div className="flex items-center justify-between">
            <Form.Item name="remember" valuePropName="checked" noStyle>
              <Checkbox>Beni Hatırla</Checkbox>
            </Form.Item>
            <a className="text-blue-500 hover:text-blue-700" href="/forgot-password">
              Şifreni mi unuttun?
            </a>
          </div>
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" disabled={authStatus==="loading"}>
            Giriş yap
          </Button>
        </Form.Item>
      </Form>
      <div className="text-center mt-4">
        Hesabınız yok mu?{" "}
        <a href="/auth/register" className="text-blue-500 hover:text-blue-700">
          Şimdi kaydolun!
        </a>
      </div>
    </div>
  );
}
