from fastapi import FastAPI

app = FastAPI()

@app.get('/api/tasks')
async def get_tasks():
    return {"data": "All tasks"}

@app.get('/api/tasks/{id}')
async def get_task(id: int):
    return {"data": id}

@app.post('/api/tasks')
async def create_task():
    return {"data": "Task created"}

@app.put('/api/tasks/{id}')
async def update_task(id: int, data):
    return {"data": f"Task {id} has been updated"}

@app.delete('/api/tasks/{id}')
async def delete_task(id: int):
    return {"data": f"Task {id} has been deleted"}