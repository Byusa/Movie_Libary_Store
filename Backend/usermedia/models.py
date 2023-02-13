from django.db import models
from media.models import Media


class UserMedia(models.Model):
    class Status(models.TextChoices):
        COMPLETED = 'Completed'
        IN_PROGRESS = 'In Progress'
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        "onboarding.User",
        on_delete=models.CASCADE,
        related_name='user_media'
    )
    media = models.ForeignKey(
        Media,
        on_delete=models.CASCADE,
        related_name='user_media'
    )
    progress = models.PositiveSmallIntegerField()
    status = models.CharField(
        max_length=50, choices=Status.choices, default=Status.IN_PROGRESS
    )
    date = models.DateTimeField(
        auto_now_add=True
    )
