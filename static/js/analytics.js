  // Generate random data for charts
  function getRandomData(points, min, max) {
    let data = [];
    for (let i = 0; i < points; i++) {
        data.push(Math.random() * (max - min) + min);
    }
    return data;
}

// Labels for the last 10 days
const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Today'];

// Temperature Chart
new Chart(document.getElementById('temperatureChart'), {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Temperature (°C)',
            data: getRandomData(10, 20, 30),
            borderColor: 'rgba(255, 99, 132, 1)',
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true }
        }
    }
});

// Gas Level Chart
new Chart(document.getElementById('gasLevelChart'), {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Gas Level',
            data: getRandomData(10, 0.1, 1.0),
            borderColor: 'rgba(54, 162, 235, 1)',
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true }
        }
    }
});

// Vibration Chart
new Chart(document.getElementById('vibrationChart'), {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Vibration Level',
            data: getRandomData(10, 0, 5),
            borderColor: 'rgba(75, 192, 192, 1)',
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true }
        }
    }
});

// Motor Temperature Chart
new Chart(document.getElementById('motorTempChart'), {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Motor Temperature (°C)',
            data: getRandomData(10, 60, 100),
            borderColor: 'rgba(255, 206, 86, 1)',
            backgroundColor: 'rgba(255, 206, 86, 0.2)',
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true }
        }
    }
});

// Pressure Chart
new Chart(document.getElementById('pressureChart'), {
    type: 'line',
    data: {
        labels: labels,
        datasets: [{
            label: 'Pressure',
            data: getRandomData(10, 10, 30),
            borderColor: 'rgba(153, 102, 255, 1)',
            backgroundColor: 'rgba(153, 102, 255, 0.2)',
            fill: true
        }]
    },
    options: {
        responsive: true,
        plugins: {
            legend: { display: true }
        }
    }
});