from proj.views.logic.user_management.user_profile import business_process


def list_all_user(params) -> dict:
    status = business_process.list_all_user(params)
    return status


def add_new_user_profile(params) -> dict:
    status = business_process.add_new_user_profile(params)
    return status


def update_existing_user_profile(params) -> dict:
    status = business_process.update_existing_user_profile(params)
    return status


def delete_existing_user_profile(params) -> dict:
    status = business_process.delete_existing_user_profile(params)
    return status
