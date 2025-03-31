from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from configparser import ConfigParser
import os

# Inizializza Flask
app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Lettura configurazione da file .ini
config = ConfigParser()
config.read('config.ini')

DB_USER = config.get('Database', 'USER', fallback='postgres')
DB_PASS = config.get('Database', 'PASSWORD', fallback='admin')
DB_HOST = config.get('Database', 'HOST', fallback='localhost')
DB_PORT = config.get('Database', 'PORT', fallback='5434')
DB_NAME = config.get('Database', 'NAME', fallback='med_db')

app.config['SQLALCHEMY_DATABASE_URI'] = f'postgresql://{DB_USER}:{DB_PASS}@{DB_HOST}:{DB_PORT}/{DB_NAME}'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Modelli
class Ambulatorio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), unique=True, nullable=False)
    esami = db.relationship('Esame', secondary='esame_ambulatorio', back_populates='ambulatori')

class ParteDelCorpo(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nome = db.Column(db.String(100), unique=True, nullable=False)
    esami = db.relationship('Esame', back_populates='parte_del_corpo')

class Esame(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    codice_ministeriale = db.Column(db.String(10), unique=True, nullable=False)
    codice_interno = db.Column(db.String(10), unique=True, nullable=False)
    descrizione = db.Column(db.String(100), nullable=False)
    parte_del_corpo_id = db.Column(db.Integer, db.ForeignKey('parte_del_corpo.id'), nullable=False)
    parte_del_corpo = db.relationship('ParteDelCorpo', back_populates='esami')
    ambulatori = db.relationship('Ambulatorio', secondary='esame_ambulatorio', back_populates='esami')

class EsameAmbulatorio(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    esame_id = db.Column(db.Integer, db.ForeignKey('esame.id'), nullable=False)
    ambulatorio_id = db.Column(db.Integer, db.ForeignKey('ambulatorio.id'), nullable=False)

# API Endpoint
@app.route('/ambulatori', methods=['GET'])
def get_ambulatori():
    ambulatori = Ambulatorio.query.all()
    return jsonify([{'id': a.id, 'nome': a.nome} for a in ambulatori])

@app.route('/parti-del-corpo', methods=['GET'])
def get_parti_del_corpo():
    parti = ParteDelCorpo.query.all()
    return jsonify([{'id': p.id, 'nome': p.nome} for p in parti])

@app.route('/esami', methods=['GET'])
def get_esami():
    ambulatorio_id = request.args.get('ambulatorio_id')
    parte_del_corpo_id = request.args.get('parte_del_corpo_id')

    query = Esame.query

    if ambulatorio_id:
        query = query.join(EsameAmbulatorio).filter(EsameAmbulatorio.ambulatorio_id == ambulatorio_id)

    if parte_del_corpo_id:
        query = query.filter(Esame.parte_del_corpo_id == parte_del_corpo_id)

    esami = query.all()
    return jsonify([{
        'id': e.id,
        'codice_ministeriale': e.codice_ministeriale,
        'codice_interno': e.codice_interno,
        'descrizione': e.descrizione
    } for e in esami])

@app.route('/esami/search', methods=['GET'])
def search_esami():
    filtro = request.args.get('filtro', '')
    campo = request.args.get('campo', 'descrizione')

    if campo not in ['codice_ministeriale', 'codice_interno', 'descrizione']:
        return jsonify({"error": "Campo di ricerca non valido"}), 400

    query = Esame.query.filter(getattr(Esame, campo).ilike(f'%{filtro}%'))
    esami = query.all()

    return jsonify([{
        'id': e.id,
        'codice_ministeriale': e.codice_ministeriale,
        'codice_interno': e.codice_interno,
        'descrizione': e.descrizione
    } for e in esami])

if __name__ == '__main__':
    with app.app_context():
        db.create_all()  # Crea le tabelle al primo avvio
    app.run(host='0.0.0.0', port=5000)
