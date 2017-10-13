var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var agt = navigator.userAgent.toLowerCase();
if(isChrome){
    //Success Code
    location.href = 'entrydsm.hs.kr';
} else {
    //Fail Code
    alert('지원하지 않는 브라우저(IE) 입니다. Chrome 다운로드 페이지로 이동합니다.');
    location.href = 'https://www.google.co.kr/chrome/browser/desktop/index.html';
}