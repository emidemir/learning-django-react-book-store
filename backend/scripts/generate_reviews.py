import os
import sys
from pathlib import Path

backend_folder = Path(__file__).resolve().parent.parent
sys.path.insert(0, str(backend_folder))

import django 
os.environ.setdefault('DJANGO_SETTINGS_MODULE', "config.settings")
django.setup()


from interactions.models import Review
from books.models import Book
from users.models import CustomUser
from django.utils import timezone

def run():
    print("Starting review population...")

    try:
        # --- 1. Get required FK objects ---
        # Get the target book (ID 2)
        target_book = Book.objects.get(id=2)
        
        # Get the first existing user to be the reviewer
        reviewer = CustomUser.objects.first() 
        
        if not reviewer:
            print("🛑 ERROR: No users found in the database. Cannot create reviews.")
            return

        # --- 2. Define Dummy Data ---
        reviews_data = [
            {
                "rating": 5,
                "comment": "Absolutely captivating! The world-building is seamless, and the mystery keeps you turning pages.",
                "created_at": timezone.now() - timezone.timedelta(days=10)
            },
            {
                "rating": 4,
                "comment": "A great read, though the middle dragged slightly. The ending payoff made it worthwhile.",
                "created_at": timezone.now() - timezone.timedelta(days=5)
            },
            {
                "rating": 5,
                "comment": "My new favorite in the genre! Highly recommend.",
                "created_at": timezone.now() - timezone.timedelta(days=2)
            },
        ]

        # --- 3. Create or Update Reviews ---
        created_count = 0
        for data in reviews_data:
            # We use update_or_create to prevent running into integrity errors
            review, created = Review.objects.update_or_create(
                book=target_book,
                user=reviewer,
                rating=data['rating'],
                defaults={
                    'comment': data['comment'],
                    'created_at': data['created_at'],
                }
            )
            if created:
                created_count += 1
                print(f"Created Review: '{review.comment[:30]}...' (Rating: {review.rating})")

        print(f"\n✅ Database population complete. Total new reviews created: {created_count}.")
        
    except Book.DoesNotExist:
        print("🛑 ERROR: Book with ID 2 does not exist. Please create dummy books first.")
    except Exception as e:
        print(f"🛑 An unexpected error occurred: {e}")

if __name__ == "__main__":
    run()