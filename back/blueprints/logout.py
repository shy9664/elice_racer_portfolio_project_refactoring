from flask import Blueprint, jsonify, session

Logout = Blueprint('Logout', __name__)

@Logout.route('/logout')
def logout():
    session.clear()
    return jsonify('로그아웃을 완료하였습니다')
