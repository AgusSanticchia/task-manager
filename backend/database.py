from motor.motor_asyncio import AsyncIOMotorClient
from bson import ObjectId
from models import Task, UpdateTask

try:
    client = AsyncIOMotorClient('mongodb://localhost:27017')
    database = client["task-manager_py"]
    collection = database["task-manager"]
    print("Connected to MongoDB")
except Exception as e:
    print("Error connecting to MongoDB: ", e)


async def get_one_task_id(id: str) -> Task:
    task = await collection.find_one({"_id": ObjectId(id)})
    if task:
        return Task(**task)
    return None


async def get_one_task(title: str) -> Task:
    task = await collection.find_one({"title": title})
    if task:
        return Task(**task)
    return None


async def create_task(task: Task) -> Task:
    task_dict = task.model_dump(by_alias=True, exclude={"id"}) 
    new_task = await collection.insert_one(task_dict)
    created_task = await collection.find_one({"_id": new_task.inserted_id})
    return Task(**created_task)


async def get_all_tasks() -> list[Task]:
    tasks = []
    cursor = collection.find({})    
    async for document in cursor:
        tasks.append(Task(**document))
    return tasks


async def update_task(id: str, data: UpdateTask) -> Task:
    task_data = {k: v for k, v in data.model_dump(exclude_unset=True).items() if v is not None}
    await collection.update_one({"_id": ObjectId(id)}, {"$set": task_data})
    updated_task = await collection.find_one({"_id": ObjectId(id)})
    if updated_task:
        return Task(**updated_task)
    return None


async def delete_task(id: str) -> bool:
    result = await collection.delete_one({"_id": ObjectId(id)})
    return result.deleted_count > 0
