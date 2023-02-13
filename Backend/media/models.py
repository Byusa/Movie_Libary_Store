from django.db import models


class Media(models.Model):
    class MediaTypes(models.TextChoices):
        MOVIE = 'Movie'
        BOOK = 'Book'
        ARTICLE = 'Article'
    id = models.AutoField(primary_key=True)
    title = models.CharField(null=False, blank=False, max_length=100)
    media_type = models.CharField(
        null=False, blank=False,
        choices=MediaTypes.choices,
        default=MediaTypes.MOVIE,
        max_length=50
    )
    year = models.PositiveSmallIntegerField()
    image_url = models.CharField(max_length=200)
    genre = models.CharField(max_length=100)
    author = models.CharField(max_length=100)
    author_director = models.CharField(max_length=100)
    uploaded_by = models.ForeignKey(
        "onboarding.User",
        on_delete=models.CASCADE,
        related_name='media'
    )
