from django.db import models


class Follow(models.Model):
    id = models.AutoField(primary_key=True)
    follower = models.ForeignKey(
        "onboarding.User",
        on_delete=models.CASCADE,
        related_name='follower'
    )
    following = models.ForeignKey(
        "onboarding.User",
        on_delete=models.CASCADE,
        related_name='following'
    )
    date_created = models.DateTimeField(auto_now_add=True)
