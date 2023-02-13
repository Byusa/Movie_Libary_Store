from django.db import models


class User(models.Model):
    class RoleType(models.TextChoices):
        ADMINISTRATOR = 'Administrator'
        EDITOR = 'Editor'
        VIEWER = 'Viewer'
    id = models.AutoField(primary_key=True)
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=50, unique=True)
    password = models.CharField(max_length=50)
    date_created = models.DateTimeField(auto_now_add=True)
    role = models.CharField(
        max_length=50, choices=RoleType.choices, default=RoleType.VIEWER
    )
    profile_image = models.ImageField(
        upload_to='profile_images/',
        null=True,
        blank=True
    )
