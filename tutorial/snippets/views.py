from django.contrib.auth.models import User 
from rest_framework import generics, permissions, status
from .permissions import IsOwnerOrReadOnly
from .models import Snippet, UserData, ClubData, MatchData
from .serializers import SnippetSerializer, UserSerializer, UserDataSerializer, ClubDataSerializer, MatchDataSerializer
from rest_framework.decorators import api_view # new
from rest_framework.response import Response # new
from rest_framework.reverse import reverse # new
from rest_framework import generics, permissions, renderers # new


class SnippetList(generics.ListCreateAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly,) # new

    def perform_create(self, serializer): # new
        serializer.save(owner=self.request.user)

class SnippetHighlight(generics.GenericAPIView): # new
    queryset = Snippet.objects.all()
    renderer_classes = (renderers.StaticHTMLRenderer,)

    def get(self, request, *args, **kwargs):
        snippet = self.get_object()
        return Response(snippet.highlighted)

class SnippetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Snippet.objects.all()
    serializer_class = SnippetSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly,) # new



class UserList(generics.ListAPIView): # new
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly,) # new



class UserDetail(generics.RetrieveAPIView): # new
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAuthenticatedOrReadOnly,IsOwnerOrReadOnly,) # new

class UserDataList(generics.ListCreateAPIView):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer
    # def perform_create(self, serializer): # new
    #     serializer.save(owner=self.request.user)


class UserDataDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = UserData.objects.all()
    serializer_class = UserDataSerializer

class ClubDataList(generics.ListCreateAPIView):
    queryset = ClubData.objects.all()
    serializer_class = ClubDataSerializer

class ClubDataDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ClubData.objects.all()
    serializer_class = ClubDataSerializer

class MatchDataList(generics.ListCreateAPIView):
    queryset = MatchData.objects.all()
    serializer_class = MatchDataSerializer

class MatchDataDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = MatchData.objects.all()
    serializer_class = MatchDataSerializer

@api_view(['GET']) # new
def api_root(request, format=None):
    return Response({
        'users': reverse('user-list', request=request, format=format),
        'user_data': reverse('user-data-list', request=request, format=format),
        'match_data': reverse('match-data-list', request=request, format=format),
        'club_data': reverse('club-data-list', request=request, format=format),
        'snippets': reverse('snippet-list', request=request, format=format)
    })

@api_view(['GET','POST'])
def user_data_list(request, format=None):
    if request.method == 'GET':
        data = UserData.objects.all()
        serializer = UserDataSerializer(data, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = UserDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
def club_data_list(request, format=None):
    if request.method == 'GET':
        data = ClubData.objects.all()
        serializer = ClubDataSerializer(data, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = ClubDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET','POST'])
def match_data_list(request, format=None):
    if request.method == 'GET':
        data = MatchData.objects.all()
        serializer = MatchDataSerializer(data, many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = MatchDataSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
