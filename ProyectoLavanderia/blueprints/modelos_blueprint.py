from flask import Flask
from flask import Blueprint
from flask import request
from flask import jsonify
from flask_cors import CORS, cross_origin

from modelos.model_modelos import ModelModelos
model_blueprint = Blueprint('model_blueprint', __name__)

model = ModelModelos()

@model_blueprint.route('/modelos/create', methods=['POST'])
@cross_origin()
def create_model():
    content = model.create_modelo(request.json['nombre'], float(request.json['precio']), request.json['descripcion'])
    return jsonify(content)

@model_blueprint.route('/modelos/get', methods=['GET'])
@cross_origin()
def get_models():
    return jsonify(model.get_modelos())

@model_blueprint.route('/modelos/delete', methods=['GET'])
@cross_origin()
def delete_models():
    return jsonify(model.delete_modelo(int(request.json['id'])))
