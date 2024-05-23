// 음성 인식 객체 생성
const recognition = new webkitSpeechRecognition();
const STT_API_URL = "";

// 음성 인식 설정
recognition.lang = 'ko-KR'; // 인식할 언어 설정 (한국어)
recognition.continuous = true; // 연속적으로 인식할지 여부

// 음성 인식 시작 이벤트 핸들러
document.getElementById('startBtn').addEventListener('click', () => {
    recognition.start(); // 음성 인식 시작
    console.log('음성 입력 시작');
});

// 음성 인식 결과 이벤트 핸들러
recognition.onresult = function(event) {
    const result = event.results[event.results.length - 1][0].transcript; // 마지막 결과 가져오기
    const jsonResult = { "result": result }; // JSON 객체 생성
    document.getElementById('output').innerText = '인식 결과: ' + JSON.stringify(jsonResult); // JSON 형식으로 출력
    console.log('인식 결과:', jsonResult);

    // 서버로 전송
    fetch(STT_API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(jsonResult)
    })
    .then(response => {
        // 응답 실패시
        if (!response.ok) {
            throw new Error('서버 응답에 실패했습니다.');
        }
        // 응답 성공시
        return response.json() // JSON 데이터를 추출하여 js 객체로 파싱
    })
    .then(data => {
        // 서버에서 반환된 메세지 출력
        alert(data.message);
    })
    .catch(error => {
        // 에러 처리
        console.error('오류 발생:', error.message);
    });
};

// 음성 인식 오류 처리
recognition.onerror = function(event) {
    console.error('음성 인식 오류 발생:', event.error);
};

// 음성 인식 중지 이벤트 핸들러
recognition.onend = function() {
    console.log('음성 입력 종료');
};