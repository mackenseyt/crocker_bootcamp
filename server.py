from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable CORS with explicit allowed origins (from http://localhost:8000)
CORS(app, resources={r"/control-light": {"origins": "http://127.0.0.1:8000"}})

# Root route (optional)
@app.route("/", methods=["GET"])
def home():
    return "Server is running!", 200

# Control light endpoint
@app.route("/control-light", methods=["POST"])
def control_light():
    data = request.json
    print("Received data:", data)  # Log received data

    duration = data.get("duration")
    if not duration:
        return jsonify({"error": "Duration is required"}), 400

    response = {"message": f"Light will turn on for {duration} seconds"}
    print("Sending response:", response)  # Log the response
    return jsonify(response), 200

if __name__ == "__main__":
    app.run(debug=True, port=5001)  # Ensure it's running on port 5001
