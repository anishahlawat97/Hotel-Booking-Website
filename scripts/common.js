// Header Template
var headerTemplate = 
`<div id="logo_cover">
    <a href="index.html"><img id="logo" src="assests\\images\\logo.png" alt="logo"></a>
</div>
<nav>            
    <button id="loginBtn"  class="btn btn-light" data-bs-toggle="modal" data-bs-target="#exampleModal">LOGIN</button>
    <button id="logoutBtn" style="display:none;" class="btn btn-light" onclick="logoutFn()">LOGOUT</button>
</nav>`;
document.getElementById('headerContainer').innerHTML = headerTemplate;

//Footer Template
var footerTemplate = 
`<section>
    <button style="margin-left: 2%; color: white; background-color: #19A1B8;" type="button" class="btn btn-info" data-bs-toggle="modal" data-bs-target="#exampleModal2">Contact Us</button>                
    <div class="social">
        <a href="https:/www.facebook.com" target="_blank"><img id="fb" src="assests\\images\\facebook.png" alt="Facebook"></a>
        <a href="https:/www.instagram.com" target="_blank"><img id="insta" src="assests\\images\\instagram.png" alt="Instagram"></a>
        <a href="https:/www.twitter.com" target="_blank"><img id="twitter" src="assests\\images\\twitter.png" alt="Twitter"></a>
    </div>
    <div id="copyright">&copy; 2020 ROOM SEARCH PVT. LTD.</div>
</section>`;
document.getElementById('footerContainer').innerHTML = footerTemplate;


//Login Credentials Check


function checkLogin(){ 
   
  localStorage.setItem('user', 'admin');
  localStorage.setItem('pwd', 'admin');
      
  var myLoginBtn= document.getElementById('loginBtn');
  var myLogoutBtn = document.getElementById('logoutBtn');

  var storedName = localStorage.getItem('user');
  var storedPwd = localStorage.getItem('pwd');
  
  var enteredName = document.getElementById('userName');
  var enteredPwd = document.getElementById('userPwd');
 

  if(enteredName.value == storedName && enteredPwd.value == storedPwd){
      alert('You have successfully logged in');
      myLoginBtn.style.display="none";
      myLogoutBtn.style.display="block";
      document.getElementsByClassName("btn-close")[0].click();    
  }
  else{
      alert('Invalid Credentials');
  }    
}

function logoutFn(){
    var loginBtn= document.getElementById('loginBtn');
    var logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.style.display = "none";
    loginBtn.style.display = "block";
    localStorage.removeItem("user");
    localStorage.removeItem("pwd");
}




