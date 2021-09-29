from flask import Blueprint, jsonify, session

Logout = Blueprint('Logout', __name__)

@Logout.route('/logout')
def logout():
    user = session['login']
    session.clear()
    print('logout bye session', session.items())
    # 여기에, 'session['login']'님의 로그아웃을 완료하였습니다를 응답으로 하게끔 하고싶은데. 
    return jsonify(f'{user}님의 로그아웃을 완료하였습니다')
