import psycopg2
import os
from urllib.parse import urlparse

def get_db():
    database_url = os.getenv('DATABASE_URL')
    url = urlparse(database_url)
    connection = psycopg2.connect(
        database=url.path[1:],
        user=url.username,
        password=url.password,
        host=url.hostname,
        port=url.port
    )
    return connection
