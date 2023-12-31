import os
import sys

from flask import Blueprint, jsonify

from proj.models.model import *

bp_add_data = Blueprint('bp_add_data', __name__)


@bp_add_data.route('/insert_admin_user', methods=['GET'])
def insert_admin_user():
    data = "Failed"

    try:
        add_depart = Department()
        add_depart.name = "ABC"
        add_depart.code = "01ABC"
        db.session.add(add_depart)

        up = User()
        up.user_id = "111"+add_depart.name
        up.name = "Admin 1 "+add_depart.name
        up.email = "admin"+add_depart.name+"@mail.com"
        up.password = "123456"
        up.phone = "017777777"
        up.user_type = "Admin"
        up.department_id = add_depart.id
        db.session.add(up)

        up = User()
        up.user_id = "222"+add_depart.name
        up.name = "Super Admin 1 "+add_depart.name
        up.email = "superadmin"+add_depart.name+"@mail.com"
        up.password = "123456"
        up.phone = "017777778"
        up.user_type = "Super Admin"
        up.department_id = add_depart.id
        db.session.add(up)

        up = User()
        up.user_id = "333"+add_depart.name
        up.name = "Normal User 1 "+add_depart.name
        up.email = "user"+add_depart.name+"@mail.com"
        up.password = "123456"
        up.phone = "017777779"
        up.user_type = "Normal"
        up.department_id = add_depart.id
        db.session.add(up)


        #####################
        add_depart = Department()
        add_depart.name = "DEF"
        add_depart.code = "01DEF"
        db.session.add(add_depart)

        up = User()
        up.user_id = "111"+add_depart.name
        up.name = "Admin 1 " + add_depart.name
        up.email = "admin"+add_depart.name+"@mail.com"
        up.password = "123456"
        up.phone = "017777777"
        up.user_type = "Admin"
        up.department_id = add_depart.id
        db.session.add(up)


        up = User()
        up.user_id = "333"+add_depart.name
        up.name = "Normal User 1 "+ add_depart.name
        up.email = "user"+add_depart.name+"@mail.com"
        up.password = "123456"
        up.phone = "017777779"
        up.user_type = "Normal"
        up.department_id = add_depart.id
        db.session.add(up)

        db.session.commit()

        data = "Success"

    except Exception as e:
        db.session.rollback()
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        msg = exc_obj, fname, "Line number : ", exc_tb.tb_lineno
        print(msg)
    return jsonify(data)


@bp_add_data.route('/insert_dummy_user', methods=['POST'])
def insert_dummy_user():
    data = ""

    try:
        up = UserProfile("fadhli", "123456", "Fadhli Asyraf", "UGAT", "fad@mail.com")
        su = SystemUser(1)
        su.user_profile_id = up.user_id
        db.session.add(up)
        db.session.add(su)

        up2 = UserProfile("acapu", "123456", "Acapu Acapu", "BPK", "acapu@mail.com")
        su2 = SystemUser(1)
        su2.user_profile_id = up2.user_id
        db.session.add(up2)
        db.session.add(su2)
        db.session.commit()
        data = "success"

    except Exception as e:
        exc_type, exc_obj, exc_tb = sys.exc_info()
        fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
        msg = exc_obj, fname, "Line number : ", exc_tb.tb_lineno
        print(msg)
    return jsonify(data)
