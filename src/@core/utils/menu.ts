import exp from "constants"

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

/**
 * 774 = true
 * 775 = false
*/
export const listRolePermission: Array<{
  name: string,
  code: number,
  read: 774 | 775,
  write: 774 | 775
}> = [
    {
      name: "Manage User",
      code: 1,
      read: 774,
      write: 775
    },
    {
      name: "Manage Role",
      code: 2,
      read: 774,
      write: 775
    }

  ]

export const defaultArray = listRolePermission.map(v => {
  return {
    code: v.code,
    write: 775,
    read: 775
  }
})
