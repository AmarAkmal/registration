from sqlalchemy import or_

from proj.models.model import *
from proj.views import func


def is_user_profile_exist(uuid) -> bool:
    try:
        up = User.query.filter(User.id == uuid).first()

        if up:
            return True
    except:
        func.error_log()
        return False


def filterUserProfile(params, query):
    for i in params['filtered']:

        if i['id'] == 'name':
            query = query.filter(User.name.like('%' + i['value'] + '%'))
        if i['id'] == 'user_id':
            query = query.filter(User.user_id.like('%' + i['value'] + '%'))

        if i['id'] == 'email':
            query = query.filter(User.email.like('%' + i['value'] + '%'))

        if i['id'] == 'department':
            query = query.join(Department, Department.id == User.department_id)
            query = query.filter(Department.name.like('%' + i['value'] + '%'))
        if i['id'] == 'account_type':
            query = query.filter(User.user_type.like('%' + i['value'] + '%'))

    return query


def sortUserProfile(params, query):
    for x in params['sorted']:

        if x['desc']:
            query = query.order_by(User.name.desc())
        else:
            query = query.order_by(User.name.asc())

    return query




def user_duplicate(params) -> bool:
    if 'userId' in params.keys() and 'email' in params.keys():  ## for update user
        user = User.query.filter(or_(User.user_id == params['userId'], User.email == params['email'], )).first()

        if user:
            return False
        else:
            return True

    return False


def valid_password_length(params) -> bool:
    if params['password'] and len(params['password']) < 8:
        return False

    return True


def determine_admin(query) -> list:
    tmp = []
    for i in query.items:
        tmpUser = func.convert(i)

        tmpUser['account_type'] = i.user_type
        tmpUser['department'] = i.department.name
        tmpUser.pop("password")
        tmp.append(tmpUser)

    return tmp


def params_valid(params) -> bool:
    if "" in params.values():
        return False

    return True
