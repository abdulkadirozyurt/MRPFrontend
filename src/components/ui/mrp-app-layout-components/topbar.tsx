"use client";

import { GlobalOutlined } from "@ant-design/icons";

export default function Topbar() {
  return (
    <div className="flex w-full justify-between">
      <div className="flex p-3 text-3xl">
        <GlobalOutlined />
        <h1 className="ml-2">flowMRP</h1>
      </div>

      <div>LOGİN LOGOUT</div>
    </div>
  );
}
