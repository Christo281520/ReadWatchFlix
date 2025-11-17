from django.urls import path
from .views import anime_list, reading_list, subscription_list, check_subscription, VotePollView

urlpatterns = [
    path('anime/', anime_list, name='anime-list'),
    path('reading/', reading_list, name='reading-list'),
    path('vote_poll/', VotePollView.as_view(), name='vote-poll'),
    path('subscriptions/', subscription_list, name='subscription-list'),
    path('check-subscription/<int:user_id>/', check_subscription, name='check-subscription'),
]
