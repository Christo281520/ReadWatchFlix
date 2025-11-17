from django.conf import settings
from django.conf.urls.static import static
from django.contrib import admin
from django.urls import path, include

from media.views import home, RegisterView, CreateSubscriptionView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path('admin/', admin.site.urls),

    # ✅ API Home - JSON Welcome Message
    path('', home, name='home'),
    path('api/homepage/', include('homepage.urls')),


    # ✅ Media app (Anime, Reading, Subscription, etc.)
    path('api/', include('media.urls')),

    # ✅ JWT Authentication (Login & Refresh Token)
    path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),

    # ✅ Registration - Accepts only POST
    path('api/register/', RegisterView.as_view(), name='register'),

    # ✅ Create Subscription API
    path('api/subscription/', CreateSubscriptionView.as_view(), name='create-subscription'),
]

# ✅ Serve media files during development
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# ✅ Serve static files during development
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)