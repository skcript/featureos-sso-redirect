from flask import Flask, render_template, request, redirect
import jwt

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "<p>Hello, World!</p>"

@app.route("/login/")
def sign_in():
    domain = request.args.get("domain")
    redirect = request.args.get("redirect")
    return render_template("sign_in.html", domain=domain, redirect=redirect)

@app.route("/sign_in", methods=["POST"])
def sign_in_submit():
    domain = request.form.get("domain")
    redirect_url = request.form.get("redirect")
    email = request.form.get("email")
    name = request.form.get("name")
    user_data = {
        email: email,
        name: name
    }
    key = "XcZDHS9J5mdN-Jge59ZASg"
    token = jwt.encode(user_data, "secret", algorithm="HS256")
    url = "https://app.hellonext.co/redirects/sso?domain={}&redirect={}&ssoToken={}".format(domain, redirect_url, token)

    return redirect(url, code=302)

