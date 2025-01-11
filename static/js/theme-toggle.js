// Global chart references
let temperatureChart, gasLevelChart, vibrationChart, motorTempChart, pressureChart;

// Generate random data for charts
function getRandomData(points, min, max) {
    let data = [];
    for (let i = 0; i < points; i++) {
        data.push(Math.random() * (max - min) + min);
    }
    return data;
}

function getCSSVariable(variableName) {
    return getComputedStyle(document.documentElement).getPropertyValue(variableName).trim();
}

// Labels for the last 10 days
const labels = ['Day 1', 'Day 2', 'Day 3', 'Day 4', 'Day 5', 'Day 6', 'Day 7', 'Day 8', 'Day 9', 'Today'];

// Initialize charts with text color adjustments
function initializeCharts() {
    temperatureChart = new Chart(document.getElementById('temperatureChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Temperature (°C)',
                data: getRandomData(10, 20, 30),
                borderColor: getCSSVariable('--temperature-border-color'),
                backgroundColor: getCSSVariable('--temperature-bg-color'),
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { 
                    display: true, 
                    labels: {
                        color: getCSSVariable('--text-color') 
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: getCSSVariable('--text-color') // Set x-axis text color
                    }
                },
                y: {
                    ticks: {
                        color: getCSSVariable('--text-color') // Set y-axis text color
                    }
                }
            },
            elements: {
                line: {
                    tension: 0.4
                }
            },
            plugins: {
                tooltip: {
                    titleColor: getCSSVariable('--text-color'), // Set tooltip title text color
                    bodyColor: getCSSVariable('--text-color') // Set tooltip body text color
                }
            }
        }
    });

    gasLevelChart = new Chart(document.getElementById('gasLevelChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Gas Level',
                data: getRandomData(10, 0.1, 1.0),
                borderColor: getCSSVariable('--gas-border-color'),
                backgroundColor: getCSSVariable('--gas-bg-color'),
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { 
                    display: true, 
                    labels: {
                        color: getCSSVariable('--text-color') // Set legend text color
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: getCSSVariable('--text-color') // Set x-axis text color
                    }
                },
                y: {
                    ticks: {
                        color: getCSSVariable('--text-color') // Set y-axis text color
                    }
                }
            },
            plugins: {
                tooltip: {
                    titleColor: getCSSVariable('--text-color'), // Set tooltip title text color
                    bodyColor: getCSSVariable('--text-color') // Set tooltip body text color
                }
            }
        }
    });

    vibrationChart = new Chart(document.getElementById('vibrationChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Vibration Level',
                data: getRandomData(10, 0, 5),
                borderColor: getCSSVariable('--vibration-border-color'),
                backgroundColor: getCSSVariable('--vibration-bg-color'),
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { 
                    display: true, 
                    labels: {
                        color: getCSSVariable('--text-color') // Set legend text color
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: getCSSVariable('--text-color') // Set x-axis text color
                    }
                },
                y: {
                    ticks: {
                        color: getCSSVariable('--text-color') // Set y-axis text color
                    }
                }
            },
            plugins: {
                tooltip: {
                    titleColor: getCSSVariable('--text-color'), // Set tooltip title text color
                    bodyColor: getCSSVariable('--text-color') // Set tooltip body text color
                }
            }
        }
    });

    motorTempChart = new Chart(document.getElementById('motorTempChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Motor Temperature (°C)',
                data: getRandomData(10, 60, 100),
                borderColor: getCSSVariable('--motor-temp-border-color'),
                backgroundColor: getCSSVariable('--motor-temp-bg-color'),
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { 
                    display: true, 
                    labels: {
                        color: getCSSVariable('--text-color') // Set legend text color
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: getCSSVariable('--text-color') // Set x-axis text color
                    }
                },
                y: {
                    ticks: {
                        color: getCSSVariable('--text-color') // Set y-axis text color
                    }
                }
            },
            plugins: {
                tooltip: {
                    titleColor: getCSSVariable('--text-color'), // Set tooltip title text color
                    bodyColor: getCSSVariable('--text-color') // Set tooltip body text color
                }
            }
        }
    });

    pressureChart = new Chart(document.getElementById('pressureChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [{
                label: 'Pressure',
                data: getRandomData(10, 10, 30),
                borderColor: getCSSVariable('--pressure-border-color'),
                backgroundColor: getCSSVariable('--pressure-bg-color'),
                fill: true
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: { 
                    display: true, 
                    labels: {
                        color: getCSSVariable('--text-color') // Set legend text color
                    }
                }
            },
            scales: {
                x: {
                    ticks: {
                        color: getCSSVariable('--text-color') // Set x-axis text color
                    }
                },
                y: {
                    ticks: {
                        color: getCSSVariable('--text-color') // Set y-axis text color
                    }
                }
            },
            plugins: {
                tooltip: {
                    titleColor: getCSSVariable('--text-color'), // Set tooltip title text color
                    bodyColor: getCSSVariable('--text-color') // Set tooltip body text color
                }
            }
        }
    });
}

// Update chart colors and text color based on the theme
function updateChartColors() {
    temperatureChart.data.datasets[0].borderColor = getCSSVariable('--temperature-border-color');
    temperatureChart.data.datasets[0].backgroundColor = getCSSVariable('--temperature-bg-color');

    gasLevelChart.data.datasets[0].borderColor = getCSSVariable('--gas-border-color');
    gasLevelChart.data.datasets[0].backgroundColor = getCSSVariable('--gas-bg-color');

    vibrationChart.data.datasets[0].borderColor = getCSSVariable('--vibration-border-color');
    vibrationChart.data.datasets[0].backgroundColor = getCSSVariable('--vibration-bg-color');

    motorTempChart.data.datasets[0].borderColor = getCSSVariable('--motor-temp-border-color');
    motorTempChart.data.datasets[0].backgroundColor = getCSSVariable('--motor-temp-bg-color');

    pressureChart.data.datasets[0].borderColor = getCSSVariable('--pressure-border-color');
    pressureChart.data.datasets[0].backgroundColor = getCSSVariable('--pressure-bg-color');

    // Update text colors
    temperatureChart.options.plugins.legend.labels.color = getCSSVariable('--text-color');
    gasLevelChart.options.plugins.legend.labels.color = getCSSVariable('--text-color');
    vibrationChart.options.plugins.legend.labels.color = getCSSVariable('--text-color');
    motorTempChart.options.plugins.legend.labels.color = getCSSVariable('--text-color');
    pressureChart.options.plugins.legend.labels.color = getCSSVariable('--text-color');

    temperatureChart.options.scales.x.ticks.color = getCSSVariable('--text-color');
    gasLevelChart.options.scales.x.ticks.color = getCSSVariable('--text-color');
    vibrationChart.options.scales.x.ticks.color = getCSSVariable('--text-color');
    motorTempChart.options.scales.x.ticks.color = getCSSVariable('--text-color');
    pressureChart.options.scales.x.ticks.color = getCSSVariable('--text-color');

    temperatureChart.options.scales.y.ticks.color = getCSSVariable('--text-color');
    gasLevelChart.options.scales.y.ticks.color = getCSSVariable('--text-color');
    vibrationChart.options.scales.y.ticks.color = getCSSVariable('--text-color');
    motorTempChart.options.scales.y.ticks.color = getCSSVariable('--text-color');
    pressureChart.options.scales.y.ticks.color = getCSSVariable('--text-color');

    temperatureChart.options.plugins.tooltip.titleColor = getCSSVariable('--text-color');
    gasLevelChart.options.plugins.tooltip.titleColor = getCSSVariable('--text-color');
    vibrationChart.options.plugins.tooltip.titleColor = getCSSVariable('--text-color');
    motorTempChart.options.plugins.tooltip.titleColor = getCSSVariable('--text-color');
    pressureChart.options.plugins.tooltip.titleColor = getCSSVariable('--text-color');

    temperatureChart.options.plugins.tooltip.bodyColor = getCSSVariable('--text-color');
    gasLevelChart.options.plugins.tooltip.bodyColor = getCSSVariable('--text-color');
    vibrationChart.options.plugins.tooltip.bodyColor = getCSSVariable('--text-color');
    motorTempChart.options.plugins.tooltip.bodyColor = getCSSVariable('--text-color');
    pressureChart.options.plugins.tooltip.bodyColor = getCSSVariable('--text-color');

    // Refresh charts
    temperatureChart.update();
    gasLevelChart.update();
    vibrationChart.update();
    motorTempChart.update();
    pressureChart.update();
}

// Toggle theme and update chart colors and text color on button click
document.addEventListener('DOMContentLoaded', () => {
    const themeToggleButton = document.getElementById('themeToggle');
    const themeIcon = document.getElementById('themeIcon');
    const body = document.body;

    const setThemeColors = (theme) => {
        if (theme === 'dark') {
            body.classList.add('dark-theme');
            body.classList.remove('light-theme');
            themeIcon.classList.remove('fa-sun');
            themeIcon.classList.add('fa-moon');
        } else {
            body.classList.add('light-theme');
            body.classList.remove('dark-theme');
            themeIcon.classList.remove('fa-moon');
            themeIcon.classList.add('fa-sun');
        }
    };

    // Check the saved theme preference in localStorage
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setThemeColors(savedTheme);
    } else {
        setThemeColors('light'); // Default theme
    }

    // Toggle theme on button click
    themeToggleButton.addEventListener('click', () => {
        const isDarkMode = body.classList.contains('dark-theme');
        const newTheme = isDarkMode ? 'light' : 'dark';
        setThemeColors(newTheme);

        localStorage.setItem('theme', newTheme);

        // Update chart colors and text color after theme change
        updateChartColors();
    });

    // Initialize charts after theme is set
    initializeCharts();
});

