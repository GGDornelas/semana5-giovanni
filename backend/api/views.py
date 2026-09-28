import os  # falha controlada (lint): import não usado

from django.db import connection
from django.http import JsonResponse

ITEMS = [
    "Configurar Docker",
    "Automatizar CI",
    "Publicar no GHCR",
]


def health(request):
    try:
        with connection.cursor() as cursor:
            cursor.execute("SELECT 1")
        database = "ok"
    except Exception:
        database = "unavailable"

    return JsonResponse(
        {
            "status": "ok",
            "database": database,
            "engine": connection.vendor,
            "items": ITEMS,
        }
    )
