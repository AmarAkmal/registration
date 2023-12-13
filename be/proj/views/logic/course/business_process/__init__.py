from argon2 import PasswordHasher

from proj.models import db
from proj.models.model import Course
from proj.views import func
from proj.views.logic.course import business_rules


def list_(params) -> dict:
    status = func.define_status()
    try:
        page = int(params['page']) + 1
        pageSize = int(params['pageSize'])
        query = Course.query
        if params["user_role"] == 'Super Admin':
            pass
        else:
            query = query.filter_by(faculty_id=params['department_id'])

        if params['filtered']:
            query = business_rules.filterList(params, query)

        if params['sorted']:
            query = business_rules.sortList(params, query)

        query = query.paginate(page, pageSize)
        status['totalpagenum'] = query.pages

        if query:
            user = business_rules.determine_admin(query)
            status['data'] = user
        else:
            status['code'] = 'Error'
            status['message'] = 'No user registered'
    except:
        db.session.rollback()
        status['message'] = func.error_log()
        status['code'] = 'Error'
    finally:
        db.session.commit()
        return status


def add_new(params) -> dict:
    status = func.define_status()
    try:
        up = Course()
        up.code = params['code']
        up.name = params['name']
        up.section = params['section']
        up.credit_hours = params['creditHour']
        up.result = params['result']
        up.faculty_id = params['faculty_id']
        db.session.add(up)
        status['message'] = "Record added succesfully"

    except:
        db.session.rollback()
        status['message'] = func.error_log()
        status['code'] = 'Error'
    finally:
        db.session.commit()
        return status


def update_existing(params) -> dict():
    status = func.define_status()

    try:

        record = business_rules.check_exist(params['id'])

        if record:
            print(params, "SS")
            up = db.session.query(Course).get(params['id'])
            up.code = params['code']
            up.name = params['name']
            up.section = params['section']
            up.credit_hours = params['creditHour']
            up.result = params['result']
            up.faculty_id = params['faculty_id']
            status['message'] = f"Record updated Successfully"
        else:
            status['code'] = 'Error'
            status['message'] = f"Record does not exist"

    except:
        db.session.rollback()
        status['message'] = func.error_log()
        status['code'] = 'Error'
    finally:
        db.session.commit()
        return status


def delete_(params) -> dict():
    status = func.define_status()

    try:
        record = business_rules.check_exist(params['id'])
        if record:
            get = Course.query.get(params['id'])
            if get and get.grade_program:
                status['message'] = f"Failed to delete, Record in use"
            else:
                db.session.query(Course).filter_by(id=params['id']).delete()
                status['message'] = f"Record deleted succesfully"
        else:
            status['code'] = 'Error'
            status['message'] = f"Record does not exist"

    except:
        db.session.rollback()
        status['message'] = func.error_log()
        status['code'] = 'Error'
    finally:

        db.session.commit()
        return status
