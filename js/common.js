/* header fixed==== */

$(function () {
    $(window).on('scroll', function () {
        let scrollTop = $(this).scrollTop();
        

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

$('.submenu ul li a').on('click', function(e){

    let href = $(this).attr('href');

    // ⚠️ index.html로 이동해야 하는 링크는 막으면 안 됨
    if (href.includes("index.html")) {
        return;  // 기본 이동 허용
    }

    // 동일 페이지 내 이동이면 preventDefault 적용
    e.preventDefault();

    // 메뉴 닫기
    $('.submenu').removeClass('on');
    $('.overlay').removeClass('on');

    // 부드러운 스크롤
    let headerHeight = $('header').outerHeight();
    $('html, body').animate({
        scrollTop: $(href).offset().top - headerHeight
    }, 600);
});