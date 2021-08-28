from flask import Blueprint, request, jsonify
from models.achievement import Achievement
from db_connect import db

achievement = Blueprint('achievement', __name__, url_prefix='/portfolio')

@achievement.route('/achievement', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def achievements():
    if request.method == 'POST':
        school = request.form['school']
        major = request.form['major']
        degree = request.form['degree']
        
        # 나중에 세션으로 집어넣어야할듯. 
        user_id = request.form['user_id']

        new_achievement = Achievement(user_id, school, major, degree)
        db.session.add(new_achievement)
        db.session.commit()

        return jsonify('학력 등록이 완료되었습니다!')

    elif request.method == 'PATCH':
        # 일단 patch테스트 완료 
        # id = request.form['id']
        # achievement = Achievement.query.filter(Achievement.id == id).first()
        
        # achievement.school = request.form['school']
        # achievement.major = request.form['major']
        # achievement.degree = request.form['degree']

        # # 나중에 세션으로 집어넣어야할듯. 
        # user_id = request.form['user_id']
        # db.session.commit()
        pass
        return jsonify('학력 변경이 완료되었습니다!')
    elif request.method == 'DELETE':
        pass
    else: 
        # GET이 따로 필요한가? 첨에 저장된 데이터를 불러올 때 쓰나? 
        return jsonify('GET page')
