from proj.views.register.setting import business_process


def get_list(params) -> dict:

    status = business_process.list_(params)
    return status


def add_new_user_profile(params) -> dict:
    status = business_process.add_new(params)
    return status


def update_existing_user_profile(params) -> dict:
    status = business_process.add_new(params)
    return status


def delete_existing_user_profile(params) -> dict:
    status = business_process.delete_(params)
    return status
