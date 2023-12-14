from proj.models import db
from proj.models.model import Student, Grade
from proj.views import func
from proj.views.logic.student import business_rules


def list_(params) -> dict:
    status = func.define_status()
    try:
        page = int(params['page']) + 1
        pageSize = int(params['pageSize'])
        query = Student.query
        if params["user_role"] == 'Super Admin':
            pass
        else:
            print(params)
            query = query.filter_by(faculty_id=params['department_id'])

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


def list_get_list_student_course(params) -> dict:
    status = func.define_status()
    try:
        page = int(params['page']) + 1
        pageSize = int(params['pageSize'])
        query = Grade.query
        query = query.join(Student, Grade.student_id == Student.id)
        query = query.filter(Grade.course_id == params['course'])
        if params["user_role"] == 'Super Admin':
            pass
        else:
            query = query.filter(Student.faculty_id == params['department_id'])

        if params['filtered']:
            query = business_rules.filterListStudentCourse(params, query)

        if params['sorted']:
            query = business_rules.sortListStudentCourse(params, query)

        query = query.paginate(page, pageSize)
        status['totalpagenum'] = query.pages

        if query:
            user = business_rules.determine_student_course(query)
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
        up = Student()
        up.ic_no = params['icNo']
        up.matrix_no = params['matrixNo']
        up.name = params['name']
        entry = params["entrySessionMonth"] + "/" + params["entrySessionYear"]
        up.entry_session = entry
        up.year_of_graduate = params['yearOfGrade']
        up.status = params['status']
        up.faculty_id = params['faculty_id']
        up.program_id = params['program_id']
        db.session.add(up)
        status['message'] = "Record added succesfully"

    except:
        db.session.rollback()
        status['message'] = func.error_log()
        status['code'] = 'Error'
    finally:
        db.session.commit()
        return status


def addStudentCourse(params) -> dict:
    status = func.define_status()
    try:

        get_student = Student.query.filter_by(matrix_no=params['matrixNo']).first()
        if get_student:
            up = db.session.query(Grade).filter_by(student_id=get_student.id).first()
            check = False
            if not up:
                check = True
                up = Grade()
            up.course_id = params['course']
            up.student_id = get_student.id
            up.grade = params['grade']
            if check:
                db.session.add(up)
            status['message'] = "Record added succesfully"
        else:
            status['message'] = "Student Not Exist"

    except:
        db.session.rollback()
        status['message'] = func.error_log()
        status['code'] = 'Error'
    finally:
        db.session.commit()
        return status


def update_existing(params) -> dict():
    status = func.define_status()
    print(params, "SS")
    try:

        record = business_rules.check_exist(params['id'])

        if record:

            up = db.session.query(Student).get(params['id'])
            up.ic_no = params['icNo']
            up.matrix_no = params['matrixNo']
            up.name = params['name']
            entry = params["entrySessionMonth"] + "/" + params["entrySessionYear"]
            up.entry_session = entry
            up.year_of_graduate = params['yearOfGrade']
            up.status = params['status']
            up.faculty_id = params['faculty_id']
            up.program_id = params['program_id']
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


def updateStudentCourse(params) -> dict():
    status = func.define_status()
    print(params, "SS")
    try:

        record = business_rules.check_existdeleteStudentCourse(params['id'])

        if record:

            up = db.session.query(Grade).get(params['id'])
            up.course_id = params['course']
            up.student_id = params['matrixNo']
            up.grade = params['grade']
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
        if record:
            # get = Student.query.get(params['id'])
            # if get and get.grade_student:
            #     status['message'] = f"Failed to delete, Record in use"
            # else:
            db.session.query(Student).filter_by(id=params['id']).delete()
            status['message'] = f"Record deleted succesfully"
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


def deleteStudentCourse(params) -> dict():
    status = func.define_status()

    try:
        record = business_rules.check_existdeleteStudentCourse(params['id'])
        if record:
            # get = Student.query.get(params['id'])
            # if get and get.grade_student:
            #     status['message'] = f"Failed to delete, Record in use"
            # else:
            db.session.query(Grade).filter_by(id=params['id']).delete()
            status['message'] = f"Record deleted succesfully"
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
