"use client";

import type { SelectProps } from "antd";
import { Select, Space } from "antd";

export default function Multiselect({
  options = [],
  value = [],
  onChange,
}: {
  options: SelectProps["options"];
  value: string[];
  onChange: (value: string[]) => void;
}) {
  const selectOptions: SelectProps["options"] = options.map((option) => ({
    label: option.name,
    value: option._id,
  }));

  return (
    <Space style={{ width: "100%" }} direction="vertical">
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Seçiniz"
        onChange={onChange}
        options={selectOptions}
        value={value}
      />
    </Space>
  );
}
