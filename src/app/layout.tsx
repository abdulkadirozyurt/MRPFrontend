"use client";

import "./global.scss";
import { Provider } from "react-redux";
import store from "@/utilities/redux/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Footer from "@/components/landing-layout-components/Footer";
import Header from "@/components/landing-layout-components/Header";
import { usePathname } from "next/navigation";
import { ConfigProvider } from "antd";
import '@ant-design/v5-patch-for-react-19';

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const isMrpRoute = pathname.includes("/app");

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>flowMRP</title>
      </head>
      <body className="">
        {isMrpRoute ? (
          <Provider store={store}>
            <AntdRegistry>
              <ConfigProvider>{children}</ConfigProvider>
            </AntdRegistry>
          </Provider>
        ) : (
          <Provider store={store}>
            <AntdRegistry>
              <ConfigProvider>
                <div className="flex flex-col h-screen">
                  <Header />

                  <div className="flex-grow flex flex-col p-8 w-full items-center justify-center">{children}</div>

                  <Footer />
                </div>
              </ConfigProvider>
            </AntdRegistry>
          </Provider>
        )}
      </body>
    </html>
  );
}
