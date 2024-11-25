from flask import Flask, render_template, request, jsonify
import requests 

app = Flask(__name__)

BACKEND_URL = 'http://localhost:5000/api/items'

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/items', methods=['GET', 'POST'])
def items():
    if request.method == 'POST':
        item = request.get_json()
        response = requests.post(BACKEND_URL, json=item)
        return jsonify(response.json()), response.status_code
    else:
        response = requests.get(BACKEND_URL)
        return jsonify(response.json()), response.status_code

if __name__ == '__main__':
    app.run(port=5001, debug=True)