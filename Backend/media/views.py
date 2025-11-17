from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework import status
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

from .models import (
    Anime, Reading, Subscription, Profile,
    VotePoll, VoteOption
)
from .serializers import (
    AnimeSerializer, ReadingSerializer, SubscriptionSerializer,
    VotePollSerializer
)

# ========================
# Home API View
# ========================
@api_view(['GET'])
def home(request):
    return Response({"message": "Welcome to ReadWatchFlix API"})

# ========================
# Public Anime List API View
# ========================
@api_view(['GET'])
@permission_classes([AllowAny])
def anime_list(request):
    anime = Anime.objects.all()
    serializer = AnimeSerializer(anime, many=True)
    return Response(serializer.data)

# ========================
# Public Reading List API View
# ========================
@api_view(['GET'])
@permission_classes([AllowAny])
def reading_list(request):
    reading = Reading.objects.all()
    serializer = ReadingSerializer(reading, many=True)
    return Response(serializer.data)

# ========================
# Check if a User has an Active Subscription
# ========================
@api_view(['GET'])
def check_subscription(request, user_id):
    try:
        profile = Profile.objects.get(user__id=user_id)
        return Response({"subscribed": profile.is_subscribed})
    except Profile.DoesNotExist:
        return Response({"subscribed": False})

# ========================
# User Registration API View
# ========================
class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        email = request.data.get('email')
        phone = request.data.get('phone')
        password = request.data.get('password')

        if not all([username, email, phone, password]):
            return Response({"error": "All fields are required."}, status=status.HTTP_400_BAD_REQUEST)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists."}, status=status.HTTP_400_BAD_REQUEST)

        user = User.objects.create(
            username=username,
            email=email,
            password=make_password(password)
        )
        return Response({"message": "User registered successfully.", "user_id": user.id}, status=status.HTTP_201_CREATED)

# ========================
# Vote Poll View (GET poll, POST vote)
# ========================
class VotePollView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        poll = VotePoll.objects.prefetch_related('options').first()
        if not poll:
            return Response({"error": "No poll available."}, status=status.HTTP_404_NOT_FOUND)

        serializer = VotePollSerializer(poll)
        return Response(serializer.data)

    def post(self, request):
        option_id = request.data.get("option_id")
        user = request.user

        if not option_id:
            return Response({"error": "Option ID is required."}, status=status.HTTP_400_BAD_REQUEST)

        if user.is_staff:
            return Response({"error": "Admins cannot vote."}, status=status.HTTP_403_FORBIDDEN)

        try:
            option = VoteOption.objects.get(id=option_id)
            option.votes += 1
            option.save()
            return Response({"message": "Vote recorded successfully."}, status=status.HTTP_200_OK)
        except VoteOption.DoesNotExist:
            return Response({"error": "Option not found."}, status=status.HTTP_404_NOT_FOUND)

# ========================
# Create Subscription API View
# ========================
class CreateSubscriptionView(APIView):
    def post(self, request):
        user_id = request.data.get('user_id')
        plan = request.data.get('plan')

        user = get_object_or_404(User, id=user_id)

        if Subscription.objects.filter(user=user).exists():
            return Response({"error": "User already subscribed."}, status=status.HTTP_400_BAD_REQUEST)

        subscription = Subscription.objects.create(user=user, plan=plan)

        # Update profile to mark user as subscribed
        profile = Profile.objects.get(user=user)
        profile.is_subscribed = True
        profile.subscription_plan = plan
        profile.save()

        return Response({"message": "Subscription created successfully."}, status=status.HTTP_201_CREATED)

# ========================
# Subscription List API View
# ========================
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def subscription_list(request):
    subscriptions = Subscription.objects.all()
    serializer = SubscriptionSerializer(subscriptions, many=True)
    return Response(serializer.data)
