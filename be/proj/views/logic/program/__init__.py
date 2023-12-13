from proj.views.logic.program import business_process


def get_list(params) -> dict:

    status = business_process.list_(params)
    return status


def add_new(params) -> dict:
    status = business_process.add_new(params)
    return status


def update_(params) -> dict:
    status = business_process.update_existing(params)
    return status


def delete_existing_department(params) -> dict:
    status = business_process.delete_(params)
    return status
