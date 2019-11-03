from django.contrib import admin
from .models import Snippet, UserData


class SnippetAdmin(admin.ModelAdmin):
    readonly_fields = ('highlighted',)

admin.site.register(Snippet, SnippetAdmin)

