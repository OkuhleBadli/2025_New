import cv2
import binascii
import socket
from io import BytesIO
from PIL import Image
import numpy as np
from wifi import Cell, Scheme  # Replace with actual Wi-Fi scanning library
from pywifi import PyWiFi, const, Profile

# Function to scan for available Wi-Fi networks using pywifi
def wifi_scan():
    wifi = PyWiFi()
    iface = wifi.interfaces()[0]  # Select the first Wi-Fi interface
    iface.scan()  # Initiate the scan
    results = iface.scan_results()  # Get the scan results
    return results
    print("Scanning Wi-Fi networks...")
    scan_networks()
# Wi-Fi scanning function
def scan_networks():
    networks = wifi_scan()  # Adjust this call to match your Wi-Fi scanning library
    filtered_networks = [network for network in networks if network.ssid.lower().startswith(('wi-fi', 'wifi', 'wi fi'))]
    print("Matching Networks:", filtered_networks)
    return filtered_networks

# Function to get the local machine's IP address
def get_local_ip():
    """Retrieve the local machine's IP address."""
    s = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
    try:
        s.connect(("8.8.8.8", 80))
        local_ip = s.getsockname()[0]
        print("LOCAL IP:" ,local_ip)
    except Exception as e:
        local_ip = "127.0.0.1"  # Fallback to localhost
        print(f"Error determining local IP: {e}")
    finally:
        s.close()
    return local_ip

# Function to obtain the drone's IP address from the available Wi-Fi networks
def get_drone_ip():
    """Retrieve the IP address of the drone based on network scanning."""
    networks = wifi_scan()  # Adjust this call to match your Wi-Fi scanning library
    for network in networks:
        if network.ssid.lower().startswith(('wi-fi', 'wifi', 'wi fi')):  # Match Wi-Fi SSID
            print(f"Found drone network: {network.ssid}")
            return "192.168.4.153"  # Modify this logic if necessary to extract the actual drone IP
    return None  # If no matching networks are found

# Dynamically set IP addresses
local_ip = get_local_ip()
drone_ip = get_drone_ip()  # Dynamically get the drone's IP

if not drone_ip:
    print("Drone IP not found!")
    exit()

# Port configuration
local_port = 19797
drone_port = 8080

# Create a socket for video feed
video = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
video.bind((local_ip, local_port))

# Start the video stream
video_start_message = str.encode('Bv')
video.sendto(video_start_message, (drone_ip, drone_port))

def camera_feed():
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    packet_data = bytearray()

    while True:
        data, _ = video.recvfrom(2048)
        data = data.hex()[16:]
        end_of_pic = data.find("ffffffd9")

        if end_of_pic > 0:
            data = data[:end_of_pic + 8]

        data = binascii.a2b_hex(data)
        packet_data += bytearray(data)

        if end_of_pic > 0:
            if not packet_data.hex().startswith("ffd8") or not packet_data.hex().endswith("ffffffd9"):
                packet_data = bytearray()
            else:
                buf = BytesIO(packet_data)
                try:
                    img = np.array(Image.open(buf))
                    img = cv2.cvtColor(img, cv2.COLOR_RGB2BGR)

                    # Haar Cascade for face detection
                    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
                    faces = face_cascade.detectMultiScale(gray, 1.3, 5)
                    for (x, y, w, h) in faces:
                        cv2.rectangle(img, (x, y), (x + w, y + h), (255, 0, 0), 2)

                    cv2.imshow('Drone Camera', img)
                except Exception as e:
                    print(f"Error processing frame: {e}")
                finally:
                    buf.close()
                    packet_data = bytearray()

            if cv2.waitKey(1) & 0xFF == ord('q'):
                break

    cv2.destroyAllWindows()

# Run Wi-Fi scanning and camera feed simultaneously
try:


    print("Starting drone camera feed...")
    camera_feed()

finally:
    video.close()

