from django.db import models
from media.models import Media


class Recommendation(models.Model):
    id = models.AutoField(primary_key=True)
    from_user = models.ForeignKey(
        "onboarding.User",
        on_delete=models.CASCADE,
        related_name='from_user'
    )
    to_user = models.ForeignKey(
        "onboarding.User",
        on_delete=models.CASCADE,
        related_name='to_user'
    )
    media = models.ForeignKey(
        Media,
        on_delete=models.CASCADE,
    )
    message = models.CharField(max_length=200)
    date = models.DateTimeField(auto_now_add=True)
