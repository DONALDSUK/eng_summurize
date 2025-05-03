import pytesseract
from PIL import Image
from deep_translator import GoogleTranslator
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

import nltk
nltk.download('punkt')
nltk.download('punkt_tab')

# Tesseract 실행 파일 경로 설정
pytesseract.pytesseract.tesseract_cmd = r'C:\Program Files\Tesseract-OCR\tesseract.exe'

model_path = 't5_korean_summarization_model'
model = AutoModelForSeq2SeqLM.from_pretrained(model_path)
tokenizer = AutoTokenizer.from_pretrained(model_path)

def analyze_image(filepath):
    # 이미지 열기
    image = Image.open(filepath)
    
    # 이미지에서 텍스트 추출 (예시)
    text = pytesseract.image_to_string(image)

    translated_text = GoogleTranslator(source='en', target='ko').translate(text)

    # 입력 데이터 설정
    prefix = "summarize: "

    inputs = [prefix + translated_text]

    # 입력을 토크나이저로 처리
    inputs = tokenizer(inputs, max_length=2512, truncation=True, return_tensors="pt")

    # 모델에서 요약 생성
    output = model.generate(**inputs, num_beams=3, do_sample=True, min_length=10, max_length=100)

    # 생성된 텍스트 디코딩
    decoded_output = tokenizer.batch_decode(output, skip_special_tokens=True)[0]
    result = nltk.sent_tokenize(decoded_output.strip())[0]
    return {
        'translated_text': translated_text,
        'translated_summary': result
    }

