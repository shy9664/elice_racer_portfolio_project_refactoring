from flask import Blueprint, jsonify, session

Logout = Blueprint('Logout', __name__)

@Logout.route('/logout')
def logout():
    try:  # try로 일단 에러 통과시켜서 CORS에러가 없는걸 보니, CORS문제가 아니라, 세션 키 문제가 맞네. 
        print('session loading..')
        print('session access succeed', session.get('login'))
    except:
        print('session access fail')
    print(session.items())
    session.clear()
    print(session.items())
    # 여기에, 'session['login']'님의 로그아웃을 완료하였습니다를 응답으로 하게끔 하고싶은데. 
    return jsonify('로그아웃을 완료하였습니다')
