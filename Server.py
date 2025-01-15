import random
from flask import Flask, render_template, jsonify
import psutil  # For getting network interfaces
import socket

app = Flask(__name__, template_folder='templates')

def fetch_network_interfaces():
    try:
        interfaces = psutil.net_if_addrs()
        result = []
        for interface_name, addrs in interfaces.items():
            for addr in addrs:
                if addr.family in (socket.AF_INET, socket.AF_INET6):  # Corrected from psutil.AF_INET
                    address_family = "IPv4" if addr.family == socket.AF_INET else "IPv6"
                    result.append({
                        "interface": interface_name,
                        "address": addr.address,
                        "family": address_family,
                    })
        return result
    except Exception as e:
        return {"error": f"Error fetching network interfaces: {e}"}

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

# Route to fetch the gateway (router) IP address
@app.route('/api/gateway-ip')
def gateway_ip():
    try:
        interfaces = fetch_network_interfaces()
        print('Gateway IP Obtained:', interfaces)
        return jsonify(interfaces)
    except Exception as e:
        print("Error fetching gateway IP:", e)
        return jsonify({'error': 'Could not retrieve gateway IP'}), 500


if __name__ == '__main__':
    app.run(debug=True)
