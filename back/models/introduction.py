from db_connect import db

class Introduction(db.Model):
    __tablename__ = 'introduction'
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id = db.Column(db.ForeignKey('User.user_id'))
    name = db.Column(db.String(10), nullable=False)
    photo = db.Column(db.String(100))    # 나중에 사진 주소?
    introduction = db.Column(db.String(50))



