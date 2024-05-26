// 음성 인식 객체 생성
const recognition = new webkitSpeechRecognition();
const STT_API_URL = "https://www.mongoljune.shop/openai/generate";
let answerResult = "";

window.onload = async () => {
    const question = document.getElementById('question');
    question.innerText = "오늘의 날씨는 어때?";

    // 음성 인식 설정
    recognition.lang = 'ko-KR'; // 인식할 언어 설정 (한국어)
    recognition.continuous = true; // 연속적으로 인식할지 여부

   // 음성 인식 시작 이벤트 핸들러
    document.getElementById('startBtn').addEventListener('click', () => {
        recognition.start(); // 음성 인식 시작
        console.log('음성 입력 시작');
    });

    // 음성 인식 종료 이벤트 핸들러
    document.getElementById('stopBtn').addEventListener('click', () => {
        recognition.stop(); // 음성 인식 종료
        console.log('음성 입력 종료');
    });

    // 음성 인식 결과 이벤트 핸들러
    recognition.onresult = function (event) {
        const result = event.results[event.results.length - 1][0].transcript; // 마지막 결과 가져오기
        console.log(result);
        // 사용자가 말한 내용을 저장
        if (answerResult == "") {
            answerResult = answerResult + result;
        }
        else {
            answerResult = answerResult + " " + result;
        }
    };
    console.log(answerResult);

    // 음성 인식 오류 처리
    recognition.onerror = function (event) {
        console.error('음성 인식 오류 발생:', event.error);
    };
    // 음성 인식 중지 이벤트 핸들러
    recognition.onend = function () {
        console.log('음성 입력 종료');
        // 각 음성 입력이 종료될 때마다 다른 질문을 표시
        if (question.innerText === "오늘의 날씨는 어때?") {
            question.innerText = "오늘의 기분은 어때?";
        } 
        else if (question.innerText === "오늘의 기분은 어때?") {
            question.innerText = "그래? 너의 하루를 들려줘";
        } 
        else {
            question.innerText = "일기를 작성 중입니다..";
            // 모든 음성 입력이 완료되면 서버로 데이터 전송
            const answerResultJson = { "prompt" : answerResult };
            console.log(answerResultJson);
            console.log("서버로 데이터가 전송됩니다...");
            sendToServer(answerResultJson);
        }
    };
}
// 서버로 데이터를 전송하는 함수
function sendToServer(data) {
    fetch(STT_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => {
        // 응답 실패시
        if (!response.ok) {
            throw new Error('서버 응답에 실패했습니다.');
        }
        // 응답 성공시
        console.log("응답 성공");
        return response.json(); // JSON 데이터를 추출하여 js 객체로 파싱
    })
    .then(data => {
        // 서버에서 반환된 메세지 출력
        console.log(data);
    })
    .catch(error => {
        // 에러 처리
        console.error('오류 발생:', error.message);
    });
}