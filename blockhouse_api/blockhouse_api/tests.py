# tests.py
from django.test import TestCase
from django.urls import reverse
from rest_framework import status
from .views import candlestick_data, line_chart_data, bar_chart_data, pie_chart_data
'''
Thought process behind tests:
Check for:
1. Appropriate Status Code: 
We want to verify that the API returns the correct HTTP status code (200 OK) when requested.
2. Data Structure: 
We want to verify that the response data is in the expected format, such as a list of dictionaries or a dictionary with specific keys.
This is especially important since our datas being passed around in a lot of ways.
3. Data Integrity: Making sure data passed matches the right amount (obviously dynamic if it wasn't hardcoded, but since it is we'll take on fixed values)
4. Type Safety: Obviously, implicitly check the type safety of the response data by verifying that it conforms to the expected structure and format. Slightly similar to 2, but there's minor nuances that make it necessary





'''
class TestCandlestickDataView(TestCase):
    def test_get_candlestick_data(self):
        url = reverse('candlestick_data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['data']), 5)

    def test_candlestick_data_structure(self):
        url = reverse('candlestick_data')
        response = self.client.get(url)
        data = response.data['data']
        self.assertIsInstance(data, list)
        self.assertEqual(len(data), 5)
        for item in data:
            self.assertIsInstance(item, dict)
            self.assertIn('date', item)
            self.assertIn('open', item)
            self.assertIn('high', item)
            self.assertIn('low', item)
            self.assertIn('close', item)

class TestLineChartDataView(TestCase):
    def test_get_line_chart_data(self):
        url = reverse('line_chart_data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['labels']), 7)
        self.assertEqual(len(response.data['data']), 7)

    def test_line_chart_data_structure(self):
        url = reverse('line_chart_data')
        response = self.client.get(url)
        data = response.data
        self.assertIsInstance(data, dict)
        self.assertIn('labels', data)
        self.assertIsInstance(data['labels'], list)
        self.assertEqual(len(data['labels']), 7)
        self.assertIn('data', data)
        self.assertIsInstance(data['data'], list)
        self.assertEqual(len(data['data']), 7)

class TestBarChartDataView(TestCase):
    def test_get_bar_chart_data(self):
        url = reverse('bar_chart_data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['labels']), 3)
        self.assertEqual(len(response.data['data']), 3)

    def test_bar_chart_data_structure(self):
        url = reverse('bar_chart_data')
        response = self.client.get(url)
        data = response.data
        self.assertIsInstance(data, dict)
        self.assertIn('labels', data)
        self.assertIsInstance(data['labels'], list)
        self.assertEqual(len(data['labels']), 3)
        self.assertIn('data', data)
        self.assertIsInstance(data['data'], list)
        self.assertEqual(len(data['data']), 3)

class TestPieChartDataView(TestCase):
    def test_get_pie_chart_data(self):
        url = reverse('pie_chart_data')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['labels']), 3)
        self.assertEqual(len(response.data['data']), 3)

    def test_pie_chart_data_structure(self):
        url = reverse('pie_chart_data')
        response = self.client.get(url)
        data = response.data
        self.assertIsInstance(data, dict)
        self.assertIn('labels', data)
        self.assertIsInstance(data['labels'], list)
        self.assertEqual(len(data['labels']), 3)
        self.assertIn('data', data)
        self.assertIsInstance(data['data'], list)
        self.assertEqual(len(data['data']), 3)