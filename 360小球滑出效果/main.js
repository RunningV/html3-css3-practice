$(function() {
	$('.five>i').addClass('five_i');
	$('.five>s').addClass('five_s');

	setTimeout(function() {
		$('.rugby li:eq(0)').animate({opacity:1},50);
	}, 1000);
	setTimeout(function() {
		$('.rugby li:eq(1)').animate({opacity:1},50);
	}, 1280);
	setTimeout(function() {
		$('.rugby li:eq(2)').animate({opacity:1},50);
	}, 1500);
	setTimeout(function() {
		$('.rugby li:eq(3)').animate({opacity:1},50);
	}, 1850);
})