import pytest

from application import create_app


@pytest.fixture
def client():
    client = create_app()
    return client


def test_client(client):
    assert client is not None
