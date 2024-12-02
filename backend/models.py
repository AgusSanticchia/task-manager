from typing import Optional
from pydantic import BaseModel, Field
from bson import ObjectId

class PyObjectId(str):
    @classmethod
    def validate(cls, v):
        if isinstance(v, ObjectId):
            return str(v)
        if isinstance(v, str) and ObjectId.is_valid(v):
            return v
        raise ValueError('Invalid ObjectId')

class Task(BaseModel):
    id: Optional[PyObjectId] = Field(alias='_id', default=None)
    title: str
    description: str
    completed: bool = False

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True

    def model_dump(self, **kwargs):
        dump_dict = super().model_dump(**kwargs)
        if dump_dict.get('id') is None:
            dump_dict.pop('id', None)
        return dump_dict

class UpdateTask(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    completed: Optional[bool] = None

    class Config:
        populate_by_name = True
        json_encoders = {ObjectId: str}
        arbitrary_types_allowed = True