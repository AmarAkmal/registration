from argon2 import PasswordHasher

from proj.models import db
from proj.models.model import *
from proj.views import func
from proj.views.register.user_management.user_profile import business_rules


def list_all_user(params) -> dict:
    status = func.define_status()
    # print(params)
    try:
        page = int(params['page']) + 1
        pageSize = int(params['pageSize'])
        query = User.query

        if params['filtered']:
            query = business_rules.filterUserProfile(params, query)

        if params['sorted']:
            query = business_rules.sortUserProfile(params, query)

        query = query.filter(User.is_deleted == False)
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


def add_new_user_profile(params) -> dict:
    status = func.define_status()

    try:
        if not business_rules.params_valid(params): raise Exception("params cannot be empty")
        if not business_rules.user_duplicate(params): raise Exception("Username cannot be same")

        up = User()

        up.user_id = params['userId']
        up.name = params['userName']
        up.email = params['email']
        up.phone = params['phoneNo']
        up.password = params['password']
        up.department_id = params['department']
        up.user_type = params['is_admin']
        db.session.add(up)

        status['message'] = "User Profile added succesfully"

    except:
        db.session.rollback()
        status['message'] = func.error_log()
        status['code'] = 'Error'
    finally:
        db.session.commit()
        return status


def update_existing_user_profile(params) -> dict():
    status = func.define_status()
    try:

        userProfileExist = business_rules.is_user_profile_exist(params['id'])

        if userProfileExist:
            ## condition check

            up = User.query.filter(User.id == params['id']).first()
            up.name = params['user_name']
            print(params)
            if params['password']:
                up.password = params['password']
            up.department_id = params['department_id']
            up.email = params['email']
            up.phone = params['phoneNo']
            up.user_type = params['account_type']
            db.session.commit()
            status['message'] = f"User {params['user_id']} updated succesfully"
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


def delete_existing_user_profile(params) -> dict():
    status = func.define_status()

    try:
        userProfileExist = business_rules.is_user_profile_exist(params['user_id'])
        if userProfileExist:
            up = User.query \
                .filter(User.id == params['user_id']).delete()


            status['message'] = f"User {params['user_id']} deleted succesfully"
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

