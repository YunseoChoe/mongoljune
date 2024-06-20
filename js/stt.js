// 서버로 데이터를 전송하는 함수
async function sendToServer(data, apiUrl) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        if (!response.ok) {
            throw new Error('서버 응답에 실패했습니다.');
        }

        const responseData = await response.json();
        console.log("응답 성공");
        console.log(responseData);
    } catch (error) {
        console.error('오류 발생:', error.message);
    }
}

window.onload = async () => {
    const recognition = new webkitSpeechRecognition();
    const STT_API_URL = "https://www.mongoljune.shop/openai/generate"; 
    let answerResult = "";
    let selectedDate = ""; // 날짜 선택 변수 추가

    const question = document.getElementById('question');
    question.innerText = "오늘의 날씨는 어때?";

    recognition.lang = 'ko-KR';
    recognition.continuous = true;

    // 날짜 선택 버튼 이벤트 핸들러 추가
    document.getElementById('selectDateBtn').addEventListener('click', () => {
        selectedDate = document.getElementById('date').value;
        if (selectedDate) {
            document.getElementById('date-selection').style.display = 'none';
            document.getElementById('voice-recognition').style.display = 'block';
            console.log('선택된 날짜:', selectedDate);
        } else {
            alert('날짜를 선택하세요.');
        }
    });

    document.getElementById('startBtn').addEventListener('click', () => {
        recognition.start();
        console.log('음성 입력 시작');
    });

    document.getElementById('stopBtn').addEventListener('click', () => {
        recognition.stop();
        console.log('음성 입력 종료');
    });

    recognition.onresult = function (event) {
        const result = event.results[event.results.length - 1][0].transcript;
        console.log(result);
        if (answerResult == "") {
            answerResult = answerResult + result;
        } else {
            answerResult = answerResult + " " + result;
        }
    };

    recognition.onerror = function (event) {
        console.error('음성 인식 오류 발생:', event.error);
    };

    recognition.onend = function () {
        console.log('음성 입력 종료');
        if (question.innerText === "오늘의 날씨는 어때?") {
            question.innerText = "오늘의 기분은 어때?";
        } else if (question.innerText === "오늘의 기분은 어때?") {
            question.innerText = "그래? 너의 하루를 들려줘";
        } else {
            question.innerText = "일기를 작성 중입니다..";

            // 로컬 스토리지에서 토큰 값을 가져오기
            const token = localStorage.getItem('token');
            // JSON 객체 생성 및 토큰 값 추가
            const answerResultJson = {
                date: selectedDate, // 선택된 날짜 추가
                prompt: answerResult,
                token: token // 토큰 값을 JSON 객체에 추가
            };
            
            console.log(answerResultJson);
            console.log("서버로 데이터가 전송됩니다...");
            sendToServer(answerResultJson, STT_API_URL);
        }
    };
};
