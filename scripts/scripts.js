//JQUERY SCRIPT START
$(document).ready(function() {
    function adjustOnResize() {
        if ($(window).width() <= 582) {
            $('#nav-brands-holder').addClass('dropdown-menu');
        } else {
            $('#nav-brands-holder').removeClass('dropdown-menu');
        }

        if ($(window).width() <= 750) {
            $('footer').addClass('footer-mobile');
            $('#footer-emails').removeClass('text-end')
        }else {
            $('footer').removeClass('footer-mobile');
            $('#footer-emails').addClass('text-end')
        }
    }
    adjustOnResize();
    //Adjusts nav-brands-holder on window resize
    $(window).resize(function() {
        adjustOnResize();
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

    // Disables submits if inputs are empty
        //for newsletter
    $('#newsletterModal').on('shown.bs.modal', function() {
        const $submitButton = $('#news-submit');
        const $inputField = $('#news-letter-form');

        function toggleSubmitButton() {
            const email = $inputField.val().trim();
            if (email === '' || !email.includes('@') || !email.endsWith('.com')) {
                $submitButton.prop('disabled', true);
            } else {
                $submitButton.prop('disabled', false);
            }
        }

        toggleSubmitButton();
        $inputField.on('input', toggleSubmitButton);

        $('#news-letter-form').on('submit', function(event) {
            if (!this.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            $(this).addClass('was-validated');
        });
    });

        //for booking
    $('#bookingModal').on('shown.bs.modal', function() {
        const $submitButton = $('#booking-submit');
        const $emailField = $('#booking-form');
        const $nameField = $('#booking-name');

        function toggleSubmitButton() {
            const email = $emailField.val().trim();
            const name = $nameField.val().trim();
            if (email === '' || !email.includes('@') || !email.endsWith('.com') || name === '') {
                $submitButton.prop('disabled', true);
            } else {
                $submitButton.prop('disabled', false);
            }
        }

        toggleSubmitButton();
        $emailField.on('input', toggleSubmitButton);
        $nameField.on('input', toggleSubmitButton);

        $('#booking-form').on('submit', function(event) {
            if (!this.checkValidity()) {
                event.preventDefault();
                event.stopPropagation();
            }
            $(this).addClass('was-validated');
        });
    });

    

});