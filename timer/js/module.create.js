App.modules.create = function () {
    var $createButton = $('#newCounter');
    var $closeLayer = $('.top-line__close-layer');
    var $createCounterButtons = $('.js-create');
    var $saveButton = $('.js-button__save');
    var $countersField = $('.js-counters');
    var counterClassList = 'btn btn-primary btn-lg counters__item js-timer';
    var templateCounters = '<button class="' + counterClassList + '" ' +
        'data-type="<%= type %>"' +
        'data-key="<%= key %>"' +
        'data-counter="<%= counter %>"' +
        'data-desc="<%= desc %>"><%= name %></button>';

    function renderCounters () {
        var counters = App.store.getAll();

        $countersField.html('');

        _.each(counters, function (item, key) {
            var data = JSON.parse(item);

            data.key = key;

            $countersField.append(_.template(templateCounters, data));
        });
    }

    // открытие/закрытие слоя создания
    $createButton.on('click', function (event) {
        event.preventDefault();

        var $this = $(this);

        if ($this.hasClass('js-cancel')) {
            App.fn.layer();
        } else {
            App.fn.layer('create');
        }

        $this.toggleClass('js-cancel');
    });

    // создание счётчика
    $createCounterButtons.on('click', function (event) {
        event.preventDefault();

        var $this = $(this);
        var type = $this.data('type');

        App.fn.layer(type);
    });

    // Сохранение счётчика
    $saveButton.on('click', function (event) {
        event.preventDefault();

        var $this = $(this);
        var $form = $this.closest('.form');
        console.log($this);

        App.store.update((+ new Date ()) + '', {
            name: $form.find('.js-counterName').val(),
            type: $this.data('type'),
            desc: $form.find('.js-counterDesc').val(),
            counter: 0
        });

//        App.modules.loader({
//            data: $form.serializeArray(),
//            url: App.CONST.url.create
//        });
    });

    renderCounters()
};