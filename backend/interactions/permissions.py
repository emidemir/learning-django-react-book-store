from rest_framework.permissions import BasePermission, SAFE_METHODS

class IsAuthenticatedOrReadOnly(BasePermission):
    pass

class IsOwnerOrReadOnly(BasePermission):
    pass