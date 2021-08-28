from db_connect import db

class Achievement(db.Model):
    __tablename__ = 'achievement'
    id = db.Column(db.Integer, primary_key=True, nullable=False, autoincrement=True)
    user_id = db.Column(db.ForeignKey('user.user_id'))
    school = db.Column(db.String(20), nullable=False)
    major = db.Column(db.String(20), nullable=False)
    degree = db.Column(db.String(20), nullable=False)  # 나중에 라디오 버튼으로..? 

    def __init__(self, user_id, school, major, degree):
        self.user_id = user_id
        self.school = school
        self.major = major
        self.degree = degree


