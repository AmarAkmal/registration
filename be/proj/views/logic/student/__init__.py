from proj.views.logic.student import business_process


def get_list(params) -> dict:
    status = business_process.list_(params)
    return status


def get_list(params) -> dict:
    status = business_process.list_(params)
    return status


def get_list_student_course(params) -> dict:
    status = business_process.list_get_list_student_course(params)
    return status


def add_new(params) -> dict:
    status = business_process.add_new(params)
    return status

def addStudentCourse(params) -> dict:
    status = business_process.addStudentCourse(params)
    return status

def addStudentGrade(params) -> dict:
    status = business_process.addStudentGrade(params)
    return status


def update_(params) -> dict:
    status = business_process.update_existing(params)
    return status

def updateStudentCourse(params) -> dict:
    status = business_process.updateStudentCourse(params)
    return status

def updateStudentGrade(params) -> dict:
    status = business_process.updateStudentGrade(params)
    return status


def delete_(params) -> dict:
    status = business_process.delete_(params)
    return status

def deleteStudentCourse(params) -> dict:
    status = business_process.deleteStudentCourse(params)
    return status
