export default {
    MainNaviExport: (user_role) => {
        let MainNavi = [
            {
                icon: "pe-7s-note",
                label: "Record",
                to: "#/record",
            }, {
                icon: "pe-7s-note2",
                label: "Program",
                to: "#/program",
            },
        ]

        if (['Super Admin'].includes(user_role)) {
            MainNavi.push(
                {
                    icon: "pe-7s-users",
                    label: "User Management",
                    to: "#/user-management",
                },
                {
                    icon: 'pe-7s-settings',
                    label: 'Setting',
                    content: [
                        {
                            label: 'Faculty',
                            to: '#/setting/department',
                        },
                    ],
                }
            )
        }


        // if(user_role == "Admin"){
        //
        //
        // }

        return MainNavi
    }
}
