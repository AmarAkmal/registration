from proj.views.logic.record.record import business_process


def get_list(params) -> dict:
    status = business_process.list_all_user(params)
    return status


def add_new_user_profile(params) -> dict:
    status = business_process.add_new(params)
    return status


def update_existing_user_profile(params) -> dict:
    status = business_process.update_existing_user_profile(params)
    return status


def delete_existing_user_profile(params) -> dict:
    status = business_process.delete_existing_user_profile(params)
    return status


def change_password_user(params):
    status = business_process.change_password(params)
    return status
