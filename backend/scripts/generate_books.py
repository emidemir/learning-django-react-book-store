import os
import sys
from pathlib import Path
from datetime import datetime

# When a module is loaded from a file in Python, __file__ is set to its absolute path.
backend_dir = Path(__file__).resolve().parent.parent

# sys.path is a list of directory paths that Python searches in order to find modules when you do:
sys.path.insert(0, str(backend_dir))

import django 

# ensures that the Django framework knows where to find its configuration.
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "config.settings")
django.setup()

from books.models import Book, Genre, Author

def run():
    print("Starting database population...")

    # --- 1. Create Genres ---
    print("Creating Genres...")
    genres_to_create = [
        "Science Fiction", "Fantasy", "Mystery", 
        "Thriller", "Non-Fiction", "Historical Fiction"
    ]
    
    # Use update_or_create to prevent errors if the script is run multiple times
    genre_objects = {}
    for name in genres_to_create:
        genre, created = Genre.objects.update_or_create(
            name=name
        )
        genre_objects[name] = genre
        if created:
            print(f"Created Genre: {name}")

    # --- 2. Create Authors ---
    print("Creating Authors...")
    authors_data = [
        "Anya K. Sharma", "Ethan R. Thorne", "Lena J. Petrov", "Marcus V. Bell"
    ]
    
    author_objects = {}
    for name in authors_data:
        author, created = Author.objects.update_or_create(
            name=name
        )
        author_objects[name] = author
        if created:
            print(f"Created Author: {name}")

    # --- 3. Create Books ---
    print("Creating Books...")
    books_data = [
        {
            "title": "The Silent Cosmos",
            "author_name": "Anya K. Sharma",
            "genres": ["Science Fiction", "Mystery"],
            "description": "A deep-space thriller about a lone scientist who discovers a signal that shouldn't exist.",
            "price": 18.99,
            "publication_date": datetime(2023, 10, 25, 10, 0, 0),
            "page": 412,
        },
        {
            "title": "Whispers of the Sunken City",
            "author_name": "Ethan R. Thorne",
            "genres": ["Fantasy", "Historical Fiction"],
            "description": "An epic journey into a forgotten kingdom beneath the waves, where magic and history intertwine.",
            "price": 22.50,
            "publication_date": datetime(2022, 5, 15, 12, 0, 0),
            "page": 601,
        },
        {
            "title": "The Data Paradox",
            "author_name": "Lena J. Petrov",
            "genres": ["Non-Fiction", "Thriller"],
            "description": "An investigative look into the ethics and societal impact of modern AI and data collection.",
            "price": 14.75,
            "publication_date": datetime(2024, 1, 1, 9, 0, 0),
            "page": 320,
        },
        {
            "title": "Midnight at Oakhaven Manor",
            "author_name": "Marcus V. Bell",
            "genres": ["Mystery", "Thriller"],
            "description": "A classic whodunit set in a remote English manor during a stormy night with a surprising twist.",
            "price": 16.00,
            "publication_date": datetime(2023, 7, 10, 14, 0, 0),
            "page": 380,
        },
    ]

    for data in books_data:
        # Get the required Author object
        author_obj = author_objects[data["author_name"]]
        
        # Create or update the Book object
        book, created = Book.objects.update_or_create(
            title=data["title"],
            defaults={
                "author": author_obj,
                "description": data["description"],
                "price": data["price"],
                # cover_image is mandatory, but for a script, we'll set it to an empty string.
                # In a real app, you might need a placeholder image file.
                "cover_image": "", 
                "publication_date": data["publication_date"],
                "page": data["page"],
            }
        )

        # Set the ManyToMany field (Genres)
        genre_list = [genre_objects[g] for g in data["genres"]]
        book.genres.set(genre_list)
        
        if created:
            print(f"Created Book: {book.title}")
        
    print("Database population complete!")

if __name__ == "__main__":
    run()


