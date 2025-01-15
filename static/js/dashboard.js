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



    const fetchNetworkInterfaces = async () => {
        try {
            const response = await fetch('/api/gateway-ip');
            const interfaces = await response.json();
    
            if (Array.isArray(interfaces)) {
                const list = document.getElementById('network-interfaces');
                list.innerHTML = interfaces
                    .map(
                        (iface) =>
                            `<li>Iterface: ${iface.interface} - Adress:${iface.address} FAMILY :(${iface.family})</li>`
                    )
                    .join('');
            } else {
                console.error('Unexpected response format:', interfaces);
            }
        } catch (error) {
            console.error('Error fetching network interfaces:', error);
        }
    };
    

    // Fetch the gateway IP address when the page loads
    fetchNetworkInterfaces();


    const fetchDeviceData = async () => {
    try {
        const response = await fetch('/api/device_data');
        
        if (!response.ok) {
            throw new Error(`Error fetching data: ${response.statusText}`);
        }

        const data = await response.json();
        console.log("DATA OBTAINED FROM DEVICES:", data);
    } catch (error) {
        console.error("Failed to fetch device data:", error);
    }
};

fetchDeviceData();
    // Periodically update data
    setInterval([fetchAndUpdateSensorData,
        fetchDeviceData
    ], 5000); // Every 5 seconds


});
