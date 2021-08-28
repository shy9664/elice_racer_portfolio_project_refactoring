from db_connect import db

class Certificate(db.Model):
    __tablename__ = 'certificate'
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id = db.Column(db.ForeignKey('user.user_id'))
    title = db.Column(db.String(20), nullable=False)
    organization = db.Column(db.String(20), nullable=False)
    date = db.Column(db.Integer, nullable=False)  # 날짜형식 

    def __init__(self, user_id, title, organization, date):
        self.user_id = user_id
        self.title = title
        self.organization = organization
        self.date = date