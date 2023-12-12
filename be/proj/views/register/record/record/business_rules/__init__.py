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
        print(i)
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
            query = query.order_by(Record.date_created.asc())
        else:
            query = query.order_by(Record.date_created.desc())

    return query


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
