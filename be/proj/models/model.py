from proj import app, db
import uuid, bcrypt


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
    record_user = db.relationship("Record", backref="user")

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
    created_by = db.Column(db.String(32), db.ForeignKey('user.id', ondelete="CASCADE", onupdate="CASCADE"))
    date_created = db.Column(db.DateTime, default=db.func.current_timestamp())

    def __init__(self):
        self.id = uuid.uuid4().hex


class Department(db.Model):
    id = db.Column(db.String(32), primary_key=True)
    name = db.Column(db.String(50))
    user_department = db.relationship("User", backref="department")

    def __init__(self):
        self.id = uuid.uuid4().hex
