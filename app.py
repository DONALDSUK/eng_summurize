from flask import Flask, render_template, jsonify, request
import os
from tesseract import analyze_image
from translate import translate, get_vocabulary  # 함수 가져오기

app = Flask(__name__)

UPLOAD_FOLDER = 'uploads/'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'image' not in request.files:
        return jsonify({'error': '이미지 파일이 업로드되지 않았습니다.'}), 400
    
    file = request.files['image']
    
    if file.filename == '':
        return jsonify({'error': '선택된 파일이 없습니다.'}), 400
    
    if file:
        filepath = os.path.join(UPLOAD_FOLDER, file.filename)
        file.save(filepath)

        result = analyze_image(filepath)
        
        return jsonify(result)

@app.route('/translate', methods=['POST'])
def translate_text():
    data = request.get_json()  # JSON 형태로 데이터 가져오기
    text = data.get('text', '')  # 'text' 키에서 값 가져오기

    if not text:
        return jsonify({'error': '번역할 텍스트가 없습니다.'}), 400

    try:
        translated_text = translate(text)  # translate 함수 호출
        return jsonify({'translated_text': translated_text})  # 번역된 텍스트 반환
    except Exception as e:
        return jsonify({'error': str(e)}), 500  # 오류 발생 시 메시지 반환

@app.route('/vocabulary', methods=['GET'])
def vocabulary():
    vocab = get_vocabulary()  # 단어장 가져오기
    return jsonify(vocab)  # JSON 형태로 반환

if __name__ == '__main__':
    app.run(debug=True)
