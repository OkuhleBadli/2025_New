import random
from flask import Flask, render_template, jsonify

app = Flask(__name__, template_folder='templates')

# Route for the main dashboard
@app.route('/')
def dashboard():
    # Simulated data for the dashboard
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

    return render_template('dashboard.html', sensor_data=data)

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

# Route for the sensor data as JSON (optional for API use)
@app.route('/sensor_data')
def sensor_data():
    data = {
        "temperature": round(random.uniform(20.0, 30.0), 2),
        "gas_level": round(random.uniform(0.1, 1.0), 2),
        "vibration": round(random.uniform(0.0, 5.0), 2),
        "motor_temp": round(random.uniform(60.0, 100.0), 2),
        "vibration_level": round(random.uniform(0.0, 5.0), 2),
        "pressure": round(random.uniform(10.0, 30.0), 2),
        "operational_time": random.randint(100, 500)
    }
    data['failure_alert'] = any([
        data['motor_temp'] > 90,
        data['vibration_level'] > 4,
        data['pressure'] > 25,
        data['operational_time'] > 400
    ])
    return jsonify(data)

if __name__ == '__main__':
    app.run(debug=True)
