### **Django Backend Implementation Guide for Bookstore App**

This guide provides the technical specifications for building a robust and scalable backend using Django and Django Rest Framework (DRF) to support the functionality of the bookstore frontend.

#### **I. Core Models (The Database Schema)**

These models represent the core data structures of your application. They will be defined in `models.py` files within your Django apps.

**1. Users App (`users/models.py`)**

It's best practice to extend Django's built-in `AbstractUser` model from the start.

*   **`CustomUser(AbstractUser)`**
    *   This will inherit fields like `username`, `email`, `password`, `first_name`, `last_name` from Django's default user.
    *   **No extra fields are immediately needed** based on the frontend, but creating this model allows for future customization.

*   **`Profile(models.Model)`**
    *   `user`: `OneToOneField` to `CustomUser`. (This is the standard way to extend the user model).
    *   `bio`: `TextField`, `blank=True`. (For the user's profile bio).
    *   `profile_picture`: `ImageField`, `upload_to='profile_pics/'`, `blank=True`.
    *   `favorite_books`: `ManyToManyField` to `books.Book`. This creates a direct link between a user's profile and the books they've favorited.

**2. Books App (`books/models.py`)**

This app will contain all information related to the books themselves.

*   **`Genre(models.Model)`**
    *   `name`: `CharField(max_length=100)`, `unique=True`. (e.g., "Fantasy", "Science Fiction").

*   **`Author(models.Model)`**
    *   `name`: `CharField(max_length=200)`.
    *   `bio`: `TextField`, `blank=True`. (For potential author detail pages later).

*   **`Book(models.Model)`**
    *   `title`: `CharField(max_length=255)`.
    *   `author`: `ForeignKey` to `Author`, `on_delete=models.CASCADE`.
    *   `genres`: `ManyToManyField` to `Genre`.
    *   `description`: `TextField`.
    *   `price`: `DecimalField(max_digits=6, decimal_places=2)`.
    *   `cover_image`: `ImageField`, `upload_to='book_covers/'`.
    *   `publisher`: `CharField(max_length=200)`.
    *   `publication_date`: `DateField`.
    *   `pages`: `IntegerField`.
    *   `created_at`: `DateTimeField(auto_now_add=True)`.

**3. Interactions App (`interactions/models.py`)**

This app handles how users interact with books, like reviews.

*   **`Review(models.Model)`**
    *   `book`: `ForeignKey` to `books.Book`, `on_delete=models.CASCADE`, `related_name='reviews'`.
    *   `user`: `ForeignKey` to `CustomUser`, `on_delete=models.CASCADE`.
    *   `rating`: `IntegerField` (with validators to ensure it's between 1 and 5).
    *   `comment`: `TextField`.
    *   `created_at`: `DateTimeField(auto_now_add=True)`.

**4. Orders App (`orders/models.py`)**

This app manages the shopping cart functionality.

*   **`Cart(models.Model)`**
    *   `user`: `OneToOneField` to `CustomUser`, `on_delete=models.CASCADE`. (Each user has one cart).
    *   `created_at`: `DateTimeField(auto_now_add=True)`.

*   **`CartItem(models.Model)`**
    *   `cart`: `ForeignKey` to `Cart`, `on_delete=models.CASCADE`, `related_name='items'`.
    *   `book`: `ForeignKey` to `books.Book`, `on_delete=models.CASCADE`.
    *   `quantity`: `PositiveIntegerField(default=1)`.

---

#### **II. API Endpoints (Views & Serializers)**

These are the URLs the frontend will call to fetch or send data. You will build these using Django Rest Framework's `ViewSets`, `Serializers`, and `Routers`.

**Authentication (`/api/auth/`)**
*   `POST /register/`: Creates a new user.
*   `POST /login/`: Logs in a user, returning access and refresh tokens.
*   `POST /logout/`: Logs out a user.

**Profile (`/api/profile/`)**
*   `GET /`: Retrieves the profile for the currently logged-in user.
*   `PUT /`, `PATCH /`: Updates the profile for the currently logged-in user.

**Books (`/api/books/`)**
*   `GET /`: Lists all books. Supports pagination (`?page=2`).
*   `GET /<book_id>/`: Retrieves a single book for the `DetailedView` page.
*   `GET /<book_id>/reviews/`: Retrieves all reviews for a specific book.
*   `POST /<book_id>/reviews/`: Creates a new review for a specific book (requires authentication).

**Favorites (`/api/favorites/`)**
*   `GET /`: Lists all books favorited by the current user.
*   `POST /`: Adds a book to the user's favorites. Expects `{ "book_id": <id> }`.
*   `DELETE /<book_id>/`: Removes a book from the user's favorites.

**Cart (`/api/cart/`)**
*   `GET /`: Retrieves all items in the current user's cart.
*   `POST /items/`: Adds a book to the cart. If the book is already in the cart, it can increment the quantity. Expects `{ "book_id": <id>, "quantity": <qty> }`.
*   `PUT /items/<item_id>/`: Updates the quantity of a specific item in the cart. Expects `{ "quantity": <qty> }`.
*   `DELETE /items/<item_id>/`: Removes a specific item from the cart.

---

#### **III. Authentication Strategy**

A token-based authentication system is ideal for a decoupled frontend/backend architecture.

*   **Recommendation:** Use the **`djangorestframework-simplejwt`** library in combination with **`dj-rest-auth`**.
*   **Flow:**
    1.  The user sends their username/password to the `POST /api/auth/login/` endpoint.
    2.  The server validates the credentials and returns a short-lived **`access token`** and a long-lived **`refresh token`**.
    3.  The React frontend stores these tokens securely (e.g., in an HttpOnly cookie or local storage).
    4.  For every subsequent request to a protected endpoint (e.g., viewing profile, adding to cart), the frontend includes the `access token` in the `Authorization: Bearer <token>` header.
    5.  Django Rest Framework will automatically validate this token on protected views.

---

#### **IV. Recommended Django App Structure**

Organizing your code into logical apps will make the project much easier to maintain.

```
bookstore_project/
├── bookstore_project/  # Core project settings (settings.py, urls.py)
├── apps/
│   ├── users/          # CustomUser, Profile models, profile API
│   ├── books/          # Book, Author, Genre models, book listing API
│   ├── interactions/   # Review model, review API, favorites logic
│   └── orders/         # Cart, CartItem models, cart API
├── manage.py
└── requirements.txt
```