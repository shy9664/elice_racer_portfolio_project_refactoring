from flask import Blueprint, jsonify, request
from models.user import User

Network = Blueprint('Network', __name__, url_prefix='/api')

@Network.route('/network')
def network():
  if request.args['search'] == 'all':
    all_user = User.query.all()

    users = []
    for user in all_user:
      users.append({
        'user_name':user.name,
        'user_id':user.user_id
      })
    return jsonify(data = users)

  else:
    search_value = request.args['search'] 
    searched_users = User.query.filter(User.name.like(f'%{search_value}%')).all()

    users = []
    for user in searched_users:
      users.append({
        'user_name':user.name,
        'user_id':user.user_id
      })
    return jsonify(data = users)
