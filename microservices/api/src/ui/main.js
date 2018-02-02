

 // submit username and password to login 

var button = document.getElementById('submit_btn') ;
button.onclick = function() {
      
    // create a request object
    var request = new XMLHttpRequest() ;
   
    // Capture the response and store it in a variable
    request.onreadystatechange = function() {

    if(request.readyState === XMLHttpRequest.DONE) {
        if(request.status === 200)
          {
              
//      console.log('user is logged in') ;
      console.log(request.response) ;
      alert('logged in successsfully');
      console.log("Hello");

          window.location="/ui/profile.html";
  
          }
          else if(request.status === 403) {
           alert(request.response);
              
          }else if(request.status === 500){
              alert("Something went wrong on the server") ;
              
          }
    }
  
    
        
    };
    var username = document.getElementById('username').value;
     var password = document.getElementById('password').value ;
     console.log(username);
     console.log(password);
    
    
    request.open('POST', '/instagram/user-signin', true) ;
    request.setRequestHeader('Content-Type','application/json') ;
    request.send(JSON.stringify({username: username, password: password})) ;

    
};
  

var create_btn = document.getElementById('create_btn') ;
create_btn.onclick = function() {


  var request = new XMLHttpRequest();

  request.onreadystatechange = function() {

   if(request.readyState === XMLHttpRequest.DONE){
    if(request.status === 200)
    {
 //      console.log('user is created successsfully') ;
      alert(request.response);
    }
    else if(request.status === 403)
    {
        alert(request.response);

    }
    else if(request.status === 500){
      alert("Something went wrong on the server") ;
    }

   }

  };


     var username = document.getElementById('user').value ;
   //  var email = document.getElementById('email').value;
     var password = document.getElementById('passwd').value ;
     console.log(username);
     console.log(password);
    
    
    request.open('POST', '/instagram/create-user', true) ;
    request.setRequestHeader('Content-Type','application/json') ;
//    request.send(JSON.stringify({username: username, email:email, password: password})) ;
   request.send(JSON.stringify({username: username, password: password})) ;





};
