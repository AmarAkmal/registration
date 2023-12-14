import base64
import json

from flask import Blueprint, request, jsonify

from proj.models.model import *
from proj.views import func
from proj.views.logic import student
from proj.views.process_before import token_required

bp_student = Blueprint('bp_student', __name__)


@bp_student.before_request
def before_request():
    token_required()


@bp_student.route('/list', methods=['POST'])
def get_list():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)
        params["department_id"] = request.args['user_department_id']
        params["user_role"] = request.args['user_role']

        result = student.get_list(params)
    except Exception as e:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_student.route('/listStudentCourse', methods=['POST'])
def get_list_student_course():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)
        params["department_id"] = request.args['user_department_id']
        params["user_role"] = request.args['user_role']

        result = student.get_list_student_course(params)
    except Exception as e:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_student.route('/add_', methods=['POST'])
def add():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)

        up = student.add_new(params)

        result['data'] = []
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
        result = up
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_student.route('/addStudentCourse', methods=['POST'])
def addStudentCourse():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)
        params["department_id"] = request.args['user_department_id']
        up = student.addStudentCourse(params)

        result['data'] = []
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
        result = up
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_student.route('/addStudentGrade', methods=['POST'])
def addStudentGrade():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)
        params["department_id"] = request.args['user_department_id']
        up = student.addStudentGrade(params)

        result['data'] = []
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
        result = up
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_student.route('/update_', methods=['POST'])
def update_():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)
        user_id = request.args['user_id']
        staff_name = request.args['user_staff_name']

        up = student.update_(params)

        result['data'] = [up]
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_student.route('/updateStudentCourse', methods=['POST'])
def updateStudentCourse():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)
        user_id = request.args['user_id']
        staff_name = request.args['user_staff_name']

        up = student.updateStudentCourse(params)

        result['data'] = [up]
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_student.route('/updateStudentGrade', methods=['POST'])
def updateStudentGrade():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)
        user_id = request.args['user_id']
        staff_name = request.args['user_staff_name']

        up = student.updateStudentGrade(params)

        result['data'] = [up]
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_student.route('/delete_', methods=['POST'])
def delete_():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)

        up = student.delete_(params)

        result['data'] = up
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_student.route('/deleteStudentCourse', methods=['POST'])
def deleteStudentCourse():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)

        up = student.deleteStudentCourse(params)

        result['data'] = up
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_student.route('/username', methods=['POST'])
def get_username():
    result = func.define_status()
    try:
        user = User.query.filter(User.is_deleted == False).all()
        for i in user:
            result['data'].append(i.name)
        # print(result['data'])
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_student.route('/department', methods=['POST'])
def get_department():
    result = func.define_status()
    try:
        role = request.args['user_role']
        print(request.args)
        department = Department.query
        if role == 'Super Admin':
            pass
        else:
            department = department.filter(Department.id == request.args['user_department_id'])
        for i in department:
            result['data'].append({
                'id': i.id,
                'name': i.name
            })
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg
    return jsonify(result)


@bp_student.route('/program', methods=['POST'])
def get_program():
    result = func.define_status()
    try:
        role = request.args['user_role']

        query = Program.query
        if role == 'Super Admin':
            pass
        else:
            query = query.filter(Program.department_id == request.args['user_department_id'])
        for i in query:
            result['data'].append({
                'id': i.id,
                'name': i.name
            })
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg
    return jsonify(result)


@bp_student.route('/get_course', methods=['POST'])
def get_course():
    result = func.define_status()
    try:
        list_ = Course.query.filter_by(faculty_id=request.args['user_department_id']).all()
        for i in list_:
            result['data'].append({
                'id': i.id,
                'name': i.name
            })
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg
    return jsonify(result)


@bp_student.route('/get_student', methods=['POST'])
def get_student():
    result = func.define_status()
    try:
        get_exist = Grade.query.all()
        studentList = []
        for x in get_exist:
            studentList.append(x.student_id)
        print(studentList)
        list_ = Student.query.filter(Student.id.notin_(studentList))
        for i in list_:
            result['data'].append({
                'id': i.id,
                'matrixNo': i.matrix_no,
                'studentName': i.name
            })
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg
    return jsonify(result)


@bp_student.route('/get_student_update', methods=['POST'])
def get_student_update():
    result = func.define_status()
    try:

        list_ = Student.query
        for i in list_:
            result['data'].append({
                'id': i.id,
                'matrixNo': i.matrix_no,
                'studentName': i.name
            })
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg
    return jsonify(result)
