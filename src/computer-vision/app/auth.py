import os
import jwt
from fastapi import HTTPException


class Auth:
    secret = os.getenv("DRAWING_CAPTIONS_APP_SECRET")

    def decode_token(self, token):
        try:
            payload = jwt.decode(token, self.secret, algorithms=['HS256'])
            if payload['token_type'] == 'access':
                return payload['user_id']
            raise HTTPException(status_code=401, detail='Scope for the token is invalid')
        except jwt.ExpiredSignatureError:
            raise HTTPException(status_code=401, detail='Token expired')
        except jwt.InvalidTokenError:
            raise HTTPException(status_code=401, detail='Invalid token')
