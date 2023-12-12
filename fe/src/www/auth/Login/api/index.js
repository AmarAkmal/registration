export default {
    submit_login: (data) => {
        return new Promise((resolve, reject) => {
            fetch(`${global.ipServer}auth/login`, {
                method: 'POST',
                body: data,
                // headers: {
                //     'x-access-token': localStorage.getItem("true_mytoken"),
                // }

            }).then((response) => response.json())
                .then((result) => {

                    // if(result.code == "101"){
                    //     localStorage.setItem('opex0hidhs', result.data.agency);
                    //     localStorage.setItem('aazwo7n331', result.data.staff_name);
                    //     localStorage.setItem('mk2lu5b2gf', result.data.user_id);
                    //     localStorage.setItem('3leeb6bnmn', result.data.role);
                    //
                    // }
                    return resolve(result)

                }).catch((err) => {
                return resolve(err)
                })
        });
    },
}
