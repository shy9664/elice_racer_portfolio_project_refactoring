from db_connect import db

class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id = db.Column(db.String(20), unique=True, nullable=False)  # 나중에 이메일형식
    user_pw = db.Column(db.String(20), nullable=False)  # 나중에 암호화 고려 
    name = db.Column(db.String(10), nullable=False)

    def __init__(self, user_id, user_pw, name):
        self.user_id = user_id
        self.user_pw = user_pw
        self.name = name


