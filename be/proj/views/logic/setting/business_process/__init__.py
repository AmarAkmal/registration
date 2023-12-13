from argon2 import PasswordHasher

from proj.models import db
from proj.models.model import Department
from proj.views import func
from proj.views.logic.setting import business_rules


def list_(params) -> dict:
    status = func.define_status()
    # print(params)
    try:
        page = int(params['page']) + 1
        pageSize = int(params['pageSize'])
        query = Department.query

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
        up = Department()
        up.name = params['name']
        up.code = params['code']
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
            up = Department.query.get(params['id'])

            up.name = params['name']
            up.code = params['code']

            db.session.commit()
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
        print(record)
        if record:
            get = Department.query.get(params['id'])
            if get and get.user_department:
                status['message'] = f"Failed to delete, Record in use"
            else:
                Department.query.filter_by(id=params['id']).delete()
                status['message'] = f"Record deleted succesfully"
            # Record.query.filter(Record.id == params['id']).delete()


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


def change_password(params) -> dict():
    status = func.define_status()
    try:
        userProfileExist = business_rules.is_user_profile_exist(params['user_id'])
        ph = PasswordHasher()
        if userProfileExist:
            ## condition check
            if params['new_pass'] == "":
                raise Exception("Password cannot be empty")

            if params['conf_new_pass'] != params['new_pass']:
                raise Exception("password does not match")

            if not business_rules.valid_password_length(params={'password': params['new_pass']}):
                raise Exception("Password must have minimum 8 character")

            up = model_user.UserProfile.query.filter(model_user.UserProfile.user_id == params['user_id']).first()

            if ph.verify(up.password, params['curr_pass']):

                # check if the new password is the same as old password
                try:
                    if ph.verify(up.password, params['new_pass']):
                        status['code'] = 'Error'
                        status['message'] = "new password cannot be your old password"
                except:
                    up.password = ph.hash(params['new_pass'])
                    status['message'] = f"User {params['user_id']} password updated succesfully"

        else:
            status['code'] = 'Error'
            status['message'] = f"User {params['user_id']} does not exist"

    except:
        db.session.rollback()
        status['message'] = func.error_log()
        status['code'] = 'Error'
    finally:
        db.session.commit()
        return status
