"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Navbar from "@/components/ui/mrp-app-layout-components/navbar";
import Topbar from "@/components/ui/mrp-app-layout-components/topbar";

export default function ApplicationLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={`flex flex-col antialiased w-full h-screen`}>
      {/* <ProtectedRoute>
        
      </ProtectedRoute> */}
      <Topbar />
      <Navbar />
      <div className="w-full h-full p-4 transition-all duration-300 ease-in-out bg-gray-100">
        <div className="container mx-auto">{children}</div>
      </div>
    </div>
  );
}
