import json
from json import JSONDecodeError
from onboarding.models import User
from app.utils.JSONResponse import JSONResponse
from app.utils import response_messages
from django.db import transaction
from rest_framework.decorators import api_view, permission_classes

from django.db import models


class AuthenticationFailed(Exception):
    pass

# to redo it with jwt token from auth0
@api_view(['PUT'])
def signup_user(request):
    try:
        signup_data = json.loads(request.body)
    except JSONDecodeError:
        return JSONResponse.failure(
            response_messages.MALFORMED_DATA,
            status=400
        )

    management_token = "jwttoken"
    user = request.user
    name = signup_data.get('name')

    try:
        with transaction.atomic():
            user.name = name
            user.save()
            user_profile = User.objects.create(user=user)
            user_profile.save()
            user_profile.management_token = management_token
            user_profile.save()
    except (AuthenticationFailed):
        return JSONResponse.failure(
            response_messages.SOMETHING_WENT_WRONG,
            status=500
        )

    return JSONResponse.success(response_messages.OBJECTS_SAVED_SUCCESSFULLY)
