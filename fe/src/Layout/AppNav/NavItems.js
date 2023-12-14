export default {
    MainNaviExport: (user_role) => {
        let MainNavi = [
            {
                icon: "pe-7s-add-user",
                label: "Student",
                content: [
                    {
                        label: 'Register & Student List',
                        to: '#/student/list',
                    },
                ],

            },

            {
                icon: "pe-7s-note2",
                label: "Programme",
                content: [
                    {
                        icon: "pe-7s-glasses",
                        label: "Register & Programme List",
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
                        label: "Course List",
                        to: "#/course",
                    },
                    {
                        label: 'Student Course',
                        to: '#/student/course',
                    },
                    {
                        label: 'Student Grade',
                        to: '#/student/grade',
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
