/* This JavaScript code snippet is adding an event listener to the `DOMContentLoaded` event, which
fires when the initial HTML document has been completely loaded and parsed. Inside this event
listener function, the code is performing the following tasks: */
document.addEventListener('DOMContentLoaded', () => {

    // IDs of the data elements
    const elements = {
        temperature: document.getElementById('temperature'),
        gasLevel: document.getElementById('gas-level'),
        vibration: document.getElementById('vibration'),
        motorTemp: document.getElementById('motor-temp'),
        vibrationLevel: document.getElementById('vibration-level'),
        pressure: document.getElementById('pressure'),
        operationalTime: document.getElementById('operational-time'),
        failureAlert: document.getElementById('failure-alert'),
    };

    // Function to fetch and update sensor data
    const fetchAndUpdateSensorData = async () => {
        try {
            const response = await fetch('/sensor_data');
            if (response.ok) {
                const data = await response.json();

                // Update elements with new data
                elements.temperature.textContent = `Temperature: ${data.temperature} °C`;
                elements.gasLevel.textContent = `Gas Level: ${data.gas_level}`;
                elements.vibration.textContent = `Vibration: ${data.vibration}`;
                elements.motorTemp.textContent = `Motor Temperature: ${data.motor_temp} °C`;
                elements.vibrationLevel.textContent = `Vibration Level: ${data.vibration_level}`;
                elements.pressure.textContent = `Pressure: ${data.pressure}`;
                elements.operationalTime.textContent = `Operational Time: ${data.operational_time} hrs`;

                // Update failure alert
                if (data.failure_alert) {
                    elements.failureAlert.style.display = 'block';
                    elements.failureAlert.textContent = 'Failure Alert: Equipment requires attention!';
                } else {
                    elements.failureAlert.style.display = 'none';
                }
            } else {
                console.error('Failed to fetch sensor data:', response.statusText);
            }
        } catch (error) {
            console.error('Error fetching sensor data:', error);
        }
    };

    // Periodically update data
    setInterval(fetchAndUpdateSensorData, 5000); // Every 5 seconds


});
