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
  app.config['SESSION_TYPE'] = 'filesystem'
  app.secret_key = 'adhadghagdh'
  Session(app)

  db.init_app(app)

  CORS(app)  # , supports_credentials=True 와는 무관한것같은데.. 

  app.register_blueprint(Login)
  app.register_blueprint(Register)
  app.register_blueprint(Logout)
  app.register_blueprint(Network)

  app.register_blueprint(achievement)
  app.register_blueprint(certificate)

  return app

create_app().run(debug=True)