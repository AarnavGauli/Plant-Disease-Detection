import os
import zipfile
from pathlib import Path
import numpy as np
import shutil
import tensorflow as tf
from tensorflow.keras.models import load_model, Model
from tensorflow.keras.layers import Dense, GlobalAveragePooling2D
from tensorflow.keras.preprocessing.image import ImageDataGenerator

# === STEP 1: CONFIGURE KAGGLE ENV ===
os.environ['KAGGLE_CONFIG_DIR'] = os.path.join(os.getcwd(), 'kaggle')

# === STEP 2: DOWNLOAD DATASET FROM KAGGLE ===
dataset_path = "plantvillage-dataset"
if not os.path.exists(dataset_path):
    os.system("kaggle datasets download -d emmarex/plantdisease -p .")
    with zipfile.ZipFile("plantdisease.zip", 'r') as zip_ref:
        zip_ref.extractall(dataset_path)
    os.remove("plantdisease.zip")

# === STEP 3: SETUP DIRECTORIES ===
data_dir = os.path.join(dataset_path, "PlantVillage")

# === STEP 4: SELECT CLASSES TO FINE-TUNE ===
selected_classes = [
    'Tomato___Tomato_mosaic_virus',
    'Tomato___Late_blight',
    'Potato___Early_blight',
    'Tomato___Target_Spot',
    'Corn_(maize)___Common_rust_',
    'Apple___Black_rot',
    'Grape___Esca_(Black_Measles)',
    'Tomato___Spider_mites Two-spotted_spider_mite',
    'Tomato___Tomato_Yellow_Leaf_Curl_Virus',
    'Pepper,_bell___Bacterial_spot'
]

# === STEP 5: PREPARE DATA ===
img_size = (128, 128)
batch_size = 32

train_datagen = ImageDataGenerator(
    rescale=1./255,
    validation_split=0.2,
    rotation_range=15,
    zoom_range=0.2,
    horizontal_flip=True
)

train_generator = train_datagen.flow_from_directory(
    data_dir,
    target_size=img_size,
    batch_size=batch_size,
    classes=selected_classes,
    class_mode='categorical',
    subset='training'
)

val_generator = train_datagen.flow_from_directory(
    data_dir,
    target_size=img_size,
    batch_size=batch_size,
    classes=selected_classes,
    class_mode='categorical',
    subset='validation'
)

# === STEP 6: LOAD EXISTING MODEL ===
base_model = load_model("model/trained_model.h5", compile=False)

# === STEP 7: MODIFY OUTPUT LAYER FOR NEW CLASSES ===
x = base_model.layers[-2].output
x = GlobalAveragePooling2D()(x) if len(x.shape) > 2 else x
predictions = Dense(len(selected_classes), activation='softmax')(x)
model = Model(inputs=base_model.input, outputs=predictions)

# === STEP 8: FREEZE EARLY LAYERS ===
for layer in model.layers[:-10]:
    layer.trainable = False

# === STEP 9: COMPILE AND TRAIN ===
model.compile(optimizer='adam', loss='categorical_crossentropy', metrics=['accuracy'])

model.fit(
    train_generator,
    validation_data=val_generator,
    epochs=5,
    steps_per_epoch=train_generator.samples // batch_size,
    validation_steps=val_generator.samples // batch_size
)

# === STEP 10: SAVE FINE-TUNED MODEL ===
Path("model").mkdir(parents=True, exist_ok=True)
model.save("model/trained_model.h5")

# === STEP 11: UPDATE class_names.py ===
class_names = train_generator.class_indices
sorted_names = sorted(class_names, key=lambda k: class_names[k])

with open("class_names.py", "w") as f:
    f.write("class_names = [\n")
    for name in sorted_names:
        f.write(f"    '{name}',\n")
    f.write("]\n")

print("\n✅ Fine-tuning complete. Model and class_names.py updated.")
