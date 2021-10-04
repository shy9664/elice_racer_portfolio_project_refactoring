from flask import Blueprint, request, jsonify
from flask_bcrypt import Bcrypt
from models.user import User
from db_connect import db


Register = Blueprint('Register', __name__)
bcrypt = Bcrypt()

@Register.route('/register', methods=['GET', 'POST'])
def register():
    if request.method == 'POST':
        user_id = request.form['user_id']
        user_pw = request.form['user_pw']
        user_pw2 = request.form['user_pw2']
        user_name = request.form['user_name']
        user = User.query.filter(User.user_id == user_id).first()

        if user:
            return jsonify(result='이미 존재하는 아이디입니다.')
        if user_pw != user_pw2:
            return jsonify(result='비밀번호가 일치하지 않습니다.')

        hashed_password = bcrypt.generate_password_hash(user_pw).decode()

        new_user = User(user_id, hashed_password, user_name)
        db.session.add(new_user)
        db.session.commit()

        return jsonify(result='회원가입이 완료되었습니다!')
    
    # 회원가입 페이지 구현.. 음.. 데이터 받아올땐 해야지.
    return