// "음성 출력" 버튼 클릭 이벤트 핸들러
document.getElementById('speakBtn').addEventListener('click', () => {
    const text = document.getElementById('textInput').value.trim(); // 입력된 텍스트 가져오기
    speak(text); // 음성 출력 함수 호출
});

// 음성 출력 함수
function speak(text) {
    const utterance = new SpeechSynthesisUtterance(text);
    speechSynthesis.speak(utterance); // 음성 출력
}

