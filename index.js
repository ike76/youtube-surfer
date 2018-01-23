$(function(){

function hideResults(){
	$('.results').hide();
}

function renderResult (item){
	return `<div class="result">
				<a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
					<img src="${item.snippet.thumbnails.medium.url}" alt="alt text">
					<p>${item.snippet.title.substring(0,60)}</p>
				</a>
					
				<div class="more-channel-link"><p>More from <strong><a href="https://www.youtube.com/channel/${item.snippet.channelId}" target="_blank">${item.snippet.channelTitle}</a></strong></p></div>
			</div>`

	// return `<div class="result">
	// 			<a href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
	// 				<div class="thumbnail" css('background-image', url("${item.snippet.thumbnails.medium.url}"))>
						
	// 				</div>
	// 				<p>${item.snippet.title}</p>
	// 			</a>
	// 		</div>`
}

let query = '';

function handleSubmit(){
	$('.js-search-form').on('submit', function(event) {
		event.preventDefault();
		const queryBox = $(this).find('.js-query');
		query = queryBox.val();
		//empty the box
		queryBox.val('')
		callGoogle(query, displayResults)
		$('.results').show();
	})
}

function callGoogle(query, callback, pageToken = ''){
	const endpoint = 'https://www.googleapis.com/youtube/v3/search';
	const queryObject = {
		maxResults: 6,
		part: 'snippet',
		key: 'AIzaSyC7KpQEBzM-kblGHbn9-FSlwEpmJnnZoI8',
		q: query,
		pageToken: pageToken,
	};
	$.getJSON(endpoint, queryObject, callback)
};

function displayResults(data){
	const results = data.items.map(item=>{
		return renderResult(item);
	});
	setButtonTokens(data);
	$('.js-search-results').html(results)
}

function setButtonTokens(data){
	let {prevPageToken = '', nextPageToken = ''} = data;
	$('.btn').removeClass('disabled')
	if (prevPageToken === '') $('#prev-button').addClass('disabled');
	if (nextPageToken === '') $('#next-button').addClass('disabled');
	$('#prev-button').attr({
		token: prevPageToken,
	});
	$('#next-button').attr({
		token: nextPageToken,
	});
}

// button listeners
$('.nav-buttons button').on('click', function(event){
	let token = $(this).attr('token');
	console.log(token);
	callGoogle(query, displayResults, token);
})

handleSubmit();
hideResults();



})