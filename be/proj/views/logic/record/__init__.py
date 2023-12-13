from proj.views.logic.record.record import business_process


def get_list(params) -> dict:
    status = business_process.list_(params)
    return status


def add_new(params) -> dict:
    status = business_process.add_new(params)
    return status


def update_(params) -> dict:
    status = business_process.update_existing(params)
    return status


def delete_(params) -> dict:
    status = business_process.delete_(params)
    return status


def change_password_user(params):
    status = business_process.change_password(params)
    return status
