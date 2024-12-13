"use client";

// import "./global.scss";
import { Provider } from "react-redux";
import styles from "./layout.module.scss";
import Navbar from "@/components/ui/layout-components/navbar";
import store from "@/utilities/redux/store";
import Topbar from "@/components/ui/layout-components/topbar";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import ProtectedRoute from "@/components/ProtectedRoute";

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

            <ProtectedRoute>
            <div className={styles.container}>
              <Topbar />
              <Navbar />
              <div className={styles.content}>{children}a</div>
            </div>
            </ProtectedRoute>

          </AntdRegistry>
        </Provider>
      </body>
    </html>
  );
}

// "use client";

// // import "./global.scss";
// import { Provider } from "react-redux";
// import styles from "./layout.module.scss";
// import Navbar from "@/components/ui/layout-components/navbar";
// import store from "@/utilities/redux/store";
// import Topbar from "@/components/ui/layout-components/topbar";
// import { AntdRegistry } from "@ant-design/nextjs-registry";
// import ProtectedRoute from "@/components/ProtectedRoute";

// export default function ApplicationLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <div className={`antialiased w-full`}>
//       {/* <Provider store={store}>
//         <AntdRegistry>
         
//         </AntdRegistry>
//       </Provider> */}
//       <ProtectedRoute>
//         {/* <div className={styles.container}>
          
//         </div> */}
//         <Topbar />
//         <Navbar />
//         <div className={styles.content}>{children}</div>
//       </ProtectedRoute>
//     </div>
//   );
// }
