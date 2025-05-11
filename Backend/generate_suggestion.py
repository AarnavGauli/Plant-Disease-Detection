from class_names import class_names

suggestions = {}

for name in class_names:
    if "healthy" in name.lower():
        suggestion = "Plant is healthy. No treatment needed — maintain good care and monitoring."
    elif "blight" in name.lower():
        suggestion = "Remove affected leaves. Apply fungicide and rotate crops if needed."
    elif "mildew" in name.lower():
        suggestion = "Ensure good air circulation. Use sulfur or neem oil-based fungicide."
    elif "bacterial" in name.lower():
        suggestion = "Use copper-based bactericides. Remove infected parts early."
    elif "virus" in name.lower():
        suggestion = "Remove infected plants. Control insect vectors like whiteflies."
    elif "rust" in name.lower():
        suggestion = "Use resistant varieties. Apply appropriate fungicide during early stages."
    else:
        suggestion = "No suggestion available. Please consult local agricultural guidelines."
    
    suggestions[name] = suggestion

# === Save to file ===
with open("disease_suggestions.py", "w") as f:
    f.write("disease_suggestions = {\n")
    for key, val in suggestions.items():
        f.write(f"    '{key}': \"{val}\",\n")
    f.write("}\n")

print("✅ disease_suggestions.py generated.")
