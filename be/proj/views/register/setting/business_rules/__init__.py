from sqlalchemy import or_

from proj.models.model import *
from proj.views import func


def delete_exist(uuid) -> bool:
    try:
        up = Record.query.get(uuid)

        if up:
            return True
    except:
        func.error_log()
        return False


def filterList(params, query):
    for i in params['filtered']:
        if i['id'] == 'kod':
            query = query.filter(Record.kod.like('%' + i['value'] + '%'))
        if i['id'] == 'name':
            query = query.filter(Record.name.like('%' + i['value'] + '%'))
        if i['id'] == 'quantity':
            query = query.filter(Record.quantity.like('%' + i['value'] + '%'))
        if i['id'] == 'created_by':
            query = query.filter(Record.created_by.like('%' + i['value'] + '%'))

    return query


def sortList(params, query):
    for x in params['sorted']:

        if x['desc']:
            query = query.order_by(Record.date_created.desc())
        else:
            query = query.order_by(Record.date_created.asc())

    return query


def get_username() -> list:
    tmp = []
    user = model_user.UserProfile.query.filter(model_user.UserProfile.isDeleted == False).all()
    for i in user:
        tmp.append(i.user_name)

    return tmp


def username_duplicate(params) -> bool:
    userNameList = get_username()

    if 'user_id' in params.keys():  ## for update user
        user = model_user.UserProfile.query.filter(model_user.UserProfile.user_id == params['user_id']).first()
        if user and params['user_name'] == user.user_name:
            return True

    for un in userNameList:
        if un == params['user_name']:
            return False

    return True


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
        tmpV = func.convert(i)

        tmpV['kod'] = i.kod
        tmpV['name'] = i.name
        tmpV['quantity'] = i.quantity
        tmpV['created_by'] = i.created_by
        tmpV['date_created'] = i.date_created.strftime('%d/%m/%Y %H:%M:%S')
        tmp.append(tmpV)

    return tmp


def params_valid(params) -> bool:
    if "" in params.values():
        return False

    return True
