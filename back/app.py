from flask import Flask
from flask_cors import CORS

from blueprints.login import Login
from blueprints.register import Register
from blueprints.logout import Logout
from blueprints.network import Network

from blueprints.portfolio.achievement import achievement
from blueprints.portfolio.certificate import certificate

from db_connect import db

from secret import secret_key

from flask_session import Session

def create_app():
  app = Flask(__name__)
  
  app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root:root@127.0.0.1:3306/racer_portfolio'
  app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
  # app.config['SESSION_TYPE'] = 'filesystem'
  app.secret_key = 'adhadghagdh'
  app.config['SESSION_COOKIE_SAMESITE'] = "None"
  app.config['SESSION_COOKIE_SECURE'] = "True"
  # Session(app)

  db.init_app(app)

  CORS(app, supports_credentials=True)  # 프론트에서 withCredential했을 때 
                                        # 여기서 support_credentials 안해주면 cors에러나는데
                                        # 일단 이렇게 해결되긴하네. 
                                        # 근데 뭐.. 프론트에서 withCredential 안했을 때 여기서도 안해주면
                                        # cors에러 안났었음.. 당장에는 session file error가 문제.. 
                                        # 아.. 이거는 그냥,, 프론트에서 withCredential했으면 꼭 해줘야하는건가본데..? 
                                        # 만약 프론트에서 안했으면 해도 되고 안해도 되는거고. 
                                        # 당장은 cors에러가 없어서 이렇게 생각하는 걸지도..? 

  app.register_blueprint(Login)
  app.register_blueprint(Register)
  app.register_blueprint(Logout)
  app.register_blueprint(Network)

  app.register_blueprint(achievement)
  app.register_blueprint(certificate)

  return app

create_app().run(debug=True)