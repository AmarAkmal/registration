from flask import Flask
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from proj import config

db = SQLAlchemy()

app = Flask(__name__, instance_relative_config=True)


def intial_app(config_name='development'):
    CORS(app)

    app.config.from_object(config.config_setting[config_name])  # object-based default configuration
    app.config.from_pyfile('flask.cfg', silent=True)  # instance-folders configuration

    db.init_app(app)

    from proj.views.auth import bp_auth
    app.register_blueprint(bp_auth, url_prefix='/auth')

    from proj.views.add_data import bp_add_data
    app.register_blueprint(bp_add_data, url_prefix='/add_data')

    from proj.views.record import bp_record
    app.register_blueprint(bp_record, url_prefix='/record')

    from proj.views.program import bp_program
    app.register_blueprint(bp_program, url_prefix='/program')

    from proj.views.user_management import bp_user_management
    app.register_blueprint(bp_user_management, url_prefix='/user')

    from proj.views.setting import bp_setting
    app.register_blueprint(bp_setting, url_prefix='/setting')

    with app.app_context():
        # db.drop_all()
        db.create_all()

    return app
