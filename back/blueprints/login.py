from flask import Blueprint, request, jsonify, session
from models.user import User

Login = Blueprint('Login', __name__)

@Login.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_id = request.form['user_id']
        user_pw = request.form['user_pw']
        user = User.query.filter(User.user_id == user_id, User.user_pw == user_pw).first()
        
        if user :
            session['login'] = user.user_id
            return jsonify(data = {'user_id': session['login']})

        return jsonify('존재하지않는 아이디이거나 비밀번호가 일치하지 않습니다.')

    print(session.items())
    return jsonify(data = {'user_id':session['login']})