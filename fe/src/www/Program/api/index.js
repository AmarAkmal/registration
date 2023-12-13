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
            fetch(`${global.ipServer}program/list`, {
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
    add : (params) => {

        const formData = new FormData()
        formData.append('ref', JSON.stringify(params))

        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}program/add`, {
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
            fetch(`${global.ipServer}program/delete_department`, {
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
    update_ : (params) => {

        const formData = new FormData()
        formData.append('ref', JSON.stringify(params))

        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}program/update_department`, {
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

}