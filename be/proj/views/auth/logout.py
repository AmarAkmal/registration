from flask import Blueprint, render_template, request, make_response, jsonify
from proj.models.model_user import *
from proj.views import func
from proj.views.audit_trail import add_audit_trail
from proj.views.register.auth.login import bp_login
from proj.views.register.others.global_variable_settings import prod_upload_path
from proj.views.register.others.return_format import return_status
from proj import app
from proj.views.process_before import token_required

bp_logout = Blueprint('bp_logout', __name__)


@bp_logout.before_request
def before_request():
    token_required()


@bp_logout.route('/logout_audit_trail', methods=['POST'])
def logout_audit_trail():
    try:
        user_id = request.args['user_id']
        staff_name = request.args['user_staff_name']

        add_audit_trail(user_id, "Logout",
                        "User " + staff_name + " has been logged out")
        result = return_status(code='101', data='Successfully logged out', description="Successfully logged out",
                               status="OK")

    except:
        msg = func.error_log()
        result = return_status(code='000', data='', description=str(msg), status="FAILED")

    return jsonify(result)
