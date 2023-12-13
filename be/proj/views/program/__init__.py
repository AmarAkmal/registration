import base64
import json

from flask import Blueprint, request, jsonify

from proj.models.model import *
from proj.views import func
from proj.views.process_before import token_required
from proj.views.logic import program

bp_program = Blueprint('bp_program', __name__)


@bp_program.before_request
def before_request():
    token_required()


@bp_program.route('/list', methods=['POST'])
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


        result = program.get_list(params)
    except Exception as e:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_program.route('/add', methods=['POST'])
def add():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)

        params["department_id"] = request.args['user_department_id']

        up = program.add_new(params)

        result['data'] = []
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
        result = up
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_program.route('/update_', methods=['POST'])
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

        up = program.update_(params)

        result['data'] = [up]
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_program.route('/delete_', methods=['POST'])
def delete_():
    result = func.define_status()
    print(11111111111111)
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)

        up = program.delete_(params)

        result['data'] = [up]
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_program.route('/username', methods=['POST'])
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


@bp_program.route('/email', methods=['POST'])
def get_email():
    result = func.define_status()
    try:
        user = User.query.filter(User.is_deleted == False).all()
        for i in user:
            result['data'].append(i.email)
        # print(result['data'])
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg
    return jsonify(result)


@bp_program.route('/userId', methods=['POST'])
def get_userId():
    result = func.define_status()
    try:
        user = User.query.filter(User.is_deleted == False).all()
        for i in user:
            result['data'].append(i.user_id)
        # print(result['data'])
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg
    return jsonify(result)


@bp_program.route('/department', methods=['POST'])
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


@bp_program.route('/change_pass', methods=['POST'])
def change_password():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)
        # user_id = request.args['user_id']

        # isAdmin = model_user.SystemUser.query.filter(model_user.SystemUser.user_profile_id==user_id).first()

        # if isAdmin and not isAdmin.is_admin:
        #     raise Exception("Not Authorized")
        status = program.change_pass(params)

        result['code'] = status['code']
        result['message'] = status['message']
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)
