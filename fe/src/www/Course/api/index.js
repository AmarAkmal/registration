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
    list_user_profile : (params) => {

        const formData = new FormData()
        formData.append('ref', JSON.stringify(params))

        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}course/list`, {
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
    add_user_profile : (params) => {

        const formData = new FormData()
        formData.append('ref', JSON.stringify(params))

        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}course/add_`, {
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
    delete_ : (params) => {

        const formData = new FormData()
        formData.append('ref', JSON.stringify(params))

        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}course/delete_`, {
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
    update_user_profile : (params) => {

        const formData = new FormData()
        formData.append('ref', JSON.stringify(params))

        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}course/update_`, {
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

    get_userId : () => {

        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}user/userId`, {
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
            fetch(`${global.ipServer}user/department`, {
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
            fetch(`${global.ipServer}user/change_pass`, {
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