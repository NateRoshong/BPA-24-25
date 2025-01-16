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
            $('#main-logo').css('width', '10vw');
            $('#store-main-logo').css('width', '6vw');
        } else if ($(this).scrollTop() > 25) {
            $('#main-logo').css('width', '20vw');
            $('#store-main-logo').css('width', '8vw');
        } else {
            $('#navbar').removeClass('scroll-navbar');
            $('#main-logo').css('width', '30vw');
            $('#store-main-logo').css('width', '10vw');
        }
    });

    // Update size label based on range input
    function updateSizeLabel(rangeInput, labelId) {
        const sizes = ['S', 'M', 'L', 'XL'];
        $('#' + labelId).text('Size: ' + sizes[$(rangeInput).val()]);
    }
    // Attach event listeners to all range inputs
    $('input[type="range"]').each(function(index) {
        $(this).on('input', function() {
            updateSizeLabel(this, 'size-label-' + (index + 1));
        });
    });
});