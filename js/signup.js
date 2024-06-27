document.addEventListener('DOMContentLoaded', function() {
    // 탭 전환 기능
    $('.tab-item').click(function() {
        var target = $(this).data('target');
        
        $('.tab-item').removeClass('active');
        $(this).addClass('active');
        
        $('.tab-content').removeClass('active');
        $(target).addClass('active');
    });

    const childSignupForm = document.getElementById('signup-form-child');
    const parentSignupForm = document.getElementById('signup-form-parent');
    const SIGNUP_API_URL = "https://www.mongoljune.shop/member"; // 서버 url

    function handleSignupFormSubmit(form) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();

            // 폼이 아동용인지 부모용인지 확인
            if (form.id == 'signup-form-child') {
                isChildForm = true
            }
            else {
                isChildForm = false
            }

            console.log(isChildForm);

            // 사용자가 입력한 정보를 가져옴
            const name = form.querySelector('[name="name"]').value;
            const userid = form.querySelector('[name="userid"]').value;
            const password = form.querySelector('[name="password"]').value;
            let child_id;
            let is_parent;
            let yearSelect;
            let monthSelect;
            let daySelect;

            
            // 아이 회원가입
            if (isChildForm) {
                yearSelect = document.getElementById('child-year').value;
                monthSelect = document.getElementById('child-month').value;
                daySelect = document.getElementById('child-day').value;
                child_id = null;
                is_parent = false;
            }
            // 부모 회원가입
            else {
                yearSelect = document.getElementById('parent-year').value;
                monthSelect = document.getElementById('parent-month').value;
                daySelect = document.getElementById('parent-day').value;
                child_id = document.getElementById('child-id').value;
                is_parent = true;
            }

            const birth = `${yearSelect}-${monthSelect}-${daySelect}`;
            console.log(birth);

            // JSON 데이터 생성
            const jsonData = {
                name: name,
                userid: userid,
                password: password,
                birth: birth,
                child_id: child_id,
                is_parent: is_parent
            };

            console.log(jsonData);

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
    }

    // 각각의 폼에 대해 제출 이벤트 핸들러 등록
    handleSignupFormSubmit(childSignupForm);
    handleSignupFormSubmit(parentSignupForm);
});