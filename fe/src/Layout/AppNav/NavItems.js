

export default {
  MainNaviExport: (user_role) => {
     let MainNavi = []
      MainNavi.push(
          {
              icon: "pe-7s-users",
              label: "User Management",
              to: "#/user-management",
          },
          {
              icon: "pe-7s-note2",
              label: "Record",
              to: "#/record",
          }
      )

    // if(user_role == "Admin"){
    //
    //
    // }

    return MainNavi
  }
}
