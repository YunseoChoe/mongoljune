document.addEventListener('DOMContentLoaded', function() {
    const signupForm = document.getElementById('signup-form');
    const SIGNUP_API_URL = "https://www.mongoljune.shop/member"; // 서버 url

    signupForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // 사용자가 입력한 정보를 가져옴
        const name = document.getElementById('name').value;
        const userid = document.getElementById('userid').value;
        const password = document.getElementById('password').value;
        const yearSelect = document.getElementById('year').value;
        const monthSelect = document.getElementById('month').value;
        const daySelect = document.getElementById('day').value;
        const birth = `${yearSelect}-${monthSelect}-${daySelect}`;

        // JSON 데이터 생성
        const jsonData = {
            name: name,
            userid: userid,
            password: password,
            birth: birth
        };

        // fetch 요청 보내기
        fetch(SIGNUP_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(jsonData) // jsonData 객체를 json으로 변환
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('서버 응답에 실패했습니다.');
            }
            return response.json(); // 서버가 보낸 데이터를 JavaScript 객체로 변환하여 반환
        })
        .then(data => {
            // 서버로부터 받은 데이터를 처리
            console.log(data.message); // 서버로부터 받은 응답메세지를 콘솔에 출력
            alert(data.message);
            
            // 회원가입 성공 후 메인 페이지로 리다이렉트
            window.location.href = "./main.html";
        })
        .catch(error => {
            console.error('에러 발생:', error);
            alert('회원가입에 실패했습니다.');
        });
    });
});
