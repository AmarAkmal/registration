import base64
import json

from flask import Blueprint, request, jsonify

from proj.models.model import *
from proj.views import func
from proj.views.process_before import token_required
from proj.views.register import setting

bp_setting = Blueprint('bp_setting', __name__)


@bp_setting.before_request
def before_request():
    token_required()


@bp_setting.route('/list-department', methods=['POST'])
def get_list():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)

        result = setting.get_list(params)
    except Exception as e:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_setting.route('/add', methods=['POST'])
def add():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)
        params["created_by"] = request.args['user_staff_name']

        up = record.add_new(params)

        result['data'] = []
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
        result = up
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_setting.route('/update_department', methods=['POST'])
def update_department():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)
        user_id = request.args['user_id']
        staff_name = request.args['user_staff_name']

        up = setting.update_(params)

        result['data'] = [up]
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)


@bp_setting.route('/delete_', methods=['POST'])
def delete_():
    result = func.define_status()
    try:
        params = request.form['ref']
        params = params.encode('ascii')
        params = base64.b64decode(params)
        params = params.decode('ascii')
        params = json.loads(params)
        user_id = request.args['user_id']
        staff_name = request.args['user_staff_name']

        up = record.delete_(params)

        result['data'] = [up]
        result['code'] = 'OK'
        result['message'] = "Everything works perfectly"
    except:
        msg = func.error_log()
        result['code'] = 'Error'
        result['message'] = msg

    return jsonify(result)
