from django.urls import path
from .views import *

urlpatterns = [
    path("user/register/", CreateUserView.as_view(), name="register"),
    path("users/", UserListView.as_view(), name="user-list"),
]