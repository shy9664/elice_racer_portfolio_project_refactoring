from flask import Blueprint, request, jsonify, session
from flask_bcrypt import Bcrypt

from models.user import User

import re 

Login = Blueprint('Login', __name__)
bcrypt = Bcrypt()

@Login.route('/', methods=['GET', 'POST'])  # GET은 이따 없애도 될듯.
def login():
    if request.method == 'POST':
        try: 
            user_id = request.form['user_id']
            user_pw = request.form['user_pw']
            user = User.query.filter(User.user_id == user_id).first()

            id_regex = re.compile('^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$')
            if not id_regex.match(user_id):
                return 400

            if not bcrypt.check_password_hash(user.user_pw, user_pw):
                return 400
                
            if user :
                session['login'] = user.user_id
                return jsonify(data = {'user_id': session['login']})

        except:
            return jsonify('존재하지않는 아이디이거나 비밀번호가 일치하지 않습니다')  

    print(session.items())
    return jsonify(data = {'user_id':session['login']})