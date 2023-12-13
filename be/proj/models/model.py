import uuid

import bcrypt

from proj import db


class User(db.Model):
    id = db.Column(db.String(32), primary_key=True)
    user_id = db.Column(db.String(250), unique=True)
    name = db.Column(db.String(250))
    email = db.Column(db.String(250), unique=True)
    password = db.Column(db.String(100))
    phone = db.Column(db.String(100))
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())
    user_type = db.Column(db.String(32))
    is_deleted = db.Column(db.Boolean, default=0)
    department_id = db.Column(db.String(32), db.ForeignKey('department.id', ondelete="CASCADE", onupdate="CASCADE"))

    def __init__(self):
        self.id = uuid.uuid4().hex

    def check_password(self, password):
        try:
            return bcrypt.checkpw(password.encode('utf8'), self.password.encode('utf8'))
        except Exception as e:
            return False

    def update_password(self, password):
        try:
            self.password = bcrypt.hashpw(password.encode('utf8'), bcrypt.gensalt(12))
            return True
        except Exception as e:
            return False


class Record(db.Model):
    id = db.Column(db.String(32), primary_key=True)
    kod = db.Column(db.String(50))
    name = db.Column(db.String(50))
    quantity = db.Column(db.String(50))
    created_by = db.Column(db.String(50))
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __init__(self):
        self.id = uuid.uuid4().hex


class Department(db.Model):  ## Faculty
    id = db.Column(db.String(32), primary_key=True)
    code = db.Column(db.String(50))
    name = db.Column(db.String(200))
    user_faculty = db.relationship("User", backref="department", cascade="all,delete")
    program_faculty = db.relationship("Program", backref="department", cascade="all,delete")
    course_faculty = db.relationship("Course", backref="department", cascade="all,delete")
    student_faculty = db.relationship("Student", backref="department", cascade="all,delete")

    def __init__(self):
        self.id = uuid.uuid4().hex


class Program(db.Model):
    id = db.Column(db.String(32), primary_key=True)
    code = db.Column(db.String(50))
    name = db.Column(db.String(200))
    department_id = db.Column(db.String(32), db.ForeignKey('department.id', ondelete="CASCADE", onupdate="CASCADE"))
    student_program = db.relationship("Student", backref="program", cascade="all,delete")
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())

    # student_program = db.relationship("Student", backref="program", cascade="all,delete")

    def __init__(self):
        self.id = uuid.uuid4().hex


class Course(db.Model):  ## Kursus
    id = db.Column(db.String(32), primary_key=True)
    code = db.Column(db.String(50))
    name = db.Column(db.String(200))
    section = db.Column(db.String(200))
    credit_hours = db.Column(db.String(200))
    result = db.Column(db.String(200))
    faculty_id = db.Column(db.String(32), db.ForeignKey('department.id', ondelete="CASCADE", onupdate="CASCADE"))
    grade_program = db.relationship("Grade", backref="course", cascade="all,delete")

    def __init__(self):
        self.id = uuid.uuid4().hex


class Grade(db.Model):  ## Grade
    id = db.Column(db.String(32), primary_key=True)
    course_id = db.Column(db.String(32), db.ForeignKey('course.id', ondelete="CASCADE", onupdate="CASCADE"))
    student_id = db.Column(db.String(32), db.ForeignKey('student.id', ondelete="CASCADE", onupdate="CASCADE"))
    grade = db.Column(db.String(200))

    def __init__(self):
        self.id = uuid.uuid4().hex


class Student(db.Model):
    id = db.Column(db.String(32), primary_key=True)
    ic_no = db.Column(db.String(50))
    matrix_no = db.Column(db.String(100))
    name = db.Column(db.String(200))
    entry_session = db.Column(db.String(100))
    year_of_graduate = db.Column(db.String(100))
    status = db.Column(db.String(100))
    faculty_id = db.Column(db.String(32), db.ForeignKey('department.id', ondelete="CASCADE", onupdate="CASCADE"))
    program_id = db.Column(db.String(32), db.ForeignKey('program.id', ondelete="CASCADE", onupdate="CASCADE"))
    grade_student = db.relationship("Grade", backref="student", cascade="all,delete")
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __init__(self):
        self.id = uuid.uuid4().hex
