from pydantic import BaseModel

class TodoBase(BaseModel):
    title: str
    completed: bool = False

class TodoCreate(TodoBase):
    pass

class TodoRead(TodoBase):
    id: int

    class Config:
        orm_mode = True
