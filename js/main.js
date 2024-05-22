// 로컬스토리지에서 토큰값 꺼내기
const access_token = localStorage.getItem('access_token');
const USERID_API_URL = "https://www.mongoljune.shop/domain/logincheck";
const userIdTag = document.getElementById('userid');

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
        if (response.status === 401) {
            authButton.textContent = '로그인';
            authButton.onclick = login; 
        }
        else if (response.status === 200) {
            userIdTag.innerText = data.userid;
            authButton.textContent = '로그아웃';
            authButton.onclick = logout; // 토큰값 삭제
            
        }
    }
    else {
        // access_token이 유효하지 않으면 로그인 진행
        authButton.textContent = '로그인';
        authButton.onclick = login; 
    }
    function login() {
        window.location.href = '../login.html'; 
    }
    function logout() {
        // local storage에서 토큰 값 삭제
        localStorage.removeItem('access_token');
        window.location.href = '../main.html'; 
    }
}