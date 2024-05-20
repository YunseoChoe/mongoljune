// 음성 인식 객체 생성
const recognition = new webkitSpeechRecognition();

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
};

// 음성 인식 오류 처리
recognition.onerror = function(event) {
    console.error('음성 인식 오류 발생:', event.error);
};

// 음성 인식 중지 이벤트 핸들러
recognition.onend = function() {
    console.log('음성 입력 종료');
};
