function menuOffset() {
    $(window).scroll(function () {
        if ($(this).scrollTop() > 10) {
            $('.header').addClass('offset');
        } else {
            $('.header').removeClass('offset');
        }
    });
};

function slideDownArrow() {
    $('.about-us__arrow').click(function () {
    $('html,body').animate({
            scrollTop: $(".potential").offset().top - 40
        },
        'slow');
    });
};

function anchorNav() {
    $(".menu").on("click",".menu-link", function (event) {
        event.preventDefault();
        var id  = $(this).attr('href'),
            top = $(id).offset().top - 86;
        if ($('body,html').is(':animated')) {
            return;
        } else {
            $('body,html').animate({scrollTop: top}, 1500);
        }
        $('.hamburger, .header__burger-menu').removeClass('is-active')
    });
};

function revealText() {
    $('.reveal').click(function (event) {
        event.preventDefault();
        $('.second-content').slideDown('slow');
        $(this).css('display', 'none');
        $('.first-content').addClass('revealed');
    })
};

function loginClick() {
    var target = '.form-error-msg-wr-lg';
    $(target).css('visibility', 'hidden');
    $(target).removeClass('animated');
    $(target).removeClass('fadeInUp');
    setTimeout(function () {
        $(target).css('visibility', 'visible');
        $(target).addClass('animated fadeInUp');
        $('.login-btns #form-btn').css('border-color', '#3FD3AD')
    }, 1000);
};

function contactClick() {
    var errors = false;
    let input = {
        name: document.getElementById('form-name'),
        company: document.getElementById('form-comp'),
        email: document.getElementById('form-email'),
        phone: document.getElementById('form-phone'),
        country: document.getElementById('form-country'),
    };
    let regexp = {
        email: /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/,
        phone: /^\d+$/
    };
    if (input.name.value === '') {
        $('#form-name-label').text('Пожалуйста, введите полное имя');
        $('#form-name').css('border-bottom-color', '#red');
        errors = true;
    } else {
        $('#form-name-label').text('Подходит!');
        $('#form-name').css('border-bottom-color', '#3FD3AD');
    }
    if (input.company.value === '') {
        $('#form-comp-label').text('Пожалуйста, введите компанию');
        $('#form-comp').css('border-bottom-color', '#red');
        errors = true;
    } else {
        $('#form-comp-label').text('Подходит!');
        $('#form-comp').css('border-bottom-color', '#3FD3AD');
    }

    if (input.email.value === '') {
        $('#form-email-label').text('Пожалуйста, введите email');
        $('#form-email').css('border-bottom-color', '#red');
        errors = true;
    } else if (!regexp.email.test(input.email.value)) {
        $('#form-email-label').text('Пожалкйста, введите корректный email');
        $('#form-email').css('border-bottom-color', '#red');
        errors = true;
    } else {
        $('#form-email-label').text('Подходит!');
        $('#form-email').css('border-bottom-color', '#3FD3AD');
    }

    if (input.phone.value === '') {
        $('#form-phone-label').text('Пожалуйста, введите телефон');
        $('#form-phone').css('border-bottom-color', '#red');
        errors = true;
    } else if (!regexp.phone.test(input.phone.value)) {
        $('#form-phone-label').text('Пожалуйста, введите корректный телефон (только цифры)');
        $('#form-phone').css('border-bottom-color', '#red');
        errors = true;
    } else {
        $('#form-phone-label').text('Подходит!');
        $('#form-phone').css('border-bottom-color', '#3FD3AD');
    }
    if (input.country.value === '') {
        $('#form-country-label').text('Пожалуйста, введите страну');
        $('#form-country').css('border-bottom-color', '#red');
        errors = true;
    } else {
        $('#form-country-label').text('Подходит!');
        $('#form-country').css('border-bottom-color', '#3FD3AD');
    }
    if (errors) {
        $('#form-btn-contact').css('border-color', '#red');
    }
    if (!errors) {
        $('#contactModal .wrapper').addClass('animated fadeOut');
        $('#contactModal .modal-login-heading').addClass('animated fadeOut');

        var target = '.form-contact-msg';
        $(target).css('visibility', 'hidden');
        $('#form-btn-contact').css('display', 'none');
        $(target).removeClass('animated');
        $(target).removeClass('fadeInUp');
        setTimeout(function() {
            $('#contactModal .wrapper').css('display', 'none');
            $('#contactModal .modal-login-heading').css('display', 'none');
            $(target).css('visibility', 'visible');
            $(target).addClass('animated fadeInUp');

            $.ajax({
                type: "POST",
                url: "php/handlers/ContactFormHandler.php",
                data: $('#contact_form').serialize(),
            });
        }, 1500);
    }
};


function subscribeForm() {

    let submitButton = document.querySelectorAll('.footer-subscribe-form-btn')[0];
    let subscribeForm = document.querySelectorAll('form.footer-subscribe-form')[0];
    let subscribeInput = subscribeForm.childNodes[1];
    let regexp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    let errors = false;
    let thankNode = document.createElement("p");
    thankNode.classList.add('footer-subscribe-thankyou');
    submitButton.addEventListener('click', function (e) {
        e.preventDefault();
        if (subscribeInput.value === '') {
            thankNode.innerHTML = 'Пожалуйста, введите ваш email';
            thankNode.classList.add('footer-subscribe-wrong');
            subscribeForm.append(thankNode);
            errors = true;
        } else if (!regexp.test(subscribeInput.value)) {
            thankNode.innerHTML = 'Пожалуйста, введите корректный email';
            thankNode.classList.add('footer-subscribe-wrong');
            subscribeForm.append(thankNode);
            errors = true;
        } else {
            thankNode.classList.remove('footer-subscribe-wrong');
            thankNode.innerHTML = '';
            errors = false;
        }

        if (!errors) {
            $.ajax({
                type: "POST",
                url: "php/handlers/SubscribeHandler.php",
                data: $('form.footer-subscribe-form').serialize(),
                success: function () {
                    thankNode.innerHTML = 'Спасибо за подписку!';
                    subscribeForm.append(thankNode);
                    subscribeInput.value = '';
                }
            });
        }

    });
}

function contactClickRu() {
    var errors = false;
    if (document.getElementById('form-name').value === '') {
        $('#form-name-label').text('Пожалуйста, введите полное имя');
        $('#form-name').css('border-bottom-color', '#3FD3AD');
        errors = true;
    }
    if (document.getElementById('form-comp').value === '') {
        $('#form-comp-label').text('Пожалуйста, введите компанию');
        $('#form-comp').css('border-bottom-color', '#3FD3AD');
        errors = true;
    }
    if (document.getElementById('form-email').value === '') {
        $('#form-email-label').text('Пожалуйста, введите email');
        $('#form-email').css('border-bottom-color', '#3FD3AD');
        errors = true;
    }
    if (document.getElementById('form-phone').value === '') {
        $('#form-phone-label').text('Пожалуйста, введите телефон');
        $('#form-phone').css('border-bottom-color', '#3FD3AD');
        errors = true;
    }
    if (document.getElementById('form-country').value === '') {
        $('#form-country-label').text('Пожалуйста, введите страну');
        $('#form-country').css('border-bottom-color', '#3FD3AD');
        errors = true;
    }
    if (errors) {
        $('#form-btn-contact').css('border-color', '#3FD3AD');
    }
    if (!errors) {
        $('#contactModal .wrapper').addClass('animated fadeOut');
        $('#contactModal .modal-login-heading').addClass('animated fadeOut');

        var target = '.form-contact-msg';
        $(target).css('visibility', 'hidden');
        $('#form-btn-contact').css('display', 'none');
        $(target).removeClass('animated');
        $(target).removeClass('fadeInUp');
        setTimeout(function () {
            $('#contactModal .wrapper').css('display', 'none');
            $('#contactModal .modal-login-heading').css('display', 'none');
            $(target).css('visibility', 'visible');
            $(target).addClass('animated fadeInUp');

            $.ajax({
                type: "POST",
                url: "/mail.php",
                data: $('form').serialize()
            });
        }, 1500);
    }
};

function forgotPasswordHandler() {
    $('.login-form').css('display', 'none');
    $('.form-error-msg-wr-lg').css('display', 'none');
    $('.reset-pass-form').css('display', 'block');
    $('#loginModal .modal-login-heading').css('display', 'none');
};

function forgotPasswordSendHandler() {
    $('.reset-pass-form-text').removeClass('animated fadeInUp');
    $('.reset-pass-form-text').css('visibility', 'hidden');
    $('.reset-pass-form #form-btn').css('border-color', 'rgb(6,6,6);');
    $('.reset-pass-form .group input').css('border-bottom-color', 'rgb(6,6,6);');

    setTimeout(function () {
        $('.reset-pass-form-text').css('visibility', 'visible');
        $('.reset-pass-form-text').addClass('animated fadeInUp');
        $('.reset-pass-form-text').css('opacity', '1');
        $('.reset-pass-form-text').html('This email is unregistered in our system <br/>');
        $('.reset-pass-form-text').css('color', '#3FD3AD');
        $('.reset-pass-form #form-btn').css('border-color', '#3FD3AD');
        $('.reset-pass-form .group input').css('border-bottom-color', '#3FD3AD');
    }, 1000);
};

function forgotPasswordSendHandlerRu() {
    $('.reset-pass-form-text').removeClass('animated fadeInUp');
    $('.reset-pass-form-text').css('visibility', 'hidden');
    $('.reset-pass-form #form-btn').css('border-color', 'rgb(6,6,6);');
    $('.reset-pass-form .group input').css('border-bottom-color', 'rgb(6,6,6);');

    setTimeout(function () {
        $('.reset-pass-form-text').css('visibility', 'visible');
        $('.reset-pass-form-text').addClass('animated fadeInUp');
        $('.reset-pass-form-text').css('opacity', '1');
        $('.reset-pass-form-text').html('Этот email не зарегистрирован в нашей системе <br/>');
        $('.reset-pass-form-text').css('color', '#3FD3AD');
        $('.reset-pass-form #form-btn').css('border-color', '#3FD3AD');
        $('.reset-pass-form .group input').css('border-bottom-color', '#3FD3AD');
    }, 1000);
};

$(document).ready(function () {
    $("#login-modal-link").animatedModal({
        color: 'rgb(6,6,6)',
        modalTarget: 'loginModal',
        animatedIn: 'fadeIn',
        animatedOut: 'fadeOut',
        animationDuration: '1.5s'
    });

    if ($("#form-name").length) {
        $("#form-name").attr("name", "name");
        $("#form-comp").attr("name", "company");
        $("#form-email").attr("name", "email");
        $("#form-phone").attr("name", "phone");
        $("#form-country").attr("name", "country");

        $("#form-name").attr("maxlength", "50");
        $("#form-comp").attr("maxlength", "50");
        $("#form-email").attr("maxlength", "50");
        $("#form-phone").attr("maxlength", "50");
        $("#form-country").attr("maxlength", "50");

        $("#form-btn-contact").attr("type", "button");
    }

    $(".contact-modal-link").animatedModal({
        color: 'rgb(6,6,6)',
        modalTarget: 'contactModal',
        animatedIn: 'fadeIn',
        animatedOut: 'fadeOut',
        animationDuration: '1.5s'
    });

    $(".contact-modal-link2").animatedModal({
        color: 'rgb(6,6,6)',
        modalTarget: 'contactModal',
        animatedIn: 'fadeIn',
        animatedOut: 'fadeOut',
        animationDuration: '1.5s'
    });

    menuOffset();
    slideDownArrow();
    anchorNav();
    revealText();
    subscribeForm();
});
