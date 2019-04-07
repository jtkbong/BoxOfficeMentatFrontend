import pytest

from application import create_app


@pytest.fixture
def client():
    client = create_app()
    return client.test_client()


def test_get_studio(client):
    assert client.get('/studios/SonyColumbia').status_code == 200


def test_non_existent_studio(client):
    assert client.get('/studios/NotRealStudio').status_code == 404


def test_get_studios(client):
    assert client.get('/studios').status_code == 200
