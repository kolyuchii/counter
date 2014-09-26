App.modules.loader = function (data) {
    var defaults = $.extend({}, App.modules.loader.defaults, data);

    if (App.vars.xhr !== undefined && App.vars.xhr.abort) {
        App.vars.xhr.abort();
        App.vars.xhr = undefined;
    }

    console.log(defaults);

    App.vars.xhr = $.ajax({
        url: defaults.url,
        type: 'post',
        data: defaults.data
    }).done(function (response) {
        if (defaults.done) {
            defaults.done.call(this, response);
        }
    }).fail(function (response) {
        if (defaults.fail) {
            defaults.fail.call(this, response);
        }
    }).then(function (response) {
        if (defaults.then) {
            defaults.then.call(this, response);
        }
    });
};