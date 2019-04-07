import pytest

from application import create_app


@pytest.fixture
def client():
    client = create_app()
    return client.test_client()


def test_client(client):
    assert client is not None


def test_movie(client):
    assert client.get('/movie/ironman').status_code == 200
