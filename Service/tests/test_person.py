import pytest

from application import create_app


@pytest.fixture
def client():
    client = create_app()
    return client.test_client()


def test_get_person(client):
    assert client.get('/person/joshbrolin').status_code == 200


def test_get_non_existent_person(client):
    assert client.get('/person/rendblackhand').status_code == 404
