var fetchAction =  require('fetch');

var url = "https://filestore.atonal41.hasura-app.io/v1/file";

// This is the file we are going to upload, replace this with your file
var file = 'mayankpic.jpg';

// If you have the auth token saved in offline storage
// var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
// headers = { "Authorization" : "Bearer " + authToken }
var requestOptions = {
	method: 'POST',
	headers: {
      "Authorization": "Bearer 961ec6f83635a6be14b64ac77a3011f37764320041968b88"
	},
	body: file
}

fetchAction.fetchUrl(url, requestOptions, function(error, meta, body){  
    var myObj = JSON.parse(body);
    console.log(myObj);

});
