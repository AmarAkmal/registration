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
        department = Department.query.all()
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
        department = Program.query.all()
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
