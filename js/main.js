// 로컬스토리지에서 토큰값 꺼내기
const access_token = localStorage.getItem('access_token');

const USERID_API_URL = "https://www.mongoljune.shop/domain/logincheck";
const userIdTag = document.getElementById('userid');

// GET 요청 비동기 함수
async function getUserId(access_token) {
    try {
      const response = await fetch(`${USERID_API_URL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': access_token
        }
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      return data.userid; // 서버 응답 형식에 따라 변경하세요
    } catch (error) {
      console.error('Error fetching userid:', error);
    }
  }
    // getUserId(access_token).then(userid => {
    // console.log('userid: ', userid);

    // // html의 userid 태그에 값 쓰기
    // userIdTag.innerText = userid;
    // });


document.addEventListener('DOMContentLoaded', async() => {
    const authButton = document.getElementById('authButton');
    let response = fetch(`${USERID_API_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': access_token
        }
    });
    if ((await response).status(401)) {
        response
    }


    function updateButton() {
        if (isLoggedIn) {
            authButton.textContent = 'Logout';
            authButton.onclick = logout;
        } else {
            authButton.textContent = 'Login';
            authButton.onclick = login;
        }
    }

    function login() {
        // 여기에 실제 로그인 로직을 추가하세요
        // 예: 서버에 로그인 요청을 보내고, 성공하면 isLoggedIn을 true로 설정합니다.
        isLoggedIn = true;
        updateButton();
    }

    function logout() {
        // 여기에 실제 로그아웃 로직을 추가하세요
        // 예: 서버에 로그아웃 요청을 보내고, 성공하면 isLoggedIn을 false로 설정합니다.
        isLoggedIn = false;
        updateButton();
    }

    // 초기 버튼 상태를 설정합니다.
    updateButton();
});