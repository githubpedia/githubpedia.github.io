# Due to most of the site containing code that requires the site to be on a https protocol,
# this file is used for debugging.
from flask import Flask, Response, abort, send_file
import os, sys

if not __name__ == '__main__':
    print("__name__ is not __main__")
    sys.exit(0)
app = Flask(__name__)

@app.after_request
def add_header(r):
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    return r

@app.route("/")
def index():
    return getPage("index.html")

@app.route("/<path:path>")
def catchAll(path):
    if not os.path.isfile(path):
        return abort(404)
    return getPage(path)

def getPage(path):
    return send_file(path)

app.run("0.0.0.0", 25571, True)
