async function getPredictedLabel(processed_t) {
  try {
    const response = await fetch("https://uhivurgwswtr.eu-central-1.clawcloudrun.com/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ landmarks: processed_t })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    const gesture = result.gesture; // e.g., "Thumb_Up", "Swipe_Left"
    console.log("Raw gesture:", gesture);

    // Map gestures to direction labels
    const gestureToDirection = {
      "like": "up",
      "dislike": "down",
      "stop": "left",
      "one": "right"
    };

    const directionLabel = gestureToDirection[gesture] || null;
    console.log("Mapped label:", directionLabel);

    return directionLabel;

  } catch (error) {
    console.error("Error while predicting label:", error);
    return null;
  }
}
