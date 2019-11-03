from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from snippets import views

urlpatterns = [
    path('snippets/', views.SnippetList.as_view(), name='snippet-list'),
    path('snippets/<int:pk>/', views.SnippetDetail.as_view(), name='snippet-detail'),
    path('snippets/<int:pk>/highlight/',
         views.SnippetHighlight.as_view(), name='snippet-highlight'), # new
    path('users/', views.UserList.as_view(), name='user-list'),
    path('users/<int:pk>/', views.UserDetail.as_view(), name='user-detail'),
    path('', views.api_root),
    path('user_data/', views.UserDataList.as_view(), name='user-data-list'),
    path('user_data/<int:pk>/', views.UserDataDetail.as_view(), name='user-data-detail'),
    path('club_data/', views.ClubDataList.as_view(), name='club-data-list'),
    path('club_data/<int:pk>/', views.ClubDataDetail.as_view(), name='club-data-detail'),
    path('match_data/', views.MatchDataList.as_view(), name='match-data-list'),
    path('match_data/<int:pk>/', views.MatchDataDetail.as_view(), name='match-data-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)