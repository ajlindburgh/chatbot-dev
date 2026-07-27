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

if __name__ == "__main__":
    app.run()
