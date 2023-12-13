from proj.models.model import Student ,Department,Program
from proj.views import func


def check_exist(uuid) -> bool:
    try:
        up = Student.query.get(uuid)

        if up:
            return True
    except:
        func.error_log()
        return False


def filterList(params, query):
    for i in params['filtered']:
        print(i)

        if i['id'] == 'name':
            query = query.filter(Student.name.like('%' + i['value'] + '%'))

        if i['id'] == 'ic_no':
            query = query.filter(Student.ic_no.like('%' + i['value'] + '%'))
        if i['id'] == 'matrix_no':
            query = query.filter(Student.matrix_no.like('%' + i['value'] + '%'))
        if i['id'] == 'entry_session':
            query = query.filter(Student.entry_session.like('%' + i['value'] + '%'))
        if i['id'] == 'faculty':
            query = query.join(Department, Department.id == Student.faculty_id)
            query = query.filter(Department.name.like('%' + i['value'] + '%'))
        if i['id'] == 'program':
            query = query.join(Program, Program.id == Student.program_id)
            query = query.filter(Program.name.like('%' + i['value'] + '%'))
        if i['id'] == 'status':
            query = query.filter(Student.status.like('%' + i['value'] + '%'))
        if i['id'] == 'year_of_graduate':
            query = query.filter(Student.year_of_graduate.like('%' + i['value'] + '%'))

    return query


def sortList(params, query):
    for x in params['sorted']:

        if x['desc']:
            query = query.order_by(Student.date_created.desc())
        else:
            query = query.order_by(Student.date_created.asc())

    return query


def determine_admin(query) -> list:
    tmp = []
    for i in query.items:
        tmpV = func.convert(i)

        tmpV['faculty'] = i.department.name
        tmpV['faculty_id'] = i.department.id
        tmpV['program'] = i.program.name
        tmpV['program_id'] = i.program.id
        month = ''
        year = ''
        if '/' in i.entry_session:
            split = i.entry_session.split('/')
            month = split[0]
            year = split[1]
        tmpV['entrySessionMonth'] = month
        tmpV['entrySessionYear'] = year
        tmp.append(tmpV)

    return tmp


def params_valid(params) -> bool:
    if "" in params.values():
        return False

    return True
