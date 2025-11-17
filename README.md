# ReadWatchFlix

# A Full-Stack Anime & Reading Streaming Platform

Built with Django (Backend) and React (Frontend)
ReadWatchFlix is a full stack web platform where users can watch anime series/movies and read mangas/manhwa/manhua.  
The project includes authentication, subscriptions, media streaming, and content browsing.

# Features

# Anime & Reading Platform
- Browse anime series, movies, and Reading
- View detailed pages with synopsis, rating, genre, upcoming, news and more
- Search anime/Reading by keywords
- 
# Video Streaming
- Admin uploads anime episodes directly (no external URLs)
- Users can watch episodes after subscription/payment

# Reading Features
- Select Reading → open manga/manhua,manhwa chapters → view pages smoothly
- All chapters stored in the server (no external links)

# Payment Gateway
- after the user authentication then payment gateway with suscription plan (1 month/ 3 month like that)
- done through paypal after that user can read and watch anime or user cannot watch or read

# User Authentication
- Register & Login
- Session-based authentication
- Subscription-based access control (paypal)

# Voting System
- Users can vote on anime polls or reading polls
- Dynamic results displayed

# news 
- details of news about anime and manga

# Tech Stack

# Backend — Django
- Django REST Framework (DRF)
- Custom models for Anime, Reading, Episodes, Chapters, Profiles
- Serializers, Views, Routers
- Media file uploads
- payment for employers

# Frontend — React
- React Router
- Redux
- Component-based UI
- Fetch API/Axios
- Responsive design

# Folder Structure

ReadWatchFlix/
├── Backend/
│ ├── backend/
│ ├── homepage/
│ ├── media/anime/reading
│ ├── manage.py
│ └── requirements.txt
│
└── Frontend/
├── public/
├── src/
├── package.json
└── package-lock.json

# How to Run the Project

# Backend (Django)

cd Backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver

Backend runs at:
  http://localhost:8000/


# Frontend (React)

cd Frontend
npm install
npm start

Frontend runs at:
  http://localhost:3000/

Admin Panel
To access Django admin: /admin

# Future Enhancements

ML-based recommendations
face app detection in UI
AI Integretion
Adding amount for authors

# Contact

Developed by: Christo Thomas
GitHub: https://github.com/Christo281520

Email: crisssthomas15@gmail.com

