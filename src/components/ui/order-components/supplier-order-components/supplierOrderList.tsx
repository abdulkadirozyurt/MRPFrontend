"use client";

import { fetchSupplierOrders } from "@/utilities/redux/slices/supplierOrderSlice";
import { AppDispatch, RootState } from "@/utilities/redux/store";
import { Table } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export default function SupplierOrderList() {
  const dispatch: AppDispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.supplierOrders.orders);
  const status = useSelector((state: RootState) => state.supplierOrders.status);

  const columns = [
    // {
    //   title: "Sipariş Numarası",
    //   dataIndex: "_id",
    //   key: "_id",
    // },
    {
      title: "Depo",
      dataIndex: "warehouseId",
      key: "warehouseId",
    },
    {
      title: "Tedarikçi",
      dataIndex: "supplierId",
      key: "supplierId",
    },
    {
      title: "Teslim Tarihi",
      dataIndex: "deliveryDate",
      key: "deliveryDate",
    },
    {
      title: "Durum",
      dataIndex: "status",
      key: "status",
    },
  ];

  useEffect(() => {
    dispatch(fetchSupplierOrders());
  }, [dispatch]);

  return (
    <div>
      <h2>Tedarikçi Sipariş Listesi</h2>
      <Table dataSource={orders} columns={columns} loading={status === "loading"} rowKey="_id" />
    </div>
  );
}
