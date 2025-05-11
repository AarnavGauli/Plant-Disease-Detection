from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from database import users

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    username = data['username']
    password = generate_password_hash(data['password'])

    if users.find_one({'username': username}):
        return jsonify({'error': 'User already exists'}), 400

    users.insert_one({'username': username, 'password': password})
    return jsonify({'msg': 'Registration successful'}), 201

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    username = data['username']
    password = data['password']

    user = users.find_one({'username': username})
    if user and check_password_hash(user['password'], password):
        token = create_access_token(identity=username)
        return jsonify({'access_token': token}), 200

    return jsonify({'error': 'Invalid credentials'}), 401
