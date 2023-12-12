from proj.views.register.auth.login.login_bp import login


def bp_login(param):
    response = login(param)

    return response
