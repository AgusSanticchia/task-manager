from fastapi import FastAPI
from routes.tasks import task
from fastapi.middleware.cors import CORSMiddleware
from decouple import config
app = FastAPI()

print(config('FRONTEND_URL'))

origins = [
    config('FRONTEND_URL'),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def welcome():
    return {"message": "Welcome to my API"}

app.include_router(task)