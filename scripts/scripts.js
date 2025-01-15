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

    $(window).scroll(function() {
        if ($(this).scrollTop() > 100) {
            $('#navbar').addClass('scroll-navbar');
        } else {
            $('#navbar').removeClass('scroll-navbar');
        }
    });
});