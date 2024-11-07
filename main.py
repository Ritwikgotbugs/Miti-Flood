from flask import Flask, request, jsonify
import pickle
from joblib import load


app = Flask(__name__)

# Load the model
model = load('main.pkl')


# Example Flask route with specific input fields
@app.route('/predict', methods=['POST'])
def predict():
    data = request.get_json()
    
    # Extract parameters from data
    input_features = [
        data['MonsoonIntensity'], data['TopographyDrainage'],
        data['RiverManagement'], data['Deforestation'],
        data['Urbanization'], data['ClimateChange'],
        data['DamsQuality'], data['Siltation'],
        data['AgriculturalPractices'], data['Encroachments'],
        data['IneffectiveDisasterPreparedness'], data['DrainageSystems'],
        data['CoastalVulnerability'], data['Landslides'],
        data['Watersheds'], data['DeterioratingInfrastructure'],
        data['PopulationScore'], data['WetlandLoss'],
        data['InadequatePlanning'], data['PoliticalFactors']
    ]
    
    # Use input_features in model prediction
    prediction = model.predict([input_features])
    return jsonify({'prediction': prediction.tolist()})


if __name__ == '__main__':
    app.run(debug=True)
