from django.db import models


class Chat(models.Model):
    id = models.AutoField(primary_key=True)
    sender = models.ForeignKey(
        "onboarding.User",
        related_name='sender',
        on_delete=models.CASCADE
    )
    receiver = models.ForeignKey(
        "onboarding.User",
        related_name='receiver',
        on_delete=models.CASCADE
    )
    message = models.TextField()
    date_created = models.DateTimeField(auto_now_add=True)
