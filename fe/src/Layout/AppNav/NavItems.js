export default {
    MainNaviExport: (user_role) => {
        let MainNavi = [{
            icon: "pe-7s-note2",
            label: "Record",
            to: "#/record",
        },]

        if (user_role == 'Admin') {
            MainNavi.push(
                {
                    icon: "pe-7s-users",
                    label: "User Management",
                    to: "#/user-management",
                },
            )
        }
        MainNavi.push(
            {
                icon: 'pe-7s-settings',
                label: 'Setting',
                content: [
                    {
                        label: 'Department',
                        to: '#/setting/department',
                    },
                ],
            }
        )


        // if(user_role == "Admin"){
        //
        //
        // }

        return MainNavi
    }
}
