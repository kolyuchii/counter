$.fn.validator = function (options) {
    options = options || {};

    $(this).each(function () {
        var $form = $(this);
        var methods = $.fn.validatorMethods;
        var message = $.fn.validatorMessage;

        var $elements = $form.find(':text, [type="password"], select, textarea, [type="radio"], [type="checkbox"]');

        function validate () {
            var check = true;

            _.each($elements, function (element) {
                var $element = $(element);
                var rules = $element.data('rules');

                if (rules) {
                    var checkElement = _.every(rules.split(/,| |\|/g), function (item) {
                        if (methods[item]) {

                            if (methods[item].call($element)) {
                                return true;
                            }

                            $element
                                .tooltip({title: message[item] || message.def, trigger: 'manual'})
                                .tooltip('show')
                                .addClass('validate-error')
                                .one("change keydown", function () {
                                    $(this).tooltip('destroy').removeClass('validate-error');
                                });

                            check = false;

                            return false;
                        }
                    });
                    $element.toggleClass('validate-ok', checkElement);
                }
            });

            if (check && typeof options.success === "function") {
                $form.addClass('form-passed');
                options.success.call(this);
            }

            if (check === false && typeof options.fail === "function") {
                options.fail.call(this);
            }

            return false;
        }

        if (options.now) {
            validate();
        } else {
            $form.on("submit", validate);
        }
    });

    return this;
};

$.fn.validatorMethods = {
    require: function () {
        return !!$.trim(this.val());
    },

    email: function () {
        if (!!this.val()) {
            return /^[^\s]+@[^\s]+\.[a-z]{2,}$/i.test($.trim(this.val()));
        }

        return true;
    },

    phone: function () {
        var val = $.trim(this.val());
        var pureVal = val.replace(/\D/g, "");

        if (!!val) {
            var valLen = pureVal.length;
            var result = {};

            // если какой-то цифры больше 90% - номер не валидный
            for (var i = 0; i < valLen; i += 1) {
                if (result[val.charAt(i)] === undefined) {
                    result[val.charAt(i)] = 0;
                }

                result[val.charAt(i)] += 1;

                if (result[val.charAt(i)] / pureVal.length > 0.9) {
                    return false;
                }
            }

            // если номер от 11 до 15 цифр и не содержит букв, то номер валидный
            return valLen >= 11 && valLen <= 15 && /[^()\s\d\+-]/g.test(val) === false;
        }

        return true;
    }
};

$.fn.validatorMessage = {
    require: 'Поле обязательно к заполнению',
    email: 'Укажите правильный электронный адрес',
    phone: 'Укажите правильный номер телефона',
    def: 'Поле содержит ошибки'
};
