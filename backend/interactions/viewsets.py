from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status 

from django.shortcuts import get_object_or_404

from .permissions import IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly

from .models import Review
from books.models import Book

from .serializers import ReviewWriteSerializer, ReviewReadSerializer
from books.serializers import BookSerializer

class ReviewViewSet(viewsets.ModelViewSet):
    queryset = Review.objects.all()
    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    
    def get_queryset(self):
        book_id = self.request.query_params.get('book_id', None)
        qs = Review.objects.filter(book=book_id)
        return qs
    
    def get_serializer_class(self):
        if self.action in ['create', 'update', 'partial_update']:
            return ReviewWriteSerializer
        return ReviewReadSerializer
    
    def perform_create(self, serializer):
        book_id = self.request.query_params.get('book_id')
        
        if not book_id:
            raise serializer.ValidationError({"detail": "Book ID must be provided in the query parameters."})

        # The user is the currently authenticated user
        user = self.request.user
        
        # Save the review, automatically linking the user and the book
        # Note: We must fetch the Book object since the Review model expects an instance.
        try:
            book_instance = Book.objects.get(id=book_id) # Make sure to import Book model
        except Book.DoesNotExist:
             raise serializer.ValidationError({"book_id": "Invalid book ID."})


        serializer.save(user=user, book=book_instance)

class FavoritesViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    def list(self, request):
        # Get the M2M manager for the logged-in user's profile
        favorite_books_qs = request.user.profile.favorite_books.all()
        
        # Serialize the list of Books
        serializer = BookSerializer(favorite_books_qs, many=True)
        return Response(serializer.data)

    def create(self, request):
        book_id = request.data.get('book_id')
        
        if not book_id:
            return Response({"detail": "Book ID is required."}, status=status.HTTP_400_BAD_REQUEST)
        
        # 1. Check if book exists
        book = get_object_or_404(Book, id=book_id)
        
        profile = request.user.profile
        
        # 2. Check and add (idempotent operation)
        if not profile.favorite_books.filter(id=book_id).exists():
            profile.favorite_books.add(book)
            return Response(
                {"detail": f"Book '{book.title}' added to favorites."},
                status=status.HTTP_201_CREATED
            )
        
        return Response(
            {"detail": "Book is already a favorite."},
            status=status.HTTP_200_OK # Respond 200 since no change was needed
        )

    def destroy(self, request, pk=None):
        """Removes a book from favorites (DELETE /favorites/{book_id}/)."""
        book_id = pk # In a router, the URL parameter is captured as pk
        
        if not book_id:
            return Response({"detail": "Book ID not provided in URL."}, status=status.HTTP_400_BAD_REQUEST)

        book = get_object_or_404(Book, id=book_id)
        profile = request.user.profile
        
        # Remove the book. If it wasn't there, remove() does nothing (safe).
        profile.favorite_books.remove(book)
        
        return Response(
            {"detail": f"Book '{book.title}' removed from favorites."},
            status=status.HTTP_204_NO_CONTENT # Standard response for successful deletion
        )