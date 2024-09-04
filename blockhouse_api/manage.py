#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys


def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'blockhouse_api.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc
    execute_from_command_line(sys.argv)


if __name__ == '__main__':
    main()

'''

# ... (keep all your existing imports and settings)

# Add this near the top of the file, after the imports
from corsheaders.defaults import default_headers

# ... (keep all your existing settings)

# Add these settings at the end of the file
CORS_ALLOW_ALL_ORIGINS = True  # This is for development only. In production, specify the allowed origins.

CORS_ALLOW_METHODS = [
    "DELETE",
    "GET",
    "OPTIONS",
    "PATCH",
    "POST",
    "PUT",
]

CORS_ALLOW_HEADERS = list(default_headers) + [
    "my-custom-header",
]

# If you want to be more specific about allowed origins:
# CORS_ALLOWED_ORIGINS = [
#     "http://localhost:3000",
#     "http://127.0.0.1:3000",
# ]

# Optional: Allow credentials (cookies, authorization headers)
CORS_ALLOW_CREDENTIALS = True

'''