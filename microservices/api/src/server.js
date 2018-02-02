  var express = require('express');
var path = require('path');
var morgan = require('morgan');
var app = express();
const request = require('request');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser');
var fetchAction =  require('fetch');

app.use(cookieParser());
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({
  extended: true
}));



app.get('/', function(req, res){

res.send("Hello World- Mayank")
 
});

var authors , posts;
app.get('/authors', function(req, res, next){


request('https://jsonplaceholder.typicode.com/users', {json: true}, (err, result, body) => {
	if(err) {return console.log(err);} ;

    authors = body
  
//	console.log(result);
request('https://jsonplaceholder.typicode.com/posts', {json: true}, (err, result, body) => {
if(err) {return console.log(err);} ;

  	posts = body
   	
   	next() 

});



});


}, function(req, res){

	var NoPosts = [] ;
	var Information = '';
 	for(var i = 0 ; i < authors.length; i++)
 	{
 		var auth_name = authors[i].name ;
 		var auth_id = authors[i].id ;

 		NoPosts[i] = 0 ;
 		for(var j = 0 ; j < posts.length ; j++)
 		{
 			if(posts[j].userId == auth_id)
 			{	
 				NoPosts[i] += 1 ;


 			}


 		}

 		Information += auth_name + " has " + NoPosts[i] + "<br />" ;





 	}

 	 		res.send(Information);

});

app.get('/setcookie', function(req, res){

var cookie_name = "Mayank" ;
if(req.cookies.Mayank === undefined)
{
res.cookie(cookie_name, '[{"name":"Mayank Gupta", "age": 20}]').send('Cookie is set');
 }
 else{
 	res.send("Cookies has already been set") ;
 }
});


app.get('/getcookies', function(req, res){

var info = '' ;
if(req.cookies.Mayank != undefined)
{
var cookie = JSON.parse(req.cookies.Mayank);
//console.log(cookie);

console.log("Name :", cookie[0].name);
console.log("Age :", cookie[0].age);
info += "Name :"+cookie[0].name +"<br />" + "Age :" + cookie[0].age ;
res.send(info);
 }
 else
 {
  res.send("First Set the Cookie");
 }
});

app.get('/robot.txt', function(req, res){
res.status(403).send("Access Denied");


});

app.get('/html', function(req, res){

  res.sendFile(path.join(__dirname, 'ui', 'index.html'));


});

app.get('/image', function(req, res){

  res.sendFile(path.join(__dirname, 'ui', 'nitscene.jpg'));


});

app.get('/ui/main.js', function (req, res) {

  res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/input.js', function (req, res) {

  res.sendFile(path.join(__dirname, 'ui', 'input.js'));
});


app.get('/input', function (req, res) {

  res.sendFile(path.join(__dirname, 'ui', 'input.html'));
});


app.post('/inputvalue', function(req, res){

var inputvalue = req.body.Inputvalue ;

console.log(inputvalue);
res.send("Get Value");

});



// Insta app

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

app.get('/instagram', function(req, res){
 res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


app.get('/instagram/login', function(req, res){

res.sendFile(path.join(__dirname, 'ui', 'stud_login.html'))

});


app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/profile.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profile.html'));
});

app.get('/ui/profile.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'profile.js'));
});

app.get('/ui/posts.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'posts.html'));
});

app.get('/ui/posts.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'posts.js'));
});

app.get('/ui/Imageposts.js', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Imageposts.js'));
});

app.get('/ui/Imageposts.html', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'Imageposts.html'));
});


app.use(express.static(path.join(__dirname, 'public')));



app.post('/instagram/create-user', function(req, res){

var username = req.body.username ;
var password = req.body.password ;



var url = "https://auth.commend97.hasura-app.io/v1/signup";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

var body = {
    "provider": "username",
    "data": {
        "username": username,
        "password": password
    }
};

requestOptions.payload = JSON.stringify(body);

   fetchAction.fetchUrl(url, requestOptions,function(err, meta, response) 
    {

      var obj = JSON.parse(response);

      if(obj.code == "invalid-password")
      {
        res.status(403).send(obj.message);
      }
      else if(obj.auth_token)
      {

          console.log(obj.auth_token);

         var url = "https://data.commend97.hasura-app.io/v1/query";

          var requestOptions = {
              "method": "POST",
              "headers": {
                  "Content-Type": "application/json",
                  "Authorization": "Bearer "+obj.auth_token
              }
          };

          var body = {
              "type": "insert",
              "args": {
                  "table": "users",
                  "objects": [
                      {
                          "hasura_id": obj.hasura_id,
                          "username": username,
                      }
                  ]
              }
          };

          requestOptions.payload = JSON.stringify(body);


          fetchAction.fetchUrl(url, requestOptions,function(err, meta, response) 
          {

                var obj = JSON.parse(response);
                console.log(obj);
                res.send("Successfully Created Account");


          });
      
      }
      else
      {
        res.status(403).send(obj.message);
      }




    
       });

  


});


/*
app.post('/instagram/create-user', function(req, res){
  //  console.log("received")
    //console.log(fetchAction);

var username = req.body.username ;
var email    = req.body.email ;
var password = req.body.password ;


var url = "https://data.commend97.hasura-app.io/v1/query";
var body = {
    "type": "select",
    "args": {
        "table": "users",
        "columns": [
            "username"
        ],
        "where": {
            "username": {
                "$eq": username
            }
        }
    }
};

//console.log(username);

requestOptions.payload = JSON.stringify(body);
  
fetchAction.fetchUrl(url, requestOptions,function(err, meta, response) {
 
 $user = JSON.parse(response) ;
if($user[0])
{
//  console.log(JSON.parse(response));
  console.log("Use different username");
  res.sendStatus(403);
}

else
 
 {

var url = "https://auth.commend97.hasura-app.io/v1/signup";

var body = {
    "provider": "email",
    "data": {
        "email": email,
        "password": password
    }
};

requestOptions.payload = JSON.stringify(body);

fetchAction.fetchUrl(url, requestOptions,function(err, meta, response) {
  
   var myObj = JSON.parse(response);
    
      

    if(myObj.code == "user-exists")    
      {  
          console.log(myObj.message);
          res.sendStatus(403);

      }
    else if(myObj.email)
    {


          var url = "https://data.commend97.hasura-app.io/v1/query";

          var requestOptions = {
              "method": "POST",
              "headers": {
                  "Content-Type": "application/json"
              }
          };

          var body = {
              "type": "insert",
              "args": {
                  "table": "users",
                  "objects": [
                      {
                          "hasura_id": myObj.hasura_id,
                          "username": username,
                          "email": myObj.email 
                      }
                  ]
              }
          };

          requestOptions.payload = JSON.stringify(body);


          fetchAction.fetchUrl(url, requestOptions,function(err, meta, response) 
          {
  
          var myObj = JSON.parse(response);
          console.log(myObj);

          console.log("Verification email is sent. Pls check your mail")   ;
          res.sendStatus(200) ;

  
          }) ;

    }
    else if(myObj.code == "already-exists")
    {
//        console.log("Verification email is already sent. Pls check your mail");
        res.sendStatus(403);

    }


});
 }

});

});


*/


app.post('/instagram/user-signin', function(req, res){



var username = req.body.username ;
var password = req.body.password ;


var url = "https://auth.commend97.hasura-app.io/v1/login";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json"
    }
};

var body = {
    "provider": "username",
    "data": {
        "username":  username,
        "password": password
    }
};

requestOptions.payload = JSON.stringify(body);

fetchAction.fetchUrl(url, requestOptions, function(error, meta, body){
    var myObj = JSON.parse(body);
   // var header = JSON.parse(meta);


      console.log(meta);

    if(myObj.code == "invalid-creds")    
      {  console.log(myObj.message);
         res.status(403).send(myObj.message) ;

      }
    else if(myObj.auth_token)
    {
     res.send(myObj.auth_token);

     }   
    


});


}) ;


app.post('/getuser', function(req,res){

var auth_token = req.body.token ;
//console.log("Token rec!!"+auth_token);
//console.log(request.headers['X-Hasura-User-Id']);


var url = "https://data.commend97.hasura-app.io/v1/query";

// If you have the auth token saved in offline storage
// var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
// headers = { "Authorization" : "Bearer " + authToken }
var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+auth_token  
    }
};

var body = {
    "type": "select",
    "args": {
        "table": "users",
        "columns": [
            "username"
        ],
        "where": {}
    }
};

requestOptions.payload = JSON.stringify(body);
fetchAction.fetchUrl(url, requestOptions, function(error, meta, body){
    var myObj = JSON.parse(body);
   // var header = JSON.parse(meta);

      console.log(myObj[0].username);
      res.send(myObj[0].username);

  
    


});




});

app.post('/submit-name/:name', function(req, res){
var names = [] ;

var name  = req.params.name;
var token = req.body.token



var url = "https://auth.commend97.hasura-app.io/v1/user/info";

// If you have the auth token saved in offline storage
// var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
// headers = { "Authorization" : "Bearer " + authToken }
var requestOptions = {
    "method": "GET",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token
    }
};

fetchAction.fetchUrl(url, requestOptions, function(error, meta, body){  
    var myObj = JSON.parse(body);
    console.log(myObj.hasura_id);


var url = "https://data.commend97.hasura-app.io/v1/query";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token
    }
};

var body = {
    "type": "insert",
    "args": {
        "table": "posts",
        "objects": [
            {
                "content": name,
                "user_id": myObj.hasura_id
            }
        ]
    }
};

requestOptions.payload = JSON.stringify(body);

fetchAction.fetchUrl(url, requestOptions, function(error, meta, body){  
    var myObj = JSON.parse(body);
    console.log(myObj);

 }) ;    


    names.push(name) 



// JSON Javascript object Notation
res.send(JSON.stringify(names));

}); 


});

app.post('/submit-image', function(req, res){
var names = [] ;

var image  = req.body.Image;
var token = req.body.token




var url = "https://filestore.commend97.hasura-app.io/v1/file";

// This is the file we are going to upload, replace this with your file
var file = image;

// If you have the auth token saved in offline storage
// var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
// headers = { "Authorization" : "Bearer " + authToken }
var requestOptions = {
  method: 'POST',
  headers: {
      "Authorization": "Bearer "+token
  },
  body: file
}

fetchAction.fetchUrl(url, requestOptions, function(error, meta, body){  
    var myObj = JSON.parse(body);
    console.log(myObj);


var url = "https://data.commend97.hasura-app.io/v1/query";

var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token
    }
};

var body = {
    "type": "insert",
    "args": {
        "table": "Image_Posts",
        "objects": [
            {
                "file_id": myObj.file_id,
                "user_id": myObj.user_id
            }
        ]
    }
};

requestOptions.payload = JSON.stringify(body);

fetchAction.fetchUrl(url, requestOptions, function(error, meta, body){  
    var myObj = JSON.parse(body);
    console.log(myObj);


 


 }) ;    


});

});

app.post('/getposts', function(req, res){


  var token = req.body.token ;
  var names = [] ;


var fetchAction =  require('fetch');

var url = "https://data.commend97.hasura-app.io/v1/query";

// If you have the auth token saved in offline storage
// var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
// headers = { "Authorization" : "Bearer " + authToken }
var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token
    }
};

var body = {
    "type": "select",
    "args": {
        "table": "posts",
        "columns": [
            "*"
        ]
    }
};

requestOptions.payload = JSON.stringify(body);
fetchAction.fetchUrl(url, requestOptions, function(error, meta, body){  
    var myObj = JSON.parse(body);
//    console.log(myObj);
  
  for(var i = 0 ; i < myObj.length ; i++)
  {

    var name = myObj[i].content ;
    names.push(name) ;
  }
  res.send(JSON.stringify(names)) ;

 }) ;    
});

app.post('/get_imageposts', function(req, res){


  var token = req.body.token ;
  var image = [] ;

var url = "https://data.commend97.hasura-app.io/v1/query";

// If you have the auth token saved in offline storage
// var authToken = window.localStorage.getItem('HASURA_AUTH_TOKEN');
// headers = { "Authorization" : "Bearer " + authToken }
var requestOptions = {
    "method": "POST",
    "headers": {
        "Content-Type": "application/json",
        "Authorization": "Bearer "+token
    }
};

var body = {
    "type": "select",
    "args": {
        "table": "Image_Posts",
        "columns": [
            "file_id",
            "user_id"
        ]
    }
};

requestOptions.payload = JSON.stringify(body);

fetchAction.fetchUrl(url, requestOptions, function(error, meta, body){  
    var myObj = JSON.parse(body);
    console.log(myObj[1].file_id);



    var url = "https://filestore.commend97.hasura-app.io/v1/file/"+myObj[0].file_id;

var requestOptions = {
    "method": "GET",
    "headers": {
      "Authorization" : "Bearer "+token

    }
};


fetchAction.fetchUrl(url, requestOptions, function(error, meta, body){  
   
    console.log(body);
});

});

});


var port =  8080;
app.listen(port, function(req, res){

console.log('App listening on port' + port +'!');
  console.log("Hello");

});
