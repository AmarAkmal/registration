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
                        label: 'Course',
                        to: '#/student/course',
                    },
                    {
                        label: 'Grade',
                        to: '#/student/grade',
                    },
                ],

            },
        ]

        if (['Super Admin'].includes(user_role)) {
            MainNavi.push(

                {
                    icon: 'pe-7s-settings',
                    label: 'Setting',
                    content: [
                        {
                            icon: "pe-7s-users",
                            label: "User Management",
                            to: "#/user-management",
                        },

                        {
                            icon: "pe-7s-note2",
                            label: "Program",
                            to: "#/program",
                        },
                        {
                            label: 'Faculty',
                            to: '#/setting/department',
                        },
                        {
                            icon: "pe-7s-glasses",
                            label: "Course",
                            to: "#/course",
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
