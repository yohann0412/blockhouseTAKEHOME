"""
URL configuration for blockhouse_api project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from .views import candlestick_data, line_chart_data, bar_chart_data, pie_chart_data

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/candlestick-data/', candlestick_data, name='candlestick_data'),
    path('api/line-chart-data/', line_chart_data, name='line_chart_data'),
    path('api/bar-chart-data/', bar_chart_data, name='bar_chart_data'),
    path('api/pie-chart-data/', pie_chart_data, name='pie_chart_data'),
]


from django.urls import path

