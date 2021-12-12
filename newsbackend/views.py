from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render

def signup_view(request):
    form = UserCreationForm()
    return render(request, 'signup.html',{'form': form})

def registerPage(request):
    context = {}
    return render(request, 'signup.html', context)
    