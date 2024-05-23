// 로컬스토리지에서 토큰값 꺼내기
const access_token = localStorage.getItem('access_token');
const USERID_API_URL = "https://www.mongoljune.shop/domain/logincheck";
const userIdTag = document.getElementById('userid');
const sttStartBtn = document.getElementById('sttStartBtn');
sttStartBtn.style.display = 'none'; 

// 웹 페이지가 로드되면(즉, 모든 HTML 요소와 리소스가 브라우저에 읽혀졌을 때)
window.onload = async() => {
    const authButton = document.getElementById('loginbtn');
    // access_token이 유효하면
    if (localStorage.getItem('access_token')) {
        // 토큰이 유효한지 확인
        const response = await fetch(USERID_API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': access_token
            }
        });
        const data = await response.json();
        console.log(data);
        // 상태코드 체크
        if (response.status === 401) { // 토큰이 유효하지 않으면 로그인 진행
            authButton.textContent = '로그인';
            authButton.onclick = login; 
        }
        else if (response.status === 200) { // 토큰이 유효하면 로그인 상태
            userIdTag.innerText = data.userid + '님, 안녕하세요';
            authButton.textContent = '로그아웃';
            authButton.onclick = logout; // 로그아웃 버튼 누르면 토큰값 삭제
            sttStartBtn.style.display = 'block'; // stt 시작하기 버튼
            sttStartBtn.onclick = goStt;
        }
    }
    // access_token이 유효하지 않으면 로그인 진행
    else {
        authButton.textContent = '로그인';
        authButton.onclick = login; 
    }
    // 로그인 함수
    function login() {
        window.location.href = '../login.html'; 
    }
    // 로그아웃 함수
    function logout() {
        // local storage에서 토큰 값 삭제
        localStorage.removeItem('access_token');
        window.location.href = '../main.html'; 
    }
    // stt 함수
    function goStt() {
        window.location.href = '../stt.html'; 
    }
}