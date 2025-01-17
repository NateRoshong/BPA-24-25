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
        const capAndBeanieSizes = ['Infant', 'Toddler', 'Child', 'Youth', 'Adult'];
        const isCapOrBeanie = $(rangeInput).attr('id').includes('size-range-7') || $(rangeInput).attr('id').includes('size-range-8');
        const sizeArray = isCapOrBeanie ? capAndBeanieSizes : sizes;
        $('#' + labelId).text('Size: ' + sizeArray[$(rangeInput).val()]);
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

    // Shopping cart off-canvas functionality
    $('#shopping').on('click', function() {
        $('#offcanvasCart').toggleClass('show');
        $('body').toggleClass('offcanvas-open');
    });

    // Close off-canvas when clicking outside of it
    $(document).on('click', function(event) {
        if (!$(event.target).closest('#offcanvasCart, #shopping').length) {
            $('#offcanvasCart').removeClass('show');
            $('body').removeClass('offcanvas-open');
        }
    });

    // Add to cart functionality
    $('.add-cart').on('click', function() {
        const $card = $(this).closest('.card');
        const itemName = $card.find('.card-title').text();
        const itemPrice = parseFloat($card.find('.card-text').text().replace('$', ''));
        const itemSize = $card.find('.size-selector label').text();

        let $existingCartItem = null;
        $('#offcanvasCart .cart-item').each(function() {
            const $cartItem = $(this);
            const cartItemName = $cartItem.find('.item-name').text();
            const cartItemSize = $cartItem.find('.item-size').text();
            if (cartItemName === itemName && cartItemSize === itemSize) {
                $existingCartItem = $cartItem;
                return false; // break the loop
            }
        });

        if ($existingCartItem) {
            const $quantityElement = $existingCartItem.find('.item-quantity');
            const currentQuantity = parseInt($quantityElement.text().replace('Quantity: ', ''));
            $quantityElement.text('Quantity: ' + (currentQuantity + 1));
        } else {
            const cartItem = `
                <div class="cart-item d-flex justify-content-between align-items-center p-2 mb-2 border rounded">
                    <div>
                        <p class="item-name mb-1 font-weight-bold">${itemName}</p>
                        <p class="item-size mb-1 text-muted">${itemSize}</p>
                        <p class="item-price mb-1">$${itemPrice.toFixed(2)}</p>
                        <p class="item-quantity mb-0">Quantity: 1</p>
                    </div>
                    <button class="btn btn-sm btn-danger remove-cart-item">Remove</button>
                </div>
            `;
            $('#offcanvasCart .offcanvas-body').append(cartItem);
        }

        $('#offcanvasCart .empty-cart-text').hide();
        updateCartTotal();
    });

    // Remove from cart functionality
    $(document).on('click', '.remove-cart-item', function(event) {
        event.stopPropagation();
        const $cartItem = $(this).closest('.cart-item');
        const $quantityElement = $cartItem.find('.item-quantity');
        const currentQuantity = parseInt($quantityElement.text().replace('Quantity: ', ''));
        if (currentQuantity > 1) {
            $quantityElement.text('Quantity: ' + (currentQuantity - 1));
        } else {
            $cartItem.remove();
        }
        updateCartTotal();
        if ($('#offcanvasCart .cart-item').length === 0) {
            $('#offcanvasCart .empty-cart-text').show();
        }
    });

    // Update cart total
    function updateCartTotal() {
        let total = 0;
        $('#offcanvasCart .cart-item').each(function() {
            const itemPrice = parseFloat($(this).find('.item-price').text().replace('$', ''));
            const itemQuantity = parseInt($(this).find('.item-quantity').text().replace('Quantity: ', ''));
            total += itemPrice * itemQuantity;
        });
        $('#cart-total').text('Total: $' + total.toFixed(2));
    }

    // Checkout functionality
    $('#checkout-button').on('click', function() {
        $('#offcanvasCart .cart-item').remove();
        updateCartTotal();
        $('#offcanvasCart').removeClass('show');
        $('body').removeClass('offcanvas-open');
        $('#offcanvasCart .empty-cart-text').show();
    });

});