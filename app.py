import random
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Route for the main dashboard
@app.route('/')
def dashboard():
    return render_template('dashboard.html')

# Route for the analytics page
@app.route('/analytics')
def analytics():
    return render_template('analytics.html')

# Route for the VR training page
@app.route('/training')
def training():
    return render_template('training.html')

# Route for the sensor monitoring page
@app.route('/monitoring')
def monitoring():
    return render_template('monitoring.html')

# Simulate sensor and equipment health data
@app.route('/sensor_data')
def sensor_data():
    data = {
        # Environmental sensors
        "temperature": round(random.uniform(20.0, 30.0), 2),  # °C
        "gas_level": round(random.uniform(0.1, 1.0), 2),      # arbitrary units
        "vibration": round(random.uniform(0.0, 5.0), 2),      # arbitrary units

        # Equipment health sensors
        "motor_temp": round(random.uniform(60.0, 100.0), 2),  # °C, critical if > 90
        "vibration_level": round(random.uniform(0.0, 5.0), 2), # arbitrary units, critical if > 4
        "pressure": round(random.uniform(10.0, 30.0), 2),      # arbitrary units, critical if > 25
        "operational_time": random.randint(100, 500)          # hours, failure risk if > 400
    }

    # Simulate equipment failure risk based on thresholds
    data['failure_alert'] = any([
        data['motor_temp'] > 90,
        data['vibration_level'] > 4,
        data['pressure'] > 25,
        data['operational_time'] > 400
    ])

    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)

