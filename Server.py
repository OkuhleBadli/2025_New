import random
from flask import Flask, render_template, jsonify
import psutil  # For getting network interfaces
import socket

app = Flask(__name__, template_folder='templates')


def test_gateway_ip():
    try:
        gateways = psutil.net_if_addrs()
        for interface, addrs in gateways.items():
            for addr in addrs:
                if addr.family == psutil.AF_INET4:  # Only check IPv4 addresses
                    print(f"Interface: {interface}, IP Address: {addr.address}")
    except Exception as e:
        print("Error fetching network interfaces:", e)

test_gateway_ip()


# Function to get the default gateway (router IP address)
def get_gateway_ip():
    try:
        # Get network interface addresses
        gateways = psutil.net_if_addrs()
        for interface, addrs in gateways.items():
            for addr in addrs:
                # Check for IPv4 address using socket.AF_INET
                if addr.family == socket.AF_INET:
                    print(f"Interface: {interface}, IP Address: {addr.address}")
                    return addr.address  # Return the first found IPv4 address
    except Exception as e:
        print("Error fetching network interfaces:", e)
        return 'Could not retrieve gateway IP'


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
        gateway_ip = get_gateway_ip()
        print('Gateway IP Obtained:', gateway_ip)
        return jsonify({'gatewayIp': gateway_ip})
    except Exception as e:
        print("Error fetching gateway IP:", e)
        return jsonify({'error': 'Could not retrieve gateway IP'}), 500


if __name__ == '__main__':
    app.run(debug=True)
