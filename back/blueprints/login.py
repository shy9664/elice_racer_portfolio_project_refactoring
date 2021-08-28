from flask import Blueprint, request, jsonify, session
from models.user import User

Login = Blueprint('Login', __name__, url_prefix='/api')

@Login.route('/', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        user_id = request.form['user_id']
        user_pw = request.form['user_pw']
        user = User.query.filter(User.user_id == user_id, User.user_pw == user_pw).first()
        
        if user :
            session['login'] = user.user_id
            return jsonify(data = {'user_id': user.user_id})

        return jsonify('존재하지않는 아이디이거나 비밀번호가 일치하지 않습니다.')
    
    # 로그인 페이지 구현 필요하나? 데이터 받아올 때. 음.. 로그인데이터를 받아올 일이 있나..? 로그인 페이지? 여기서? 굳이?
    print(session['login'])
    return jsonify(data = {'user_id':session['login']})