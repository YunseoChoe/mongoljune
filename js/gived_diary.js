function getDiaryEntries() {     
    console.log("확인");

    // 로컬 스토리지에서 'diaryEntries' 키로 저장된 데이터를 가져옴
    const storedData = localStorage.getItem('diaryEntry');
    // JSON 문자열을 JavaScript 객체로 변환
    return JSON.parse(storedData) || [];
}

function displayDiaryEntries() {
    const diaryEntries = getDiaryEntries(); // 함수의 반환값 저장 (javascript 객체)

    console.log(diaryEntries);
    console.log(diaryEntries.title); // 확인용 출력
    
    const diary_title = document.getElementById('diary_title');
    const diary_date = document.getElementById('diary_date');
    const diary_weather = document.getElementById('diary_weather');
    const diary_content = document.getElementById('diary_content');
    const diary_auth = document.getElementById('diary_auth');

    diary_title.innerText = `제목: ${diaryEntries.title}`;
    diary_date.innerText = `날짜: ${diaryEntries.date}`;
    diary_weather.innerText = `날씨: ${diaryEntries.weather}`;
    diary_content.innerText = `내용: ${diaryEntries.content}`;
    diary_auth.innerText = `글쓴이: ${diaryEntries.auth}`;
}

window.onload = () => {
    displayDiaryEntries(); // 페이지 로드 시 저장된 일기 표시
};
