
const endpointUrl = 'https://www.googleapis.com/youtube/v3/search'
const devKey = 'AIzaSyC7KpQEBzM-kblGHbn9-FSlwEpmJnnZoI8';

function renderResult(result) {
	console.log('render result was called')
	return `<div class="result">
		<a href="https://www.youtube.com/watch?v=${result.id.videoId}" target="_blank">
			<img src="${result.snippet.thumbnails.medium.url}" alt="alt text">
			<p>${result.snippet.title}</p>
		</a>
	</div>`
}

function watchSubmit(){
	// set listener for input form and put search query into searchQuery variable
	$('.js-search-form').on('submit', event => {
		event.preventDefault();
		const queryTarget = $(event.currentTarget).find('.js-query');
		const query = queryTarget.val()
		// clear searchbox
		queryTarget.val('')
		getDataFromApi(query, displayYouTubeResults);

	})
	// call google to get json object back
}


function getDataFromApi(searchQuery, callback){
	const querySettings = {
		q: searchQuery,
		key: 'AIzaSyC7KpQEBzM-kblGHbn9-FSlwEpmJnnZoI8',
		part: 'snippet'
	}
	$.getJSON(endpointUrl, querySettings, callback);
}



function displayYouTubeResults(data){
	const results = data.items.map(item => {
		return renderResult(item);
	});
	$('.js-search-results').html(results);
}



// get the json object from google api

$(watchSubmit);