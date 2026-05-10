from fastapi import WebSocket
import asyncio
import json


class ConnectionManager:
    def __init__(self):
        self.active_connections = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: dict):
        for connection in self.active_connections:
            await connection.send_text(json.dumps(message))


manager = ConnectionManager()


async def send_live_updates():
    while True:
        await manager.broadcast({
            "status": "live",
            "message": "Monitoring cluster resources"
        })

        await asyncio.sleep(5)
