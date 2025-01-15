import cv2

# Connect to the drone's video stream
cap = cv2.VideoCapture('rtsp://192.168.1.1:8888')

while True:
    ret, frame = cap.read()
    if not ret:
        print("Failed to retrieve frame. Reconnecting...")
        continue

    # Display the video feed
    cv2.imshow('Drone Feed', frame)

    # Break on 'q' key
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()
