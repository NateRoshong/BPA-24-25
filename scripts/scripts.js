//JQUERY SCRIPT START
$(document).ready(function() {
    function adjustNavBrandsHolder() {
        if ($(window).width() <= 582) {
            $('#nav-brands-holder').addClass('dropdown-menu');
        } else {
            $('#nav-brands-holder').removeClass('dropdown-menu');
        }
    }
    adjustNavBrandsHolder();
    //Adjusts nav-brands-holder on window resize
    $(window).resize(function() {
        adjustNavBrandsHolder();
    });

    //When the user scrolls down 50px from the top of the document add class scroll-navbar to navbar
    $(window).scroll(function() {
        if ($(this).scrollTop() > 50) {
            $('#navbar').addClass('scroll-navbar');
            $('#main-logo').addClass('scroll-main-logo');
        } else {
            $('#navbar').removeClass('scroll-navbar');
            $('#main-logo').removeClass('scroll-main-logo');
        }
    });
});