import requests

from fastapi import FastAPI, File, HTTPException, Security
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from os import environ
from .auth import Auth

app = FastAPI()

security = HTTPBearer()
auth_handler = Auth()


@app.post("/api/caption")
def create_caption(image: bytes = File(...), credentials: HTTPAuthorizationCredentials = Security(security)):
    token = credentials.credentials
    auth_handler.decode_token(token)

    api_url = 'https://computer-vision-we.cognitiveservices.azure.com/vision/v3.2/analyze'
    params = '?visualFeatures=Description&language=en&model-version=latest'
    headers = {
        'Ocp-Apim-Subscription-Key': environ['COMPUTER_VISION_COGNITIVE_SERVICES_KEY'],
    }

    if image:
        data = image
        headers.update({'Content-Type': 'application/octet-stream'})
    else:
        raise HTTPException(status_code=400, detail="An image file is required")

    resp = requests.post(headers=headers, url=api_url + params, data=data)
    return resp.json()
