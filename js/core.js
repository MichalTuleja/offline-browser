var index = {};

$(document).ready(function() {
    console.log( "ready!" );
	init();
});


function init() {
	prepareSubmit();
	loadIndex();
	listPages();
};

function prepareSubmit() {
	$('#urlForm').submit(function(e) {
		e.preventDefault();
		var url = $('#inputUrl').val();
		fetchUrl(url);
	});
}

function hyperlinksHandler() {
	$('#content a').click(function(event) {
		event.preventDefault();
		if(event.currentTarget.href !== '#') {
			fetchUrl(event.currentTarget.href);
		}
	});
};

function listPages() {
	var listSel = $('#list');

	var output = '<div class="list-group">';

	for(page in index) {
		console.log(page);
		output += '<a href="#" class="list-group-item col-sm-3" onclick="loadPage(\'' + index[page].pageUrl + '\')">' + index[page].title + '</a>'
	}
	
	output += '</div>'
	
	listSel.html(output);
};

function saveIndex() {
	localStorage.setItem('index', JSON.stringify(index));
};

function loadIndex() {
	var res = JSON.parse(localStorage.getItem('index'));
	if(res !== null) {
		index = res;
	}
};

var loadPage = loadPageWithoutCss;

function loadPageWithoutCss(url) {
	var data = JSON.parse(localStorage.getItem(url));
	
	$('title').text(data.title + ' - Offline Browser');
	//$('head > style').text(data.css);
	$('#content').html(data.content);
	$('#content [style]').removeAttr('style');
	$('#content [class]').removeAttr('class');
	$('#content [width]').removeAttr('width');
	$('#content [height]').removeAttr('height');
	hyperlinksHandler();
};

function loadPageWithCss(url) {
	var data = JSON.parse(localStorage.getItem(url));
	
	$('title').text(data.title + ' - Offline Browser');
	$('head > style').text(data.css);
	$('body').html(data.content);
	//hyperlinksHandler();
};

function savePage(data) {
	saveToIndex(data);
	savePageData(data);
};

function savePageData(data) {
	localStorage.setItem(data.pageUrl, 
		JSON.stringify(data));
};

function saveToIndex(data) {
	index[data.pageUrl] = {
		pageUrl: data.pageUrl,
		timestamp: data.timestamp,
		title: data.title
	}
	saveIndex();
};

function fetchUrl(pageUrl) {
	$('#status').text('Loading ' + pageUrl + '...');

	var fullUrl = 'backend/'
		+ '?url=' + pageUrl;

	var success = function(data) {
		data.pageUrl = pageUrl;
		savePage(data);
		listPages();
		$('#status').text('Done.');
	}
	
	var fail = function(reason) {
		$('#content').html('Error');
		console.log(reason);
	}

	return $.ajax({
	  dataType: "jsonp",
	  url: fullUrl,
	  success: success
	});	
}