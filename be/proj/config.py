class BaseConfig(object):
    DEBUG = False
    TESTING = False
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SECRET_KEY = 'secret'
    # DATABASE_URI = 'sqlite://:memory:'
    # SQLALCHEMY_DATABASE_URI ='sqlite:///test.db'
    UPLOAD_FOLDER = 'static/uploads'  # changed to relative path
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = '465'
    MAIL_USERNAME = 'msbremote111@gmail.com'
    MAIL_PASSWORD = 'P@ssw0rd123123'
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    JWT_ALGORITHM = "HS256"


class DevelopmentConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost/registration'
    DEBUG = True


class ProductionConfig(BaseConfig):
    SQLALCHEMY_DATABASE_URI = 'mysql+pymysql://root:@localhost/registration'
    DEBUG = True



config_setting = {
    "development": DevelopmentConfig,
    "production": ProductionConfig,
    "default": DevelopmentConfig
}
