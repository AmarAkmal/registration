import os
import urllib.parse

from flask import send_from_directory
from werkzeug.utils import secure_filename


def return_status(code, data, description="-", status="OK"):
    return {"code": code, "data": data, "description": description, "status": status}


def download_file(app, id, name):
    name = urllib.parse.unquote(name)

    uploads = os.path.join(app.root_path, app.config['UPLOAD_FOLDER'], id)
    filename = secure_filename(name)

    return send_from_directory(directory=uploads, filename=filename, as_attachment=True)
