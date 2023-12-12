from proj.views.register.user_management.system_user import business_process


def add_new_system_user(params, user_id, staff_name) -> dict():
    status = business_process.add_new_system_user(params, user_id, staff_name)
    return status


def update_existing_system_user(params) -> dict:
    status = business_process.update_existing_system_user(params)
    return status


def delete_existing_system_user(params, user_id, staff_name) -> dict:
    status = business_process.delete_existing_system_user(params, user_id, staff_name)
    return status
