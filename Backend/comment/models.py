from django.db import models
from media.models import Media


class Comment(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.ForeignKey(
        "onboarding.User",
        on_delete=models.CASCADE,
        related_name='comments'
    )
    media = models.ForeignKey(
        Media,
        on_delete=models.CASCADE,
        related_name='comments'
    )
    comment = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
