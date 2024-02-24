from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
import os
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)
CORS(app)

database_uri = f"mysql+pymysql://{os.getenv('DB_USER')}:{os.getenv('DB_PASS')}@{os.getenv('DB_HOST')}/{os.getenv('DB_NAME')}"

app.config['SQLALCHEMY_DATABASE_URI'] = database_uri
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

class Usuario(db.Model):
    __tablename__ = 'repaso'  # Asegúrate de que este es el nombre correcto de tu tabla.
    ID = db.Column(db.Integer, primary_key=True)
    Nombre = db.Column(db.String(100), nullable=False)
    Edad = db.Column(db.Integer, nullable=False)

@app.route('/')
def home():
    return "¡Hola, mundo!"

@app.route('/crear/usuario', methods=['POST'])
def crear_usuario():
    data = request.json
    if 'name' not in data or 'age' not in data:
        return jsonify({"error": "Falta nombre o edad"}), 400
    try:
        nuevo_usuario = Usuario(Nombre=data['name'], Edad=data['age'])
        db.session.add(nuevo_usuario)
        db.session.commit()
        return jsonify({"message": "Usuario creado con éxito"}), 201
    except Exception as e:
        db.session.rollback()
        return jsonify({"error": str(e)}), 500

@app.route('/listar/usuario')
def listar_usuario():
    usuarios = Usuario.query.all()
    if not usuarios:
        return jsonify([])  # O retorna un mensaje de error o estado adecuado

    resultado = []
    for usuario in usuarios:
        if usuario is not None:  # Verifica que el usuario no sea None antes de acceder a sus atributos
            usuario_data = {'id': usuario.ID, 'name': usuario.Nombre, 'age': usuario.Edad}
            resultado.append(usuario_data)
    return jsonify(resultado)

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Esto ahora se ejecuta dentro del contexto de la aplicación.
    app.run(debug=True)
