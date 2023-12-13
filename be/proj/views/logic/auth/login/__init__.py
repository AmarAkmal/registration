from proj.views.logic.auth.login.login_bp import login


def bp_login(param):
    response = login(param)

    return response
