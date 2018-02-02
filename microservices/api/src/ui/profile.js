var request = new XMLHttpRequest() ;
request.onreadystatechange = function()
{
	if(request.readyState === XMLHttpRequest.DONE){
		if(request.status === 200)

		{
			document.getElementById("uservalue").innerHTML="Welcome "+request.response ;
			console.log(request.response);
            alert(request.response);
     }
      else if(request.status === 304){
        console.log("Username is not received");
    }
   }
};

request.open('POST', '/getuser', true);
request.setRequestHeader('Content-Type','application/json');
request.send(JSON.stringify({token:  'f59573c745ae0191e84c6993efe2901cb8272c2d9f0780f2'}))


var submit = document.getElementById('submit_btn');
submit.onclick = function(){

	var request = new XMLHttpRequest();


	request.onreadystatechange = function(){


		if(request.readyState === XMLHttpRequest.DONE){
			if(request.status === 200)
			{
				var names = request.responseText;
				names = JSON.parse(names);
	var list = '';
	for(var i = 0 ; i < names.length; i++)
	{
	list += '<li>' + names[i] + '</li>';

	}
	var ul = document.getElementById('namelist');
	ul.innerHTML = list

			}
		}
	};

	var nameInput = document.getElementById('name')
	var name = nameInput.value;
	request.open('POST', '/submit-name/'+name, true) ;
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({token:  'f59573c745ae0191e84c6993efe2901cb8272c2d9f0780f2'}));


};

var submit = document.getElementById('img_btn');
submit.onclick = function(){

	var request = new XMLHttpRequest();


	request.onreadystatechange = function(){


		if(request.readyState === XMLHttpRequest.DONE){
			if(request.status === 200)
			{
				var names = request.responseText;
				names = JSON.parse(names);
	var list = '';
	for(var i = 0 ; i < names.length; i++)
	{
	list += '<li>' + names[i] + '</li>';

	}
	var ul = document.getElementById('namelist');
	ul.innerHTML = list

			}
		}
	};

	var Image = document.getElementById('image');
	var image = Image.value;
	console.log(image);
	request.open('POST', '/submit-image', true) ;
	request.setRequestHeader('Content-Type','application/json');
	request.send(JSON.stringify({Image: image, token:  'f59573c745ae0191e84c6993efe2901cb8272c2d9f0780f2'}));


};
