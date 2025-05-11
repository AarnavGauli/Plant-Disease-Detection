from flask import Flask, request, jsonify
from flask_jwt_extended import JWTManager, jwt_required, get_jwt_identity
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing import image
from werkzeug.utils import secure_filename
import numpy as np
from datetime import datetime
import os, time
from dotenv import load_dotenv
from datetime import timedelta

from class_names import class_names
from disease_suggestions import disease_suggestions
from auth import auth_bp
from database import history_collection
from pymongo import MongoClient
from flask import Flask
from flask_cors import CORS

# Load environment variables
load_dotenv()

app = Flask(__name__)
CORS(app)
app.config['JWT_SECRET_KEY'] = os.getenv('JWT_SECRET')
app.config['JWT_ACCESS_TOKEN_EXPIRES'] = timedelta(days=2)
app.config['UPLOAD_FOLDER'] = os.path.join('static', 'uploads')
os.makedirs(app.config['UPLOAD_FOLDER'], exist_ok=True)

jwt = JWTManager(app)
app.register_blueprint(auth_bp)

# Load model
model = load_model(os.path.join('model', 'trained_model.h5'))

def model_predict(img_path):
    img = image.load_img(img_path, target_size=(128, 128))
    x = image.img_to_array(img)
    x = np.expand_dims(x, axis=0)
    preds = model.predict(x)
    pred_class = class_names[np.argmax(preds[0])]
    confidence = float(np.max(preds[0]))
    suggestion = disease_suggestions.get(pred_class, "No suggestion available.")
    return pred_class, confidence, suggestion

@app.route('/predict', methods=['POST'])
@jwt_required()
def predict():
    file = request.files.get('file')
    if not file:
        return jsonify({'error': 'No file uploaded'}), 400

    username = get_jwt_identity()
    timestamp = int(time.time())
    filename = f"{username}_{timestamp}_{secure_filename(file.filename)}"
    filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
    file.save(filepath)

    pred_class, confidence, suggestion = model_predict(filepath)
    image_url = f"/static/uploads/{filename}"

    # Save to MongoDB
    history_collection.insert_one({
        "username": username,
        "predicted_class": pred_class,
        "confidence": confidence,
        "suggestion": suggestion,
        "image_url": image_url,
        "timestamp": datetime.utcnow()
    })

    return jsonify({
        "user": username,
        "predicted_class": pred_class,
        "confidence": f"{confidence:.2f}",
        "suggestion": suggestion,
        "image_url": image_url
    })

@app.route('/history', methods=['GET'])
@jwt_required()
def history():
    username = get_jwt_identity()
    records = list(history_collection.find({"username": username}, {'_id': 0}))
    return jsonify({"user": username, "history": records})

if __name__ == '__main__':
    app.run(debug=True)
