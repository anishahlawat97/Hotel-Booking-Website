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
        localStorage.setItem('loginToken', 'true');  
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
    // location.reload();
}

window.onload = function(){
    let myPayBtn1 = document.getElementById('pay');
    let myLogin= document.getElementById('loginBtn');
    let myLogout = document.getElementById('logoutBtn');
    if(localStorage.getItem('loginToken') === 'true'){
        myLogout.style.display ="block";
        myLogin.style.display="none";
        myPayBtn1.disabled= false;
    }  
    else {
        myLoginBtn.style.display = "block";
        myLogoutBtn.style.display ="none";
    }
}


function payNow(){
    alert("Your booking is Successfull!!!");
}

//Fetch all the payment details and hotel details

function getPaymentDetails(){
    let loader = `<div class="boxLoading"></div>`;
    document.getElementById('hotel_div').innerHTML = loader;
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials =false;
    let url_string = window.location.search;
    let params = new URLSearchParams(url_string);
    let locationID = params.get('location_id');

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            let respObj = JSON.parse(xhr.response);
            console.log(respObj);

            let hotelDetailsList = new Array();
            respObj.data.forEach((element) =>{            
                let eachHotelDetail = { 
                    locationID: element.location_id,
                    img: element.photo.images.small.url,
                    address: element.address,
                    state: element.address_obj.state,
                    hotelName: element.name                            
                };
                hotelDetailsList.push(eachHotelDetail);
            });
            console.log(hotelDetailsList);
            createHotelDetails(hotelDetailsList);
            updatePayInfo();
        }
    });

    xhr.open("GET", "https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id="+locationID+"&checkin=25-10-2021&adults=1&lang=en_US&child_rm_ages=7%2C10&currency=USD&nights=2");
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "54820a3f8bmsh6eb73e1468a61b6p16d82fjsncd7f5423e63f");

    xhr.send(data);
}

//Display Hotel Information

const createHotelDetails = (hotelList) => {
    const allHotelsDetail = hotelList.map((hotelObj) => {
       return `
       <img id="radisson" src="${hotelObj.img}" alt="Hotel Image">
       <div class="hotel_info">
           <h2>${hotelObj.hotelName}</h2>
           <p><strong>#38 of 1,289 hotels in ${hotelObj.state}</strong></p>
           <p>${hotelObj.address}</p>
       </div>`
    }).join('');
    let hotelPhotosDiv = document.getElementById('hotel_div');
    hotelPhotosDiv.innerHTML = allHotelsDetail;    
}

//Update Pay information

function updatePayInfo(){
    let url_string = window.location.search;
    let params = new URLSearchParams(url_string);
    let adultsCount = params.get('adults');
    let name = params.get('name');
    let checkIn = params.get('in_date');
    let checkOut = params.get('out_date');
    let tAmount = params.get('totalAmount');
    let locationID = params.get('location_id');
    var frmDate = Date.parse(checkIn);        
    var toDate = Date.parse(checkOut);
    let nights = (Math.round((toDate-frmDate)/84600000));
    

    let printInfo = ` 
    <div id="info_div">
        <p style="font-family: cursive;"><strong>Name:</strong> ${name}</p>
        <p style="font-family: cursive;"><strong>Number of Adults:</strong> ${adultsCount}</p>
        <p style="font-family: cursive;"><strong>Check-in Date:</strong> ${checkIn}</p>
        <p style="font-family: cursive;"><strong>Check-out Date:</strong> ${checkOut}</p>
    </div>
    <div id="tariff_div">
        <p style="font-family: cursive;"><strong>Tariff Breakdown:</strong> Rs. 1000 x ${adultsCount} Adults x ${nights} Nights</p>
        <p style="font-family: cursive;"><strong>Tariff Amount:</strong> Rs. ${tAmount}</p>
    </div>`;
    let payDiv = document.getElementById('payDivInfo');
    payDiv.innerHTML = printInfo;
}

window.addEventListener("load", getPaymentDetails);

