from django.db import models
from media.models import Media


class Share(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        "onboarding.User",
        on_delete=models.CASCADE,
        related_name='shares'
    )
    media = models.ForeignKey(
        Media,
        on_delete=models.CASCADE,
        related_name='shares'
    )
    message = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)
