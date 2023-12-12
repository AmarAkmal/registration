

export default {
  MainNaviExport: (user_role) => {
     let MainNavi = []
      MainNavi.push(
          {
              icon: "pe-7s-users",
              label: "User Management",
              to: "#/user-management",
          }
      )


    return MainNavi
  }
}
