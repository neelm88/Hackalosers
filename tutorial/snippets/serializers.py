from django.contrib.auth.models import User
from rest_framework import serializers
from snippets.models import Snippet, UserData, LANGUAGE_CHOICES, STYLE_CHOICES, ClubData, MatchData


class SnippetSerializer(serializers.HyperlinkedModelSerializer): # new
    owner = serializers.ReadOnlyField(source='owner.username')
    highlight = serializers.HyperlinkedIdentityField( # new
        view_name='snippet-highlight', format='html')

    class Meta:
        model = Snippet
        fields = ('url', 'id', 'highlight', 'title', 'code', 'linenos',
                  'language', 'style', 'owner',) # new

class UserDataSerializer(serializers.HyperlinkedModelSerializer): # new
    class Meta:
        model = UserData
        fields = ('username', 'password', 'firstname', 'lastname', 'grad_year', 'gender', 'school')
    def create(self, validated_data):
        return UserData.objects.create(**validated_data)

class ClubDataSerializer(serializers.HyperlinkedModelSerializer): # new
    class Meta:
        model = ClubData
        fields = ('name', 'mission', 'affiliations', 'link', 'img_url', 'other')
    def create(self, validated_data):
        return ClubData.objects.create(**validated_data)

class MatchDataSerializer(serializers.HyperlinkedModelSerializer): # new
    class Meta:
        model = MatchData
        fields = ('username', 'club_name')
    def create(self, validated_data):
        return MatchData.objects.create(**validated_data)

class UserSerializer(serializers.HyperlinkedModelSerializer): # new
    snippets = serializers.HyperlinkedRelatedField( # new
        many=True, view_name='snippet-detail', read_only=True)
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'snippets') # new