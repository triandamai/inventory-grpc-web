export const menus: Array<{
  title: string,
  path: string,
  type: "divider" | "link" | "button",
  access_role: Array<string>,
  icon: string | null
}> = [
    {
      title: "Dashboard",
      type: "link",
      path: "index",
      access_role: ["PUBLIC"],
      icon: 'mdi-home'
    },
    {
      title: "MASTER",
      type: "divider",
      path: "dashboard",
      access_role: ["PUBLIC"],
      icon: null
    },
    {
      title: "User",
      type: "link",
      path: "user",
      access_role: ["PUBLIC"],
      icon: "mdi-account"
    },
    {
      title: "Customer",
      type: "link",
      path: "customer",
      access_role: ["PUBLIC"],
      icon: "mdi-file"
    },
    {
      title: "Supplier",
      type: "link",
      path: "supplier",
      access_role: ["PUBLIC"],
      icon: "mdi-store"
    },
    {
      title: "Category",
      type: "link",
      path: "category",
      access_role: ["PUBLIC"],
      icon: "mdi-store"
    },
    {
      title: "Product",
      type: "link",
      path: "product",
      access_role: ["PUBLIC"],
      icon: "mdi-store"
    },
    {
      title: "Role",
      type: "link",
      path: "role",
      access_role: ["PUBLIC"],
      icon: "mdi-store"
    },
    {
      title: "Setting",
      type: "divider",
      path: "dashboard",
      access_role: ["PUBLIC"],
      icon: null
    },
    {
      title: "Account Settings",
      type: "link",
      path: "account-settings",
      access_role: ["PUBLIC"],
      icon: "mdi-store"
    },
  ]
