from django.test import TestCase
from django.urls import reverse


class HealthEndpointTests(TestCase):
    def test_health_returns_ok(self):
        response = self.client.get(reverse("health"))

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response["Content-Type"], "application/json")

    def test_health_payload_structure(self):
        data = self.client.get("/api/health/").json()

        # Falha controlada (teste): status esperado incorreto
        self.assertEqual(data["status"], "erro")
        self.assertEqual(data["database"], "ok")
        self.assertEqual(
            data["items"],
            ["Configurar Docker", "Automatizar CI", "Publicar no GHCR"],
        )

    def test_health_accepts_path_without_trailing_slash(self):
        response = self.client.get("/api/health")

        self.assertEqual(response.status_code, 200)
