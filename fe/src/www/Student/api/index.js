import { Bounce , toast } from "react-toastify";

function toastView(msg, typeToast) {
    toast(msg, {
        transition: Bounce,
        closeButton: true,
        autoClose: 5000,
        position: 'top-right',
        type: typeToast
    });
}


export default {
    list_ : (params) => {

        const formData = new FormData()
        formData.append('ref', JSON.stringify(params))

        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}student/list`, {
                method: 'POST',
                body: formData,
                headers: {
                    'x-access-token': localStorage.getItem("n29pa87zfm"),

                }
            })
            .then((response) => {
                return resolve(response.json())
            })
            .catch((err) => {
                toastView("Failed to retrieve data. Server error. Please try again later", 'error')
                return reject(err)
            })
        });


    },
    add_student_profile : (params) => {

        const formData = new FormData()
        formData.append('ref', JSON.stringify(params))

        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}student/add_`, {
                method: 'POST',
                body: formData,
                headers: {
                    'x-access-token': localStorage.getItem("n29pa87zfm"),
                }
            })
            .then((response) => {
                return resolve(response.json())
            })
            .catch((err) => {
                reject(err)
                toastView("Submit Failed. Server Error. Please Try Again", 'error')
            })
        })
    },
    delete_student_profile : (params) => {

        const formData = new FormData()
        formData.append('ref', JSON.stringify(params))

        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}student/delete_`, {
                method: 'POST',
                body: formData,
                headers: {
                    'x-access-token': localStorage.getItem("n29pa87zfm"),
                }
            })
            .then((response) => {
                return resolve(response.json())
            })
            .catch((err) => {
                reject(err)
                toastView("Delete Failed. Server Error. Please Try Again", 'error')
            })
        })


    },
    update_student_profile : (params) => {

        const formData = new FormData()
        formData.append('ref', JSON.stringify(params))

        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}student/update_`, {
                method: 'POST',
                body: formData,
                headers: {
                    'x-access-token': localStorage.getItem("n29pa87zfm"),
                }
            })
            .then((response) => {
                return resolve(response.json())
            })
            .catch((err) => {
                reject(err)
                toastView("Update Failed. Server Error. Please Try Again", 'error')
            })
        })

    },
    get_studentname : () => {

        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}student/studentname`, {
                method: 'POST',
                headers: {
                    'x-access-token': localStorage.getItem("n29pa87zfm"),
                }
            })
            .then((response) => {
                return resolve(response.json())
            })
            .catch((err) => {
                reject(err);
                console.log(err);
            })
        })

    },
    get_email : () => {

        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}student/email`, {
                method: 'POST',
                headers: {
                    'x-access-token': localStorage.getItem("n29pa87zfm"),
                }
            })
            .then((response) => {
                return resolve(response.json())
            })
            .catch((err) => {
                reject(err);
                console.log(err);
            })
        })

    },
    get_studentId : () => {

        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}student/studentId`, {
                method: 'POST',
                headers: {
                    'x-access-token': localStorage.getItem("n29pa87zfm"),
                }
            })
            .then((response) => {
                return resolve(response.json())
            })
            .catch((err) => {
                reject(err);
                console.log(err);
            })
        })

    },
    get_department : () => {

        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}student/department`, {
                method: 'POST',
                headers: {
                    'x-access-token': localStorage.getItem("n29pa87zfm"),
                }
            })
            .then((response) => {
                return resolve(response.json())
            })
            .catch((err) => {
                reject(err);
                console.log(err);
            })
        })

    },
    change_password : (params) => {
        const formData = new FormData()
        formData.append('ref', JSON.stringify(params))

        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}student/change_pass`, {
                method: 'POST',
                body: formData,
                headers: {
                    'x-access-token': localStorage.getItem("n29pa87zfm"),
                }
            })
            .then((response) => {
                return resolve(response.json())
            })
            .catch((err) => {
                toastView("Update Failed. Server Error. Please Try Again", 'error')
                return reject(err)
            })
        })
    }

}