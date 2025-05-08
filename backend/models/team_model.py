from sqlalchemy import Column, Integer, ForeignKey,String
from database import Base

class Club(Base):
    __tablename__ = "club"
    id = Column(Integer,primary_key=True, index = True)
    user_id = Column(Integer, ForeignKey("users.id"))
    team_id = Column(Integer,ForeignKey("teams.id"))
    role = Column(String, default = "player")
    status= Column(String , default = "pending") #ovo sam stavio da bi ono kada posaljes zahtjev nekom klubu da bude pending dok ga ne odobre