//Function to calculate Hotel Rent
var calculateAmount= () =>{

    var roomPrice = 1000; //price per person per day
    var customerCount = document.getElementById('adultsCount').value;
    var frmDate = document.getElementById('fromDate').value;
    var toDate =document.getElementById('toDate').value;    
    var fromDateElement = document.getElementById('fromDate');
    var toDateElement = document.getElementById('toDate');
    
    //set min and max for from and to dates
    toDateElement.min = fromDateElement.value;
    fromDateElement.max = toDateElement.value;
    

    var frmDate = Date.parse(document.getElementById('fromDate').value);        
    var toDate = Date.parse(document.getElementById('toDate').value);    
    var fullAmount = roomPrice*customerCount*(Math.round((toDate-frmDate)/84600000));    
    if(frmDate>toDate){
        alert("Check-in date can't be after Checkout date!!");
    }
    else{
        document.getElementById('total').value = (isNaN(fullAmount))?"Rs."+0: "Rs."+fullAmount;
    }
} 


//Fetch Hotel Details
function getHotelDetails(){
    let loader = `<div class="boxLoading"></div>`;
    document.getElementById('info_div').innerHTML = loader;
    const data = null;

    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    let locationID = window.location.href.substring(window.location.href.indexOf('=')+1);
    document.getElementById("locationID").value = locationID;    

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            let respObj = JSON.parse(xhr.response);
            console.log(respObj);

            let hotelDetailsList = new Array();
            respObj.data.forEach((element) =>{                
                let eachHotelDetail = { 
                    locationID: element.location_id,
                    amenities: element.amenities.slice(0,10),
                    hotelName: element.name,
                    description: element.description
                };
                hotelDetailsList.push(eachHotelDetail);                        
            });            
            createHotelDetails(hotelDetailsList);
            getHotelPhotos(locationID);            
        }
    });

    xhr.open("GET", "https://travel-advisor.p.rapidapi.com/hotels/get-details?location_id="+locationID+"&adults=1&lang=en_US&child_rm_ages=7%2C10&currency=USD&nights=2");
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "54820a3f8bmsh6eb73e1468a61b6p16d82fjsncd7f5423e63f");

    xhr.send(data);
}

//Display the details for the hotel 
const createHotelDetails = (hotelList) => {
    const allHotelsDetail = hotelList.map((hotelObj) => {
       return `<h2 style="font-size: 1.5em; font-weight: bold;">${hotelObj.hotelName}</h2>
       <h5 style="font-size: 0.83em; font-family: cursive; font-weight: bold;">RATING</h5>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <span class="fa fa-star checked"></span>
       <h5 style="font-size: 0.83em; font-family: cursive; font-weight: bold;">AMENITIES</h5>
       <ul>
           <li>${hotelObj.amenities[0].name}</li>
           <li>${hotelObj.amenities[1].name}</li>
           <li>${hotelObj.amenities[2].name}</li>
           <li>${hotelObj.amenities[3].name}</li>
           <li>${hotelObj.amenities[4].name}</li>
           <li>${hotelObj.amenities[5].name}</li>
           <li>${hotelObj.amenities[6].name}</li>
           <li>${hotelObj.amenities[7].name}</li>
           <li>${hotelObj.amenities[8].name}</li>
           <li>${hotelObj.amenities[9].name}</li>
           
    </ul>
       <h5 style="font-size: 0.83em; font-family: cursive; font-weight: bold;">DESCRIPTION</h5>
       <p id="padding_bottom">${hotelObj.description}</p>
        `
    }).join('');
    console.log(allHotelsDetail);
    let hotelDivList = document.getElementById('info_div');
    hotelDivList.innerHTML = allHotelsDetail;
};

window.addEventListener("load", getHotelDetails);


// Fetch Photos for each Hotel
function getHotelPhotos(locationID){

    let loader = `<div class="boxLoading"></div>`;
    document.getElementById('carouselPhotos').innerHTML = loader;
    const data1 = null;
    const xhr1 = new XMLHttpRequest();
    xhr1.withCredentials = false;

    xhr1.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
            console.log(this.responseText);
            let respObj1 = JSON.parse(xhr1.response);
            console.log(respObj1);

            let hotelPhotosList = new Array();
            respObj1.data.forEach((element) =>{            
                let eachHotelPhoto = {                 
                    photos: element.images.large.url
                };
                hotelPhotosList.push(eachHotelPhoto);
                    
            });       
            createHotelPhotos(hotelPhotosList);
        }
});

xhr1.open("GET", "https://travel-advisor.p.rapidapi.com/photos/list?location_id="+locationID+"&currency=USD&limit=50&lang=en_US");
xhr1.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
xhr1.setRequestHeader("x-rapidapi-key", "54820a3f8bmsh6eb73e1468a61b6p16d82fjsncd7f5423e63f");

xhr1.send(data1);
}

const createHotelPhotos = (hotelPhotos) => {
    const allHotelPhotos = hotelPhotos.map((hotelPhotosObj, i) => {
        if(i===0){
            return `<div class="carousel-item active ">
            <img class="slider_img" src="${hotelPhotosObj.photos}" class="d-block w-100" alt="generic hotel image">
        </div>` 
        }
        return `<div class="carousel-item ">
                    <img class="slider_img" src="${hotelPhotosObj.photos}" class="d-block w-100" alt="generic hotel image">
                </div>`
    }).join('');
    let hotelPhotosDiv = document.getElementById('carouselPhotos');
    hotelPhotosDiv.innerHTML = allHotelPhotos;
    console.log(allHotelPhotos);
};
