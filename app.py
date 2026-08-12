import time
from flask import Flask, request, jsonify

app = Flask(__name__)

@app.route("/")
def home():
    return "Chatbot API Running"

@app.route("/chat", methods=["POST"])
def chat():
    data = request.json

    return jsonify({
        "response": f"You said: {data['message']}"
    })

@app.route("/settings", methods=["GET"])
def settings():
    return jsonify({
        "bot_name": "AaronBot",
        "version": "1.0"
    })

@app.route("/gotosleep", methods=["GET"])
def gotosleep():
    time.sleep(10)
    return jsonify({
        "message": "Did this work?"
        })

@app.route("/wait", methods=["POST"])
def wait():
    data = request.json
    phone = request.json.get("phone")
    time.sleep(15)
    return jsonify({
        "response": f"I have just recorded {phone}",
        "state": f"I am reporting {data['message']}"
    })

@app.route("/health", methods=["GET"])
def health():
    return jsonify({
        "status": "ok"
    })
    
if __name__ == "__main__":
   app.run()
