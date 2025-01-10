function fetchSensorData() {
    fetch('/sensor_data')
        .then(response => response.json())
        .then(data => {
            // Update environmental data
            document.getElementById('temperature').textContent = data.temperature;
            document.getElementById('gas-level').textContent = data.gas_level;
            document.getElementById('vibration').textContent = data.vibration;

            // Update equipment health data
            document.getElementById('motor-temp').textContent = data.motor_temp;
            document.getElementById('vibration-level').textContent = data.vibration_level;
            document.getElementById('pressure').textContent = data.pressure;
            document.getElementById('operational-time').textContent = data.operational_time;

            // Display alert if equipment failure risk is detected
            if (data.failure_alert) {
                document.getElementById('failure-alert').style.display = 'block';
            } else {
                document.getElementById('failure-alert').style.display = 'none';
            }
        })
        .catch(error => console.error('Error fetching sensor data:', error));
}

// Update sensor data every 5 seconds
setInterval(fetchSensorData, 5000);

// Fetch data immediately on load
fetchSensorData();