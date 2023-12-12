import datetime
import os
import sys

from colorama import Back, Style

from proj.models import db


def define_status() -> dict:
    return {
        'code': 'OK',
        'message': '',
        'data': []
    }


def error_log() -> str:
    exc_type, exc_obj, exc_tb = sys.exc_info()
    fname = os.path.split(exc_tb.tb_frame.f_code.co_filename)[1]
    msg = exc_obj, fname, "Line number : ", exc_tb.tb_lineno
    print(Back.LIGHTRED_EX + "\n############################")
    print(Back.LIGHTRED_EX + "############################")
    print(msg)
    print("############################")
    print("############################\n")
    print(Style.RESET_ALL)
    db.session.rollback()
    return str(msg)


def convert(object):
    try:
        data = object.__dict__.copy()
        if data.get("_sa_instance_state", False):
            del data["_sa_instance_state"]

        if data.get("_sa_adapter", False):
            del data["_sa_adapter"]

        datetime_type = type(datetime.datetime(2022, 1, 1))
        date_type = type(datetime.date(2022, 1, 1))
        # data["lob"] = object.demand_request2.requestor_lob
        for (k, v) in data.items():

            if isinstance(v, datetime_type):
                data[k] = v.strftime("%Y-%m-%d %H:%M:%S")
            elif isinstance(v, date_type):
                data[k] = v.strftime("%Y-%m-%d")

    except:
        data = {}

    return data
