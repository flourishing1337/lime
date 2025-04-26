import psycopg2

def get_db():
    connection = psycopg2.connect(
        database="lime",
        user="lime",
        password="limepassword",
        host="db",
        port="5432"
    )
    return connection
