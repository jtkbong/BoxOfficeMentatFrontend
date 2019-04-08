import pytest

from application import create_app


@pytest.fixture
def client():
    client = create_app()
    return client.test_client()


def test_get_movie(client):
    assert client.get('/movie/ironman').status_code == 200


def test_get_non_existent_movie(client):
    assert client.get('/movie/ironman4').status_code == 404


def test_get_movies(client):
    assert client.get('/movies?person=robertdowneyjr&studio=SonyColumbia').status_code == 200
