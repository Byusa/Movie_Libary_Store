from django.db import models
from media.models import Media


class Like(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        "onboarding.User",
        on_delete=models.CASCADE,
        related_name='likes'
    )
    media = models.ForeignKey(
        Media,
        on_delete=models.CASCADE,
        null=False,
        blank=False,
        related_name='likes'
    )
    date = models.DateTimeField(auto_now_add=True)