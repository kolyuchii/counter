var $body = $('body');
var $counter = $('#counter');
var $graph = $('#graph');
var $clear = $('#clear');
var store = App.modules.storage();
var arr = store.get('counter') || [];
var step = 2 * 1000;
var dates = {
	l: [],
	d: []
};
var cl = 0;
var stepTime = 0;

var ctx = $("#myChart").get(0).getContext("2d");

var counter = arr.length;

function prepareData (a) {
	for (var i = 0, l = a.length; i < l; i += 1) {
		if (i === 0) {
			cl++;
			stepTime = a[i];
		} else if (a[i] - stepTime < step) {
			cl++;
		} else {
			var d = new Date(a[i]);
			dates.l.push(d.getSeconds());
			dates.d.push(cl);
			cl = 0;
			stepTime = a[i];
		}
	}

	return dates;
}

prepareData(arr);

var myLineChart = new Chart(ctx).Line({
	labels: dates.l.splice(-15),
	datasets: [
		{
			label: "Timer",
			fillColor: "rgba(151,187,205,0.2)",
			strokeColor: "rgba(151,187,205,1)",
			pointColor: "rgba(151,187,205,1)",
			pointStrokeColor: "#fff",
			pointHighlightFill: "#fff",
			pointHighlightStroke: "rgba(151,187,205,1)",
			data: dates.d.splice(-15)
		}
	]
}, {
	animationSteps: 10
});

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

	prepareData(arr);

	myLineChart.addData([dates.d.splice(-1)], dates.l.splice(-1));
	myLineChart.removeData();

	console.log(myLineChart);

	draw();
}

function draw () {
	$counter.text(counter);
	$graph.toggleClass('none', myLineChart === undefined);
}