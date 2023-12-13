import json

from flask import Blueprint, request, jsonify

from proj.views import func
from proj.views.logic.auth.login import bp_login
from proj.views.logic.others.return_format import return_status

bp_auth = Blueprint('bp_auth', __name__)


@bp_auth.route('/login', methods=['POST'])
def login():
    try:
        params = request.form['data']
        params = json.loads(params)

        result = bp_login(params)

    except:
        msg = func.error_log()
        result = return_status(code='000', data='', description=str(msg), status="FAILED")

    return jsonify(result)
