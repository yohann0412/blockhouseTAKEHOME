from django.shortcuts import render
import logging
from django.core.cache import cache
from rest_framework.decorators import api_view
from rest_framework.response import Response

logger = logging.getLogger(__name__)

@api_view(['GET'])
def candlestick_data(request):
    logger.debug("Candlestick data endpoint hit")
    data = {
        "data": [
            {"date": "2023-01-01", "open": 30, "high": 35, "low": 28, "close": 32},
            {"date": "2023-01-02", "open": 32, "high": 37, "low": 30, "close": 34},
            {"date": "2023-01-03", "open": 34, "high": 36, "low": 29, "close": 31},
            {"date": "2023-01-04", "open": 31, "high": 33, "low": 27, "close": 29},
            {"date": "2023-01-05", "open": 29, "high": 31, "low": 25, "close": 30}
        ]
    }
    logger.debug(f"Returning candlestick data: {data}")
    return Response(data)

@api_view(['GET'])
def line_chart_data(request):
    logger.debug("Line chart data endpoint hit")
    data = {
        "labels": ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul"],
        "data": [10, 69, 39, 40, 192, 17, 84]
    }
    logger.debug(f"Returning line chart data: {data}")
    return Response(data)

@api_view(['GET'])
def bar_chart_data(request):
    logger.debug("Bar chart data endpoint hit")
    data = {
        "labels": ["Product A", "Product B", "Product C"],
        "data": [100, 150, 200]
    }
    logger.debug(f"Returning bar chart data: {data}")
    return Response(data)

@api_view(['GET'])
def pie_chart_data(request):
    logger.debug("Pie chart data endpoint hit")
    data = {
        "labels": ["Red", "Blue", "Yellow"],
        "data": [300, 50, 100]
    }
    logger.debug(f"Returning pie chart data: {data}")
    return Response(data)
