// 서버로부터 데이터를 가져오는 함수
async function fetchDiaryEntries(apiUrl) {
    try {
        const response = await fetch(apiUrl, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error('서버 응답에 실패했습니다.');
        }

        const diaryEntries = await response.json();
        displayDiaryEntries(diaryEntries);
    } catch (error) {
        console.error('오류 발생:', error.message);
    }
}

// 일기 데이터를 화면에 표시하는 함수
function displayDiaryEntries(entries) {
    const entriesContainer = document.getElementById('entries');
    entriesContainer.innerHTML = ''; // 기존 내용을 지움

    entries.forEach(entry => {
        const entryDiv = document.createElement('div');
        entryDiv.className = 'diary-entry';

        const entryTitle = document.createElement('h3');
        entryTitle.textContent = entry.title;
        entryDiv.appendChild(entryTitle);

        const entryDate = document.createElement('p');
        entryDate.textContent = `날짜: ${entry.date}`;
        entryDiv.appendChild(entryDate);

        const entryWeather = document.createElement('p');
        entryWeather.textContent = `날씨: ${entry.weather}`;
        entryDiv.appendChild(entryWeather);

        const entryContent = document.createElement('p');
        entryContent.textContent = entry.content;
        entryDiv.appendChild(entryContent);

        entriesContainer.appendChild(entryDiv);
    });
}

// 페이지 로드 시 서버로부터 일기 데이터를 가져옴
window.onload = () => {
    const DIARY_API_URL = ''; // 실제 API URL로 변경
    fetchDiaryEntries(DIARY_API_URL);
};
