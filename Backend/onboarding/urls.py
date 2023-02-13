from django.urls import path

from . import views

urlpatterns = [
    # path("", views.get_all_onboardings),
    path("signup/", views.signup_user),
    # path("<int:onboarding_id>/", views.get_onboarding),
    # path("create/", views.create_onboarding),
    # path("update/<int:onboarding_id>/", views.update_onboarding),
    # path("delete/<int:onboarding_id>/", views.delete_onboarding),
]
