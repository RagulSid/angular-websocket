from flask import Flask, request, jsonify
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketio = SocketIO(app, cors_allowed_origins="*")

@app.route('/')
def index():
    return "Socket.IO Server is running."

@app.route('/api/message', methods=['POST'])
def receive_message():
    message_data = request.json
    message = message_data.get('message', '')
    print(f'Received http message: {message}')    
    socketio.emit('message', message)
    return jsonify({"status": "success", "message": message}), 200

@socketio.on('message')
def handle_message(message):
    print(f'Received websocket message: {message}')
    send(message, broadcast=True)

if __name__ == '__main__':
    socketio.run(app, host='0.0.0.0', port=8082, allow_unsafe_werkzeug=True)
