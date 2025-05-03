# 📝 OCR 번역 및 요약 웹 애플리케이션

## 📌 프로젝트 소개
이 프로젝트는 이미지에서 텍스트를 추출(OCR)하고, 영어를 한국어로 번역한 후 내용을 요약해주는 올인원 웹 애플리케이션입니다. 
Tesseract OCR, Google Translator, 그리고 T5 요약 모델을 통합하여 사용자에게 편리한 텍스트 처리 서비스를 제공합니다.

## ⚙️ 설치 방법

### 1. 저장소 클론
```bash
git clone https://github.com/DONALDSUK/eng_summurize.git
cd eng_summurize
```

### 2. 가상환경 설정
```bash
python -m venv eng-summurize
.\eng-summurize\Scripts\activate  # Windows
```

### 3. 필요한 패키지 설치
```bash
pip install -r requirements.txt
```

### 4. Tesseract OCR 설치
1. [Tesseract 설치 프로그램](https://github.com/UB-Mannheim/tesseract/wiki)에서 Windows용 설치 파일을 다운로드
2. 설치 시 기본 경로(`C:\Program Files\Tesseract-OCR\`)에 설치
3. 시스템 환경 변수 Path에 `C:\Program Files\Tesseract-OCR\` 추가

### 5. T5 한국어 요약 모델 설치
Google Colab에서 다음 코드를 실행하여 모델을 다운로드:
```python
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM

# 모델과 토크나이저 로드
tokenizer = AutoTokenizer.from_pretrained("eenzeenee/t5-base-korean-summarization")
model = AutoModelForSeq2SeqLM.from_pretrained("eenzeenee/t5-base-korean-summarization")

# 모델과 토크나이저 저장
model_save_path = "./t5_korean_summarization_model"
model.save_pretrained(model_save_path)
tokenizer.save_pretrained(model_save_path)

# 압축 파일 생성 및 다운로드
import shutil
from google.colab import files
shutil.make_archive('t5_korean_summarization_model', 'zip', model_save_path)
files.download('t5_korean_summarization_model.zip')
```

다운로드 받은 `t5_korean_summarization_model.zip` 파일을 프로젝트 루트 디렉토리에 압축 해제합니다.

## 🚀 실행 방법
```bash
python app.py
```
웹 브라우저에서 `http://localhost:5000`으로 접속하여 서비스를 이용할 수 있습니다.

## 💡 주요 기능

### 1. OCR (광학 문자 인식)
- 이미지에서 영어 텍스트 추출
- 다양한 이미지 형식 지원
- Tesseract 엔진 기반 정확한 텍스트 인식

### 2. 자동 번역
- 영어 → 한국어 번역
- Google Translator 활용
- 실시간 번역 처리

### 3. 텍스트 요약
- T5 모델 기반 한국어 텍스트 요약
- 핵심 내용 자동 추출
- 컨텍스트 유지 알고리즘 적용

### 4. 단어장 기능
- 번역된 단어/문장 자동 저장
- 개인화된 학습 자료 제공
- 학습 기록 관리

## 📁 프로젝트 구조
```
eng_summurize/
│
├── app.py              # Flask 애플리케이션 메인
├── tesseract.py       # OCR 및 요약 처리
├── translate.py       # 번역 및 단어장 기능
├── 모델 파일  # 저장한 모델 파일
│
├── templates/         # HTML 템플릿
│   └── index.html    # 메인 페이지
│
├── static/           # 정적 파일
│   └── main.js      # JavaScript 파일
│
└── uploads/         # 업로드된 이미지 저장
```

## ⚠️ 주의사항
- Python 3.8 이상 버전이 필요합니다
- Tesseract OCR이 올바르게 설치되어 있어야 합니다
- 인터넷 연결이 필요합니다 (번역 기능)
- T5 모델 파일이 올바른 위치에 있어야 합니다

## 🔗 참고 자료
- [Tesseract OCR](https://github.com/UB-Mannheim/tesseract/wiki)
- [T5 한국어 요약 모델](https://huggingface.co/eenzeenee/t5-base-korean-summarization)
