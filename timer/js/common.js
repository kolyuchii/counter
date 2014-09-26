var $body = $('body');
var $counter = $('#counter');
var $clear = $('#clear');
var store = App.modules.storage();
var arr = store.get('counter') || [];

var counter = arr.length;

if (counter > 0) {
	draw();
}

$clear.on('click', function (event) {
	event.preventDefault();

	arr = [];
	counter = 0;
	store.set('counter', arr);
	draw();
});

$counter.on('click', function () {
    add();
});

function add () {
    arr.push(+ new Date);

	counter++;

    store.set('counter', arr);

	draw();
}

function draw () {
	$counter.text(counter);
}