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
  { key: UserRoles.Admin, label: "Admin" },
  { key: UserRoles.User, label: "User" },
  { key: UserRoles.Manager, label: "Manager" },
  { key: UserRoles.Viewer, label: "Viewer" },
  { key: UserRoles.ProductionPlanner, label: "Production Planner" },
  { key: UserRoles.SalesStaff, label: "Sales Staff" },
  { key: UserRoles.ProcurementManager, label: "Procurement Manager" },
];
