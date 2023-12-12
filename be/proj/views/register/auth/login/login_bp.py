import jwt

from proj import app
from proj.models import db
from proj.models.model import *
from proj.views.func import error_log


def login(param):
    response = dict()
    response['status'] = "OK"
    response['data'] = dict()
    response['error'] = "-"
    response['message'] = "Logged in successfully"
    response['code'] = "101"
    try:
        # functional code
        usernameStatus = False

        up = User.query.filter(User.email == param['username'], User.password == param['password'],
                               User.is_deleted == False).first()
        if up:
            usernameStatus = True
        if not usernameStatus:
            response['code'] = "100"
            response['message'] = "Please enter username or password correctly"
        if usernameStatus:
            jwt_data = dict()
            jwt_data["id"] = up.id
            jwt_data["user_id"] = up.user_id
            jwt_data["user_role"] = up.user_type
            jwt_data["user_staff_name"] = up.name
            jwt_data["user_email"] = up.email
            jwt_data["user_phone"] = up.phone
            jwt_data["user_department"] = up.department.name
            jwt_data["user_department_id"] = up.department.id
            # jwt_data["exp"] = datetime.now() + timedelta(minutes=45)

            token = jwt.encode(
                jwt_data,
                app.config['SECRET_KEY'],
                app.config['JWT_ALGORITHM'])
            jwt_data["token"] = token.decode('UTF-8')

            response['data'] = jwt_data

    except Exception as e:
        error_log()
        response['message'] = str(e)
        response['code'] = ""
        response['error'] = str(e)
        response['status'] = "FAILED"
        if str(e) == "No Data":
            response['message'] = "No Data"
            response['code'] = "010"
        db.session.rollback()
    finally:
        return response
