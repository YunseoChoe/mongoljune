document.addEventListener('DOMContentLoaded', async function() {
    const params = new URLSearchParams(window.location.search);
    const diaryId = params.get('id');

    if (!diaryId) {
        alert('일기 ID가 없습니다.');
        return; 
    }

    try {
        const DETAIL_URL = `https://www.mongoljune.shop/openai/diary/${diaryId}`;
        const access_token = localStorage.getItem('access_token');

        const response = await fetch(DETAIL_URL, {
            method: 'GET',
            headers: {
                'Authorization': `${access_token}`,
                'Content-Type': 'application/json'
            }
        });

        const diaryEntry = await response.json();
        console.log(diaryEntry);

        document.getElementById('diary-title').innerText = `제목: ${diaryEntry.title}`;
        document.getElementById('diary-date').innerText = `${diaryEntry.date}`;
        document.getElementById('diary-weather').innerText = `${diaryEntry.weather}`;
        document.getElementById('diary-content').innerText = `${diaryEntry.content}`;

    } catch (error) {
        console.error('오류 발생:', error);
        alert('일기 데이터를 불러오는 중 오류가 발생했습니다.');
    }
});

function goBack() {
    window.history.back();
}
