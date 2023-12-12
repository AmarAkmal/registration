from proj.views.register.user_management import user_profile, system_user


def get_list_user_profile(params) -> dict:
    status = user_profile.list_all_user(params)
    return status


def add_user_profile(params) -> dict:
    status = user_profile.add_new_user_profile(params)
    return status


def update_user_profile(params) -> dict:
    status = user_profile.update_existing_user_profile(params)
    return status


def change_pass(params) -> dict:
    status = user_profile.change_password_user(params)
    return status


def delete_user_profile(params) -> dict:
    status = user_profile.delete_existing_user_profile(params)
    return status


def add_system_user(params, user_id, staff_name) -> dict:
    status = system_user.add_new_system_user(params, user_id, staff_name)
    return status


def update_system_user(params) -> dict:
    status = system_user.update_existing_system_user(params)
    return status


def delete_system_user(params, user_id, staff_name) -> dict:
    status = system_user.delete_existing_system_user(params, user_id, staff_name)
    return status
