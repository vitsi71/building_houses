$(document).ready(function () {

        new WOW().init();

//выпадающее меню
        $('#burger').click(function () {
            $('#nav').addClass('open');
        })

        $('#nav__close').click((e) => {
            $('#nav').removeClass('open');
            e.stopPropagation();
        })
        //Popup записаться
        $('#excursion_btn').click(function () {
            $('#bg_popup').addClass('open');
        })

        $('.close_popup').click(() => {
            close_popup();

        })

        function close_popup() {
            $('#bg_popup').removeClass('open');
            clearForm('excursion_form');
        }

        //открытие картинки на полный экран
        $('.card-img').magnificPopup({
            type: 'image'
        });

// сброс формы
        function clearForm(form) {
            $('#' + form).trigger("reset");
            const inputForm = $('form#' + form + ' input');
            for (let i = 0; i < inputForm.length; i++) {
                let input = $(inputForm[i]);
                if (input.attr('type') === 'checkbox') {
                    input.prev().css('display', 'none');
                    input.next().css('border', '1px solid white');
                } else {
                    input.next().css('display', 'none');
                    input.css('border', '1px solid white');
                    if (input.attr('type') === 'tel') {
                        input.next().next().css('display', 'none');
                    }

                }
            }
        }

// Проверка формы
        let inputName = $('#input-name');
        inputName.inputmask('a{1,15}');

        const phoneInput = $('.phone-input');
        phoneInput.inputmask("+7 (999) 999-9999");//маска для телефона из пакета inputmask
        $('#consultation_btn').click(function () {
            valid_form('consultation_form');//проверяем форму консультации
        });
        $('#popup_btn').click(function () {
            valid_form('excursion_form');//проверяем форму экскурсий
        });

        function valid_form(form) {

            const inputForm = $('form#' + form + ' input');
            let err = false;
            const url = ' https://testologia.ru/checkout'; // ссылка на сервер для приема данных формы

            for (let i = 0; i < inputForm.length; i++) {
                let input = $(inputForm[i]);
                // проверка согласия
                if (input.attr('type') === 'checkbox') {
                    input.prev().css('display', 'none');
                    input.next().css('border', '1px solid white');
                    if (!input.is(":checked")) {
                        input.prev().css('display', 'flex');
                        input.next().css('border', '1px solid red');
                        err = true
                    }
                } else {

                    input.next().css('display', 'none');
                    input.css('border', '1px solid white');
                    if (!input.val()) {
                        input.css('border', '1px solid red');
                        input.next().css('display', 'flex');
                        err = true;
                    } else {
                        if (input.attr('type') === 'text') {
                            inputName = input.val();
                        }
                        //проверяем тип текущего input , если это телефон - прповеряем заполнение
                        if (input.attr('type') === 'tel') {
                            input.next().next().css('display', 'none');
                            if (!input.inputmask('isComplete')) {
                                input.next().next().css('display', 'flex');
                                input.css('border', '1px solid red');
                                err = true;
                            }
                        }
                    }

                }
            }


            if (!err) {
// валидация ajax на сервере url = ' https://testologia.ru/checkout';
                $.ajax({
                    method: "POST",
                    url: url,
                    // данные формы, передаваемые на сервер
                    data: {name: inputName}//, phone: inputPhone.val()
                })
                    .done(function (msg) {
                        if (msg.success) {
                            // скрываем форму

                            const form_ = $('#' + form);

                            // всплывающее сообщение
                            const orderMsg = form_.prev();
                            orderMsg.width(form_.width());
                            orderMsg.height(form_.height());
                            orderMsg.css('display', 'flex');
                            form_.addClass('hide');
                            //очищаем форму через 3 сек  или закрываем popup экскурсии
                            setTimeout(() => {
                                console.log(form_);
                                form_.trigger("reset");//очистка формы
                                form_.removeClass('hide');
                                orderMsg.css('display', 'none');
                                close_popup();
                            }, 3000);

                        } else {
                            alert('Возникла ошибка при оформлении заказа, позвоните нам и сделайте заказ');
                            for (let i = 0; i < inputForm.length; i++) {
                                inputForm[i].value = ''
                            }
                        }
                    });
            }

        }


//---------открыть проекты--------
        const proects = $('.project');
        const proects1 = $('.project1');
        const proectsOpen = $('.projects_open');
        const proectsClose = $('.projects_close');


        proectsOpen.click(function () {
            proects.each(function () {
                $(this).removeClass('hide');
            })
            proects1.each(function () {
                $(this).removeClass('hide');
            })
            proectsOpen.addClass('hide');
            proectsClose.removeClass('hide');
        })
        //---------скрыть проекты--------
        proectsClose.click(function () {
            proects.each(function (index) {
                if (index > 0) {
                    $(this).addClass('hide');
                }
            })
            proects1.each(function (index) {
                if (index > 0) {
                    $(this).addClass('hide');
                }
            })
            proectsClose.addClass('hide');
            proectsOpen.removeClass('hide');
        });

        //слайдер owlCarousel___________________________________________________________________________________

        $(".slider").owlCarousel({
            loop: true,//бесконечная прокрутка
            items: 2,// число слайдов
            margin: -60,// отступы между слайдами
            nav: true,
            stageClass: 'slider_track',//первая обертка
            center: true,//центральный слайд по центру
            smartSpeed: 800,
            dotsSpeed: 1200,
            responsiveClass: true,
            responsive:
                {
                    0: {
                        nav: false,
                        items: 1
                    },
                    650: {
                        nav: true,
                        items: 1,
                    },
                    873: {
                        items: 2,
                        center: true,
                    }
                }
        });

    }
)