const form = document.getElementById('uploadForm');
form.addEventListener('submit', async function(event) {
    event.preventDefault(); // 기본 폼 제출 동작 방지
    const formData = new FormData(form);
    
    try {
        const response = await fetch('/upload', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();
        document.getElementById('translated-text').innerText = data.translated_text;
        document.getElementById('translated-summary').innerText = data.translated_summary;
    } catch (error) {
        console.error('번역 요청 실패:', error);
    }
});

const imageUpload = document.getElementById('imageUpload');
const imagePreview = document.getElementById('imagePreview');
const imagePreviewContainer = document.getElementById('imagePreviewContainer');

imageUpload.addEventListener('change', function(event) {
    const file = event.target.files[0];
    
    if (file) {
        const reader = new FileReader();

        reader.onload = function(e) {
            imagePreview.src = e.target.result;
            imagePreviewContainer.style.display = 'block';

            setTimeout(() => {
                imagePreview.classList.add('show');
            }, 100);
        }

        reader.onerror = function(e) {
            console.error("파일 읽기 오류 발생", e);
        }

        reader.readAsDataURL(file);
    }
});

document.getElementById('translateButton').addEventListener('click', async function() {
    const inputText = document.getElementById('translate').value; // 입력된 텍스트 가져오기

    if (inputText.trim() === "") {
        alert("텍스트를 입력해주세요."); // 입력이 비어있을 때 경고
        return;
    }

    try {
        const response = await fetch('/translate', { // '/translate'는 서버의 번역 엔드포인트
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // JSON 형식으로 데이터 전송
            },
            body: JSON.stringify({ text: inputText }), // 입력된 텍스트를 JSON 형태로 변환
        });

        if (!response.ok) {
            throw new Error('서버 응답 오류');
        }

        const data = await response.json(); // 서버에서 응답받은 데이터 파싱
        document.getElementById('translate-word').innerText = data.translated_text; // 번역 결과 표시
    } catch (error) {
        console.error('번역 요청 실패:', error);
        document.getElementById('translate-word').innerText = '번역 실패: ' + error.message; // 오류 메시지 표시
    }
});

document.getElementById('translateButton').addEventListener('click', async function() {
    const inputText = document.getElementById('translate').value; // 입력된 텍스트 가져오기

    if (inputText.trim() === "") {
        alert("텍스트를 입력해주세요."); // 입력이 비어있을 때 경고
        return;
    }

    try {
        const response = await fetch('/translate', { // '/translate'는 서버의 번역 엔드포인트
            method: 'POST',
            headers: {
                'Content-Type': 'application/json', // JSON 형식으로 데이터 전송
            },
            body: JSON.stringify({ text: inputText }), // 입력된 텍스트를 JSON 형태로 변환
        });

        if (!response.ok) {
            throw new Error('서버 응답 오류');
        }

        const data = await response.json(); // 서버에서 응답받은 데이터 파싱
        document.getElementById('translate-word').innerText = data.translated_text; // 번역 결과 표시

        // 단어장 업데이트
        await loadVocabulary(); // 단어장 다시 불러오기
    } catch (error) {
        console.error('번역 요청 실패:', error);
        document.getElementById('translate-word').innerText = '번역 실패: ' + error.message; // 오류 메시지 표시
    }
});

async function loadVocabulary() {
    try {
        const response = await fetch('/vocabulary');
        const vocab = await response.json();
        
        const vocabList = document.getElementById('vocabularyList');
        vocabList.innerHTML = ''; // 이전 내용 제거

        for (const [english, korean] of Object.entries(vocab)) {
            const listItem = document.createElement('li');
            listItem.textContent = `${english}: ${korean}`; // 영어 단어와 번역 추가
            vocabList.appendChild(listItem);
        }
    } catch (error) {
        console.error('단어장 로드 실패:', error);
    }
}

// 페이지 로드 시 단어장 불러오기
window.onload = loadVocabulary;

function clearInput(){

    var e1 = document.getElementById("signUpEmail");
    var e2 = document.getElementById("signIpEmail");
    var e3 = document.getElementById("signUpPassword");
    var e4 = document.getElementById("signIpPassword");
    e1.value = '';
    e2.value = '';
    e3.value = '';
    e4.value = '';
}
