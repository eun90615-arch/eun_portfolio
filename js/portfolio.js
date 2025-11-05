gsap.registerPlugin(ScrollTrigger);



/* ========================================================== */

/* from() -> 처음에 opacity:0, y:50 에서 시작 -> 현재 원래 위치와 불투명도 자연스럽게 나타남 */
gsap.from('.title figure', {
    opacity: 0,
    y: 50,
    duration: 0.8,
    stagger: 0.1,
    ease: "back.out(1.7)",
    onComplete: floatImages // 등장 후 float 애니메이션 실행
});


gsap.from('.titleBox p', {
    opacity: 0,
    y: 50,
    duration: 1.5,
    stagger: 0.5,
    ease: "back.out(1.7)",
    onComplete: floatImages // 등장 후 float 애니메이션 실행
})
function floatImages() {
    gsap.to('.title img', {
        y: "+=12",          // 10px 아래로
        repeat: -1,         // 무한 반복
        yoyo: true,         // 되돌아오기
        ease: "sine.inOut", // 부드러운 움직임
        duration: 2,        // 왕복 4초 (2초 + 2초)
        stagger: 0.1        // 약간의 시간차
    });
};


//탭
$(function () {
    $('.tab li').on('click', function () {
        let i = $(this).index();

        // 탭 버튼 on 클래스
        $('.tab li').removeClass('on');
        $(this).addClass('on');

        // 리스트 전환 (fade 애니메이션)
        $('.tablist').removeClass('on');  // 모든 리스트 숨기기
        $('.tablist').eq(i).addClass('on'); // 해당 리스트만 보이기
    });

    $('.design .tab li').on('click', function (e) {
        e.preventDefault();

        let tabIndex = $(this).index();

        $('.design .tab li').removeClass('on');
        $(this).addClass('on');

        $('.design .list').removeClass('on');
        $('.design .list').eq(tabIndex).addClass('on');
    });
});

/* ========================================= */


//1025이상에서는 pin 활성화 -> 반응형 조건을 걸어서 화면크기에 따라 다른 애니메이션을 실행할 수 있게 함.
const mm = gsap.matchMedia();

// 매체 전환 시 안전 복원을 위해 초기 스타일 백업
ScrollTrigger.saveStyles(".reveal, #pinPanel");

mm.add("(min-width: 1025px)", (ctx) => {
    const { isWide } = ctx.conditions; //ctx.conditions->조건이 true/false에 따라서 분기 처리


    //오른쪽 스크롤 영역 기준을 좌측 패널을 고정
    //패널 자체의 높이는 CSS에서 100vh로 고정
    const pinST = ScrollTrigger.create({
        trigger: "#scrollArea",
        start: "top top",
        end: "bottom bottom",
        pin: "#pinPanel",
        pinSpacing: true,
        //오른쪽 컨텐츠 길이에 맞춰 자연스럽게  pinSpacing
        //pinSpacing-> pin:true 이면 ScrollTrigger가 요소를 고정시키고 원래 있던 자리만큼 빈 공간을 확보
        anticipatePin: 1 //자연스러운 애니메이션
    })

    //오른쪽 섹션 등장
    const reveals = gsap.utils.toArray(".reveal").map((el) => {
        return gsap.fromTo(
            el,
            { opacity: 0, y: 24 },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: el,
                    start: "top 80%",
                    toggleActions: "play none none reverse"
                }
            })
    });

    //react useEffect의 cleanup 코드
    //화면크기가 바뀌거나 컴포넌트가 사라질 때 실행
    //pinST && pinST.kill(); -> pinST가 있으면 pinST 인스턴스 소멸
    //reveas 배열 안 요소들을 하나씩 돌면서 각각의 요소들이 가지고 있는 scrollTrigger 제거
    return () => {
        pinST && pinST.kill();
        reveals.forEach(tl => tl.scrollTrigger && tl.scrollTrigger.kill())
        gsap.set(".reveal", { clearProps: "all" })
    }
});




/* 공통 디폴트========== */
gsap.defaults({
    ease: "power2.out",
    duration: 2
});



//about Text영역 
gsap.fromTo(
    ".aboutText > li, .about figure",
    { y: 22, opacity: 0 }, // 처음 상태
    {
        y: 0,
        opacity: 1,
        stagger: 0.3,
        scrollTrigger: {
            trigger: ".about",
            start: "top 85%",
            toggleActions: "play reverse play reverse", // 다시 올라가면 reverse 실행
            markers: false,
        },
    }
);

// contact 텍스트들도 순차 등장
gsap.fromTo(
    ".contact .innerBox > *",
    { y: 22, opacity: 0 },
    {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        scrollTrigger: {
            trigger: ".contact .innerBox",
            start: "top 85%",
            toggleActions: "play reverse play reverse",
            markers: false,
        }
    }
);
//swiper 영역 천천히 나타나는 
gsap.set(".designBox", { opacity: 0, y: 50 });

ScrollTrigger.create({
    trigger: ".designBox",
    start: "top 85%",
    onEnter: () => {
        gsap.to(".designBox", {
            opacity: 1,
            y: 0,
            duration: 1.2,
            ease: "power2.out"
        });
    },
    onLeaveBack: () => {
        gsap.to(".designBox", {
            opacity: 0,
            y: 50,
            duration: 0.8,
            ease: "power2.in"
        });
    },
    toggleActions: "play none none reverse"
});

/* header ==== */

$(function () {
    $(window).on('scroll', function () {
        let scrollTop = $(this).scrollTop();
        console.log(scrollTop)

        if ($(this).scrollTop() > 100) {
            $('.PCgnb').addClass('fixed');
        } else {
            $('.PCgnb').removeClass('fixed')
        }
    })
});

/* header mobile */

// 메뉴 열기
$('.menubtn').on('click', function(){
  $('.submenu').addClass('on');
  $('.overlay').addClass('on');
});

// 메뉴 닫기 (닫기버튼 or 오버레이 클릭 시)
$('.closebtn, .overlay').on('click', function(){
  $('.submenu').removeClass('on');
  $('.overlay').removeClass('on');
});

// ✅ 메뉴 내 링크 클릭 시 → 해당 섹션 이동 + 메뉴 닫힘
$('.submenu ul li a').on('click', function(e){
  e.preventDefault(); // 기본 앵커 이동 막기

  let target = $(this).attr('href'); // 클릭된 링크의 href 추출

  // 메뉴 닫기
  $('.submenu').removeClass('on');
  $('.overlay').removeClass('on');

  // 부드럽게 스크롤 이동 (header 높이 보정)
  let headerHeight = $('header').outerHeight();
  $('html, body').animate({
    scrollTop: $(target).offset().top - headerHeight
  }, 600); // 600ms 동안 이동
});