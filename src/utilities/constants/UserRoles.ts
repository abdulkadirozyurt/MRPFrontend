export enum UserRoles {
  Admin = "admin",
  User = "user",
  Manager = "manager",
  Viewer = "viewer",
  ProductionPlanner = "production_planner",
  SalesStaff = "sales_staff",
  ProcurementManager = "procurement_manager",
}

export const UserLabels = [
  { key: UserRoles.Admin, label: "Sistem Admin" },
  { key: UserRoles.User, label: "Standart Kullanıcı" },
  { key: UserRoles.Manager, label: "Yönetici" },
  { key: UserRoles.Viewer, label: "Deneme Hesabı" },
  { key: UserRoles.ProductionPlanner, label: "Üretim Planlama" },
  { key: UserRoles.SalesStaff, label: "Satış Personeli" },
  { key: UserRoles.ProcurementManager, label: "Tedarik Yönetimi" },
];
