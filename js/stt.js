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
    
    const question = document.getElementById('question');
    question.innerText = "오늘의 날씨는 어때?";

    recognition.lang = 'ko-KR';
    recognition.continuous = true;

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
            const answerResultJson = { "prompt": answerResult };
            console.log(answerResultJson);
            console.log("서버로 데이터가 전송됩니다...");
            sendToServer(answerResultJson, STT_API_URL);
        }
    };
};
