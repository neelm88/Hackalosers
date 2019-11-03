from django.contrib.auth.models import User
from rest_framework import serializers
from snippets.models import Snippet, UserData, LANGUAGE_CHOICES, STYLE_CHOICES


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

class UserSerializer(serializers.HyperlinkedModelSerializer): # new
    snippets = serializers.HyperlinkedRelatedField( # new
        many=True, view_name='snippet-detail', read_only=True)
    class Meta:
        model = User
        fields = ('url', 'id', 'username', 'snippets') # new