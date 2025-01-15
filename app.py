import cv2
import time
import os

# RTSP Stream URL (replace with your drone's URL)
rtsp_url = "rtsp://10.20.54.191:554"  # Replace with your actual RTSP stream URL

# Directory to save captured images
output_dir = "captured_images"
if not os.path.exists(output_dir):
    os.makedirs(output_dir)

# Open video capture using OpenCV
cap = cv2.VideoCapture(rtsp_url)

# Check if the video capture is opened correctly
if not cap.isOpened():
    print("Error: Unable to open RTSP stream")
    exit()

frame_count = 0
fps = 10  # Frames per second for capturing images

print("Starting to capture frames...")

while True:
    ret, frame = cap.read()

    if not ret:
        print("Error: Unable to read frame from stream")
        break

    frame_count += 1

    # Save frame as an image file
    image_filename = f"{output_dir}/frame_{frame_count}.png"
    cv2.imwrite(image_filename, frame)
    print(f"Captured frame {frame_count} and saved as {image_filename}")

    # Wait for a short duration (based on FPS)
    time.sleep(1 / fps)

    # For demonstration purposes, we break after capturing 50 frames
    if frame_count >= 50:
        break

# Release video capture object and close windows
cap.release()
cv2.destroyAllWindows()

print("Finished capturing frames.")
