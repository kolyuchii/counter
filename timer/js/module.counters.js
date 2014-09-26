App.modules.counters = function ($timers) {
    $timers.on('click', function (event) {
        event.preventDefault();

        var $this = $(this);
        var type = $this.data('type');
        
        var counter = $this.data('counter') + 1;

        console.log(counter);
        App.store.update($this.data('key'), {
            name: $this.text(),
            type: $this.data('type'),
            desc: $this.data('desc'),
            counter: counter
        });

        $this.data('counter', counter);
    });
};