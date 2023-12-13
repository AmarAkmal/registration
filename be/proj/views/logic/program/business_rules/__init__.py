from sqlalchemy import or_

from proj.models.model import *
from proj.views import func


def check_exist(uuid) -> bool:
    try:
        up = Program.query.get(uuid)

        if up:
            return True
    except:
        func.error_log()
        return False


def filterList(params, query):
    for i in params['filtered']:
        print(i)
        if i['id'] == 'faculty':
            query = query.join(Department,Department.id == Program.department_id)
            query = query.filter(Department.name.like('%' + i['value'] + '%'))
        if i['id'] == 'code':
            query = query.filter(Program.code.like('%' + i['value'] + '%'))
        if i['id'] == 'name':
            query = query.filter(Program.name.like('%' + i['value'] + '%'))


    return query


def sortList(params, query):
    for x in params['sorted']:

        if x['desc']:
            query = query.order_by(Program.name.desc())
        else:
            query = query.order_by(Program.name.asc())

    return query


def determine_admin(query) -> list:
    tmp = []
    for i in query.items:
        tmpV = func.convert(i)
        tmp.append(tmpV)

    return tmp


def params_valid(params) -> bool:
    if "" in params.values():
        return False

    return True
