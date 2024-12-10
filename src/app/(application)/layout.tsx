"use client";

import "./global.scss";
import { Provider } from "react-redux";
import styles from "./layout.module.scss";
import Navbar from "@/components/ui/navbar";
import store from "@/utilities/redux/store";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import Topbar from "@/components/ui/topbar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>flowMRP</title>
      </head>
      <body className={`antialiased`}>
        <Provider store={store}>
          <AntdRegistry>
            <div className={styles.container}>
              <Topbar />
              <Navbar />
              <div className={styles.content}>{children}a</div>
            </div>
          </AntdRegistry>
        </Provider>
      </body>
    </html>
  );
}



