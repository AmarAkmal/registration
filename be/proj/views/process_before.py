import jwt
from flask import abort
from flask import request

from proj import app


def token_required():
    try:
        if request.method == 'OPTIONS':
            pass
        else:
            token = request.headers['x-access-token']
            if token and token != 'null':
                token_payload = jwt.decode(token, app.config['SECRET_KEY'], algorithm=app.config['JWT_ALGORITHM'])

                payload = request.args.copy()
                payload["user_id"] = token_payload["user_id"]
                payload["user_role"] = token_payload["user_role"]
                payload["user_department"] = token_payload["user_department"]
                payload["user_department_id"] = token_payload["user_department_id"]
                payload["user_staff_name"] = token_payload["user_staff_name"]
                payload["user_email"] = token_payload["user_email"]

                request.args = payload

                if not token_payload:
                    return abort(401)

                # request.args = c
                # if not current_user:
                #     return abort(401)
    except Exception as e:
        print('ERROR BEFORE REQUEST>>', e)
        # print(request.headers['x-access-token'])
        return abort(401)
