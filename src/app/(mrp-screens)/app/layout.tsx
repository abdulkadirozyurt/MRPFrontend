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
//     <html lang="en">
//       <head>
//         <meta charSet="utf-8" />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <title>flowMRP</title>
//       </head>
//       <body className={`antialiased`}>
//         <Provider store={store}>
//           <AntdRegistry>

//             <ProtectedRoute>
//             <div className={styles.container}>
//               <Topbar />
//               <Navbar />
//               <div className={styles.content}>{children}a</div>
//             </div>
//             </ProtectedRoute>

//           </AntdRegistry>
//         </Provider>
//       </body>
//     </html>
//   );
// }

"use client";

// import "./global.scss";
import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/ui/mrp-app-components/navbar";
import Topbar from "@/components/ui/mrp-app-components/topbar";

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`flex flex-col antialiased w-full h-screen`}>
      <ProtectedRoute>
        <Topbar />
        <Navbar />

        <div className="w-full h-full p-4 transition-all duration-300 ease-in-out bg-gray-100">
          <div className="container mx-auto">{children}</div>
        </div>
      </ProtectedRoute>
    </div>
  );
}
