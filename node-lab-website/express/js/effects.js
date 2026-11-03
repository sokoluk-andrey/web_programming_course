// ===== Laboratory Work N1 - JS effects and animation (Task 6) =====
$(function () {

    // Effect 1: navbar colour + "back to top" button depend on scroll position (event condition)
    $(window).on('scroll', function () {
        var top = $(this).scrollTop();
        if (top > 300) {
            $('#toTop').fadeIn(300);
            $('.w3-top .w3-bar').addClass('scrolled');
        } else {
            $('#toTop').fadeOut(300);
            $('.w3-top .w3-bar').removeClass('scrolled');
        }
    });
    $('#toTop').on('click', function () {
        $('html, body').animate({ scrollTop: 0 }, 800);
    });

    // Effect 2: smooth scroll for navbar anchor links
    $('a[href^="#"]').on('click', function (e) {
        var target = $(this).attr('href');
        if (target.length > 1 && $(target).length) {
            e.preventDefault();
            $('html, body').animate({ scrollTop: $(target).offset().top - 46 }, 700);
        }
    });

    // Effect 3: click a band member photo to slide their bio in/out
    $('#band img').on('click', function () {
        $(this).siblings('.member-bio').slideToggle(400);
    });

    // Effect 4: ticket form validation with condition - shake on error, show total on success
    var PRICE = 15;
    $('#payBtn').on('click', function () {
        var qty = parseInt($('#ticketQty').val(), 10);
        var email = $('#ticketEmail').val();
        var $msg = $('#ticketMsg');
        $msg.removeClass('w3-text-red w3-text-green shake');
        if (isNaN(qty) || qty < 1 || email.indexOf('@') === -1) {
            $msg.text('Please enter a valid number of tickets and an email address.')
                .addClass('w3-text-red');
            void $msg[0].offsetWidth; // restart the shake animation
            $msg.addClass('shake').fadeIn(200);
        } else {
            $msg.text('Total: $' + (qty * PRICE) + ' - tickets will be sent to ' + email)
                .addClass('w3-text-green').hide().fadeIn(600);
        }
    });

    // Animation: sections fade in (CSS keyframes) when they scroll into view
    $('#band, #tour .w3-content, #contact').addClass('reveal');
    var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
            if (entry.isIntersecting) {
                $(entry.target).addClass('in-view');
                $(entry.target).find('h2.w3-wide').addClass('in-view');
            }
        });
    }, { threshold: 0.15 });
    $('.reveal').each(function () { observer.observe(this); });

    // Animation: count up the number of remaining November tickets
    $('.w3-badge').addClass('pulse').each(function () {
        var $b = $(this), end = parseInt($b.text(), 10);
        $({ n: 0 }).animate({ n: end }, {
            duration: 1500,
            step: function (now) { $b.text(Math.ceil(now)); }
        });
    });
});
