from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render


def signup_view(request):
    form = UserCreationForm()
    return render(request, 'signup.html',{'form': form})

def registerPage(request):
    form = CreateUserForm()

    if request.method == "POST":
        form = CreateUserForm(request.POST)
        if form.is_valid():
            form.save()
    
    context = {'form':form}
    return render(request, 'signup.html', context)

