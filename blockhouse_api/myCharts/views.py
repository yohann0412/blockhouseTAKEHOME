from django.shortcuts import render
import logging
logger = logging.getLogger(__name__)

# Create your views here.
from rest_framework.decorators import api_view
from rest_framework.response import Response

@api_view(['GET'])
def candlestick_data(request):
    logger.debug("Candlestick data endpoint hit")
    print("Candlestick data view called")  # Debug log
    data = {
        "data": [
             {"date": "2023-01-01", "open": 30, "high": 35, "low": 28, "close": 32},  # Green
        {"date": "2023-01-02", "open": 32, "high": 37, "low": 30, "close": 34},  # Green
        {"date": "2023-01-03", "open": 34, "high": 36, "low": 29, "close": 31},  # Red
        {"date": "2023-01-04", "open": 31, "high": 33, "low": 27, "close": 29},  # Red
        {"date": "2023-01-05", "open": 29, "high": 31, "low": 25, "close": 30} 
        ]
    }
    logger.debug(f"Returning data: {data}")
    return Response(data)

@api_view(['GET'])
def line_chart_data(request):
    data = {
        "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        "data": [10, 69, 39, 40, 192, 17, 84]
    }
    return Response(data)

@api_view(['GET'])
def bar_chart_data(request):
    data = {
        "labels": ["Product A", "Product B", "Product C"],
        "data": [100, 150, 200]
    }
    return Response(data)

@api_view(['GET'])
def pie_chart_data(request):
    data = {
        "labels": ["Red", "Blue", "Yellow"],
        "data": [300, 50, 100]
    }
    return Response(data)
