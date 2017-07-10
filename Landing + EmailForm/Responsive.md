**랜딩 페이지 반응형 고려**

기타로 해결해야 할 것: overflow 부분

-공통-
Explore Button
-> 반응형 고려 x
min-width
-> 463px로 설정

**463px~669px**
    Header Part
    -> 로고 없애기
    -> navigation 가운데 정렬
    -> 오른쪽 WhiteOpacity 박스 display:none으로 변경
    -> Header Title 문구 중앙 위치

    About DSM
    -> 이미지 커버 height 크기 증가시키기
    -> 이미지 커버 부분 display inline-block-> block으로 변경( 아래에 위치하도록 )
    -> 글씨 크기 키우기
    -> 이미지 중앙 위치
    -> 이미지 개수는 1개씩 보여주기

    6 Images
    -> 이미지 중앙 위치
    -> 설명 텍스트 block처리하여 아래에 위치시키기
    -> section 및 각각 class들 height 크기 증가시키기
    -> 이미지 개수 1개씩 보여주기

    Footer
    -> padding-left 0rem으로 변경시키기
    -> MainExplain 크기 0.1~0.2rem 정도 축소시키기
    -> padding-top 값 축소시키기
    -> overflow시 hidden 처리하기

**670px~1049px**
    Navigation
    -> 로고 나타내고 padding-left값 감소기키기
    -> navigation padding-right값 감소시키기

    MainTitle
    -> Navigation아래 위치하도록
    -> 박스를 보여주는 대신 Header Title 아래 직사각형 형태로 위치하기 display:block 처리

    About DSM
    -> 이미지 1개에서 2개로 배치
    -> 글씨 크기 원래대로 변경
    -> 보여주는 형식 전과 동일

    6 Images
    -> 전과 동일

    Footer
    -> 전과 동일

**875px~1049px**
    Header Part
    -> 기본 레이아웃으로 변환
    -> 2018 DSM padding-top값 감소

    나머지는 모두 670px~1049px처럼 유지

**1050px~1294px**
    Header Part
    -> 전과 동일

    About DSM
    -> 전과 동일

    6 Images
    -> 기본 배치로 변환
    -> padding값으로 글씨 및 이미지 위치 조정

    Footer
    -> 위치는 전과 동일
    -> 폰트 크기는 기본으로 변환

**1295px~**
    모두 기본 배치 변환 완료


구상안 예시

1. body에 min-width 463px 부여
2. @media all and (min-width: 463px){}
3. @media all and (min-width: 670px){}
4. @media all and (min-width: 875px){}
5. @media all and (min-width: 1050px){}
6. @media all and (min-width: 1295px){}
