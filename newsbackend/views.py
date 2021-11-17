from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render

def signup_view(request):
    form = UserCreationForm()
    return render(request, 'templates/signup.html',{'form': form})