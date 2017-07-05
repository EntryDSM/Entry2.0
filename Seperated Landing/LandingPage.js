function fnMove() {
    var offset = $("#Part").offset();
    $('html,body').animate({
        scrollTop: offset.top
    }, 420);
}