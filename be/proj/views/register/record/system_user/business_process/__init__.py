

from proj.models import db

from proj.views import func
from proj.views.register.user_management.user_profile import business_rules


def add_new_system_user(params, user_id, staff_name) -> dict():
    status = func.define_status()
    try:
        userProfileExist = business_rules.is_user_profile_exist(params['user_id'])
        if userProfileExist:
            isadmin = False
            if params['is_admin'] == 'Admin':
                isadmin = True
            su = model_user.SystemUser(is_admin=isadmin)
            up = db.session.get(model_user.UserProfile, params['user_id'])
            su.user_profile_id = up.user_id

            db.session.add(su)
            status['message'] = "System user added succesfully"
        else:
            status['code'] = 'Error'
            status['message'] = f"User {params['user_id']} does not exist"

        db.session.commit()
        up = UserProfile.query.filter(UserProfile.user_id == params['user_id']).first()

        add_audit_trail(user_id, "User Management",
                        "User " + staff_name + " has created new user (" + up.staff_name + ")")

    except:
        db.session.rollback()
        msg = func.error_log()
        status['message'] = msg
        status['code'] = 'Error'
    finally:
        return status


def update_existing_system_user(params) -> dict:
    status = func.define_status()
    try:
        userProfileExist = business_rules.is_user_profile_exist(params['user_id'])
        if userProfileExist:
            su = model_user.SystemUser.query \
                .filter(model_user.SystemUser.user_profile_id == params['user_id']).first()
            su.is_admin = True if params['account_type'] == 'Admin' else False
            # su.is_active = params['is_active']

            status['message'] = f"System User {params['user_id']} updated successfully"
        else:
            status['code'] = 'Error'
            status['message'] = f"System User {params['user_id']} does not exist"
    except:
        db.session.rollback()
        msg = func.error_log()
        status['message'] = msg
        status['code'] = 'Error'
    finally:
        db.session.commit()
        return status


def delete_existing_system_user(params, user_id, staff_name):
    status = func.define_status()
    try:
        userProfileExist = business_rules.is_user_profile_exist(params['user_id'])
        if userProfileExist:
            admin = model_user.SystemUser.query.filter(
                model_user.SystemUser.user_profile_id == params['user_id']).first()
            if admin:
                admin.isDeleted = True
            status['message'] = f"System User {params['user_id']} deleted succesfully"

            up = UserProfile.query.filter(UserProfile.user_id == params['user_id']).first()
            add_audit_trail(user_id, "User Management",
                            "User " + staff_name + " has deleted user (" + up.staff_name + ")")
        else:
            status['code'] = 'Error'
            status['message'] = f"System User {params['user_id']} does not exist"
    except:
        db.session.rollback()
        msg = func.error_log()
        status['message'] = msg
        status['code'] = 'Error'
    finally:
        db.session.commit()
        return status
