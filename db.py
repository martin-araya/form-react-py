import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

load_dotenv()

def create_db_connection():
    try:
        connection = mysql.connector.connect(
            host=os.getenv('DB_HOST'), 
            port=os.getenv('DB_PORT'), 
            user=os.getenv('DB_USER'),
            password=os.getenv('DB_PASS'),
            database=os.getenv('DB_NAME')
        )
        if connection.is_connected():
            db_info = connection.get_server_info()
            print("Conectado a MySQL Server versión", db_info)
            return connection
    except Error as e:
        print("Error al conectar a MySQL", e)

def create_user(connection, user):
    try:
        cursor = connection.cursor()
        query = "INSERT INTO repaso (Nombre, Edad) VALUES (%s, %s)"  
        cursor.execute(query, (user['name'], user['age']))
        connection.commit()
        print("Usuario creado con éxito")
    except Error as e:
        print("Error al insertar usuario en la base de datos", e)

def get_users(connection):
    try:
        cursor = connection.cursor()
        cursor.execute("SELECT * FROM repaso")
        records = cursor.fetchall()
        return records
    except Error as e:
        print("Error al obtener usuarios de la base de datos", e)