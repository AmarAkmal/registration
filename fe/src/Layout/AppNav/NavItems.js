export default {
    MainNaviExport: (user_role) => {
        let MainNavi = [
            {
                icon: "pe-7s-add-user",
                label: "Student",
                content: [
                    {
                        label: 'Register & List Student',
                        to: '#/student/list',
                    },
                ],

            },

            {
                icon: "pe-7s-note2",
                label: "Program",
                content: [
                    {
                        icon: "pe-7s-glasses",
                        label: "Register & List Program",
                        to: "#/program",
                    },
                    ]
            },
            {
                icon: "pe-7s-add-user",
                label: "Course",
                content: [

                    {
                        icon: "pe-7s-glasses",
                        label: "List Course",
                        to: "#/course",
                    },
                    {
                        label: 'Student Course',
                        to: '#/student/list',
                    },
                    {
                        label: 'Student Grade',
                        to: '#/student/course',
                    },


                ],

            },

            // {
            //     icon: "pe-7s-note",
            //     label: "Record",
            //     to: "#/record",
            // },

        ]


        if (['Super Admin'].includes(user_role)) {

            let setting = [


            ]
            setting.push(   {
                label: 'Faculty',
                to: '#/setting/department',
            },)
            setting.push(  {
                icon: "pe-7s-users",
                label: "User Management",
                to: "#/user-management",
            })
            MainNavi.push(
                {
                    icon: 'pe-7s-settings',
                    label: 'Setting',
                    content: setting
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
