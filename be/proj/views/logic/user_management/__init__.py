from proj.views.logic.user_management import user_profile


def get_list_user_profile(params) -> dict:
    status = user_profile.list_all_user(params)
    return status


def add_user_profile(params) -> dict:
    status = user_profile.add_new_user_profile(params)
    return status


def update_user_profile(params) -> dict:
    status = user_profile.update_existing_user_profile(params)
    return status


def delete_user_profile(params) -> dict:
    status = user_profile.delete_existing_user_profile(params)
    return status
