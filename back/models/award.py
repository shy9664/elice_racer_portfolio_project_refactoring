from db_connect import db

class Award(db.Model):
    __tablename__ = 'award'
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id = db.Column(db.ForeignKey('User.user_id'))
    title = db.Column(db.String(20), nullable=False)
    detail = db.Column(db.String(50), nullable=False)

    def __init__(self, user_id, title, detail):
        self.user_id = user_id
        self.title = title
        self.detail = detail


