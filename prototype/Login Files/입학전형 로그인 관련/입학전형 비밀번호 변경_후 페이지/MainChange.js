    var FirstPw = document.getElementById('PwCheck1');
    var SecondPw = document.getElementById('PwCheck2');
    var ClickBtn = document.getElementById('SaveButton');
    //var bdy = document.querySelector('body');

    // 색 구분 코드
    SecondPw.addEventListener('keyup', () => {

        if (FirstPw.value !== "" && SecondPw.value !== "") {

            if (FirstPw.value === SecondPw.value) {
                SecondPw.style.border = "2px solid rgb(56, 205, 177)";
            }

            else {
                SecondPw.style.border = "2px solid red";
            }
        }

    });

    // 클릭 시 조건문 코드
    ClickBtn.addEventListener('click', () => {

        if (FirstPw.value === "" || SecondPw.value === "") {
            alert("비밀번호를 입력해주세요!");
        }

        else if (FirstPw.value === SecondPw.value) {
            alert("저장되었습니다!");
            //bdy.style.backgroundColor = "rgb(56, 205, 177)";
            let ChangedValue = FirstPw.value;
            console.log("저장된 비밀번호: " + ChangedValue);
        }

        else {
            alert("비밀번호를 확인해주세요!");
            SecondPw.value = SecondPw.defaultValue;
        }

    });