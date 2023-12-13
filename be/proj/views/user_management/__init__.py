import base64
import json

from flask import Blueprint, request, jsonify

from proj.models.model import *
from proj.views import func
from proj.views.process_before import token_required
from proj.views.logic import user_management

bp_user_management = Blueprint('bp_user_management', __name__)


@bp_user_management.before_request
def before_request():
    token_required()


@bp_user_management.route('/list', methods=['POST'])
def get_list_user_profile():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)
        user_id = request.args['user_id']

        # isAdmin = User.query.filter(User.user_id == 'Admin').first()
        #
        # if isAdmin and not isAdmin.user_type:
        #     raise Exception("Not Authorized")

        result = user_management.get_list_user_profile(params)
    except Exception as e:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_user_management.route('/add_user', methods=['POST'])
def add_user():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)
        up = user_management.add_user_profile(params)

        result['data'] = []
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
        result = up
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_user_management.route('/update_user', methods=['POST'])
def update_user_details():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)
        user_id = request.args['user_id']
        staff_name = request.args['user_staff_name']

        up = user_management.update_user_profile(params)

        result['data'] = [up]
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_user_management.route('/delete_user', methods=['POST'])
def delete_user():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)
        user_id = request.args['user_id']
        staff_name = request.args['user_staff_name']

        up = user_management.delete_user_profile(params)
        result['data'] = [up]
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_user_management.route('/username', methods=['POST'])
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


@bp_user_management.route('/email', methods=['POST'])
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


@bp_user_management.route('/userId', methods=['POST'])
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


@bp_user_management.route('/department', methods=['POST'])
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


@bp_user_management.route('/change_pass', methods=['POST'])
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
        status = user_management.change_pass(params)

        result['code'] = status['code']
        result['message'] = status['message']
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)
