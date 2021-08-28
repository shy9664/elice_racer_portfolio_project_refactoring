from flask import Blueprint, request, jsonify
from models.certificate import Certificate
from db_connect import db

certificate = Blueprint('certificate', __name__, url_prefix='/portfolio')

@certificate.route('/certificate', methods=['GET', 'POST', 'PATCH', 'DELETE'])
def certificates():
    if request.method == 'POST':
        title = request.form['title']
        organization = request.form['organization']
        date = request.form['date']
        user_id = request.form['user_id']

        new_certificate = Certificate(user_id, title, organization, date)
        db.session.add(new_certificate)
        db.session.commit()

        return jsonify('자격증 등록이 완료되었습니다!')
    
    elif request.method == 'PATCH':
        id = request.form['id']
        title = request.form['title']
        organization = request.form['organization']
        date = request.form['date']

        stored_certificate = Certificate.query.filter(Certificate.id == id).first()
        stored_certificate.title = title
        stored_certificate.organization = organization
        stored_certificate.date = date
        db.session.commit()
        return jsonify('자격증 수정이 완료되었습니다')

    elif request.method == 'DELETE':
        cert_id = request.args['cert_id']

        stored_certificate = Certificate.query.filter(Certificate.id == cert_id).first()
        db.session.delete(stored_certificate)
        db.session.commit()
        return jsonify('자격증 삭제가 완료되었습니다')
    else:
        user_id = request.args['id']
        stored_certificate = Certificate.query.filter(Certificate.user_id == user_id).all()

        datas = [] 
        for data in stored_certificate:
            datas.append({
            'id': data.id,
            'title': data.title,
            'organization': data.organization,
            'date': data.date
            })
        return jsonify(data = datas)