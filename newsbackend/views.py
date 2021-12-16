from django.contrib.auth.forms import UserCreationForm
from django.shortcuts import render
from newsapi import NewsApiClient




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


def index(request):
      
    newsapi = NewsApiClient(api_key ='0a1fa78c81c84b9b9427ced0a50bbc85')
    top = newsapi.get_top_headlines(sources ='techcrunch')
  
    l = top['articles']
    desc =[]
    news =[]
    img =[]
  
    for i in range(len(l)):
        f = l[i]
        news.append(f['title'])
        desc.append(f['description'])
        img.append(f['urlToImage'])
    mylist = zip(news, desc, img)
  
    return render(request, 'newsf.html', context ={"mylist":mylist})