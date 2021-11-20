//Login Credentials Check

function checkLogin(){ 
    localStorage.setItem('user', 'admin');
    localStorage.setItem('pwd', 'admin');
    
    var myPayBtn = document.getElementById('pay'); 
    var myLogBtn= document.getElementById('loginBtn');
    var myLogoutBtn = document.getElementById('logoutBtn');
  
    var storedName = localStorage.getItem('user');
    var storedPwd = localStorage.getItem('pwd');
    
    var enteredName = document.getElementById('userName');
    var enteredPwd = document.getElementById('userPwd');
   
  
    if(enteredName.value == storedName && enteredPwd.value == storedPwd){
        alert('You have successfully logged in');
        myLogBtn.style.display="none";
        myLogoutBtn.style.display="block";
        document.getElementsByClassName("btn-close")[0].click();
        myPayBtn.disabled = false;    
    }
    else{
        alert('Invalid Credentials');
    }    
  }
  
function logoutFn(){
    var myPayBtn = document.getElementById('pay'); 
    var logBtn= document.getElementById('loginBtn');
    var logoutBtn = document.getElementById('logoutBtn');
    logoutBtn.style.display = "none";
    logBtn.style.display = "block";
    myPayBtn.disabled = true;
    localStorage.removeItem("user");
    localStorage.removeItem("pwd");
}

function payNow(){
    alert("Your booking is Succesufull!!!");
}
  

  
  
  