from pydantic import BaseModel

class TodoUpdate(BaseModel):
    title: str | None = None
    completed: bool | None = None

class TodoBase(BaseModel):
    title: str
    completed: bool = False

class TodoCreate(TodoBase):
    pass

class TodoRead(TodoBase):
    id: int

    class Config:
        orm_mode = True
