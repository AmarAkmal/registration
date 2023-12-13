from sqlalchemy import or_

from proj.models.model import *
from proj.views import func


def check_exist(uuid) -> bool:
    try:
        up = Department.query.get(uuid)

        if up:
            return True
    except:
        func.error_log()
        return False


def filterList(params, query):
    for i in params['filtered']:
        if i['id'] == 'name':
            query = query.filter(Department.name.like('%' + i['value'] + '%'))

    return query


def sortList(params, query):
    for x in params['sorted']:

        if x['desc']:
            query = query.order_by(Department.name.desc())
        else:
            query = query.order_by(Department.name.asc())

    return query


def determine_admin(query) -> list:
    tmp = []
    for i in query.items:
        tmpV = func.convert(i)

        tmpV['id'] = i.id
        tmpV['name'] = i.name
        tmp.append(tmpV)

    return tmp


def params_valid(params) -> bool:
    if "" in params.values():
        return False

    return True
