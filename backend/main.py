from fastapi import FastAPI
from routes.tasks import task

app = FastAPI()
@app.get("/")
def welcome():
    return {"message": "Welcome to my API"}

app.include_router(task)