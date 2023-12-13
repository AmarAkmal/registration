from proj.models.model import *
from proj.views import func


def check_exist(uuid) -> bool:
    try:
        up = Course.query.get(uuid)

        if up:
            return True
    except:
        func.error_log()
        return False


def filterList(params, query):
    for i in params['filtered']:
        print(i)

        if i['id'] == 'code':
            query = query.filter(Course.code.like('%' + i['value'] + '%'))
        if i['id'] == 'name':
            query = query.filter(Course.name.like('%' + i['value'] + '%'))
        if i['id'] == 'section':
            query = query.filter(Course.section.like('%' + i['value'] + '%'))
        if i['id'] == 'credit_hours':
            query = query.filter(Course.credit_hours.like('%' + i['value'] + '%'))
        if i['id'] == 'result':
            query = query.filter(Course.result.like('%' + i['value'] + '%'))
        if i['id'] == 'faculty':
            query = query.join(Department, Department.id == Course.faculty_id)
            query = query.filter(Department.name.like('%' + i['value'] + '%'))

    return query


def sortList(params, query):
    for x in params['sorted']:

        if x['desc']:
            query = query.order_by(Course.name.desc())
        else:
            query = query.order_by(Course.name.asc())

    return query


def determine_admin(query) -> list:
    tmp = []
    for i in query.items:
        tmpV = func.convert(i)
        tmpV['faculty'] = i.department.name
        tmpV['faculty_id'] = i.department.id
        tmp.append(tmpV)

    return tmp


def params_valid(params) -> bool:
    if "" in params.values():
        return False

    return True
