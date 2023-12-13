export default {
    MainNaviExport: (user_role) => {
        let MainNavi = [
            {
                icon: "pe-7s-note",
                label: "Record",
                to: "#/record",
            },
            {
                icon: "pe-7s-add-user",
                label: "Student",
                content: [
                    {
                        label: 'List',
                        to: '#/student/list',
                    },
                    {
                        label: 'Course & Grade',
                        to: '#/student/course',
                    },
                ],

            },
        ]

        let setting = [

            {
                icon: "pe-7s-note2",
                label: "Program",
                to: "#/program",
            },

            {
                icon: "pe-7s-glasses",
                label: "Course",
                to: "#/course",
            },
        ]
        if (['Super Admin'].includes(user_role)) {
            setting.push(   {
                label: 'Faculty',
                to: '#/setting/department',
            },)
            setting.push(  {
                icon: "pe-7s-users",
                label: "User Management",
                to: "#/user-management",
            })

        }
        MainNavi.push(
            {
                icon: 'pe-7s-settings',
                label: 'Setting',
                content: setting
            }
        )




        // if(user_role == "Admin"){
        //
        //
        // }

        return MainNavi
    }
}
