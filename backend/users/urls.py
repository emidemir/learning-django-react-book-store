from django.urls import path
from .views import google_auth, regular_signup, regular_login, logout

urlpatterns = [
    path('login/', regular_login, name='login'),
    path('signup/', regular_signup, name='signup'),
    path('logout/', logout, name='logout'),
    path('google/', google_auth, name='google-auth'),
]