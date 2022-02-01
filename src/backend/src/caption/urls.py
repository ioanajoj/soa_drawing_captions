from django.urls import path

from caption import views
from rest_framework.authtoken import views as rest_views

urlpatterns = [
    path('login/', rest_views.obtain_auth_token),
    path('register/', views.RegisterView.as_view(), name='auth_register'),
]
