from proj.models import db
from proj.models.model import Program
from proj.views import func
from proj.views.logic.program import business_rules


def list_(params) -> dict:
    status = func.define_status()

    try:
        page = int(params['page']) + 1
        pageSize = int(params['pageSize'])
        query = Program.query
        if params["user_role"] == 'Super Admin':
            pass
        else:
            query = query.filter_by(department_id=params['department_id'])

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
        up = Program()
        up.name = params['name']
        up.code = params['code']
        up.department_id = params['department_id']
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
            up = db.session.query(Program).get(params['id'])

            up.code = params['code']
            up.name = params['name']
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
            get = Program.query.get(params['id'])

            if (get and get.student_program):
                status['message'] = f"Failed to delete, Record in use"
            else:
                db.session.query(Program).filter_by(id=params['id']).delete()
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
