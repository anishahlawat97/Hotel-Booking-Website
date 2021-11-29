//Generate Hotels for a particular city

function getHotelsList(){
    let loader = `<div class="boxLoading"></div>`;
    document.getElementById('list_').innerHTML = loader;
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    let city = window.location.href.substring(window.location.href.indexOf('=')+1);   
    city = decodeURI(city);

    xhr.addEventListener("readystatechange", function () {
      let listTiles = document.getElementById('list_');
      if (this.readyState === this.DONE) {        
        let respObj = JSON.parse(xhr.response);
        console.log(respObj);
        
        //fetch details for hotel info display 
        let hotelObjectList = new Array();
        respObj.data.forEach((element) =>{
            if(element.result_type==="lodging"){
                let eachHotel = { 
                  locationID: element.result_object.location_id,
                  address: element.result_object.address,
                  hotelName: element.result_object.name,
                  rating: element.result_object.rating,
                  photoUrl: element.result_object.photo.images.small.url
                };
                hotelObjectList.push(eachHotel);
              }
              createHotelList(hotelObjectList);
            });
  
            
        //fetch details for google map view
        let mapCityInfo = new Array();
        respObj.data.forEach((element) =>{          
          if(element.result_type === "geos" && element.result_object.name.toLowerCase() === city.toLowerCase()){
            let eachCityInfo = {                   
              cityName: element.result_object.name,
              latitude: element.result_object.latitude,
              longitude: element.result_object.longitude                  
            };
            mapCityInfo.push(eachCityInfo);
          }          
        });
        //fetch hotels location for map view
        let mapHotelInfo = new Array();
        respObj.data.forEach((element) =>{
          if(element.result_type === "lodging"){
            let eachHotelMapInfo = {                   
              hotelName: element.result_object.name,
              latitude: element.result_object.latitude,
              longitude: element.result_object.longitude,
              locationID: element.result_object.location_id                  
            };
            mapHotelInfo.push(eachHotelMapInfo);
          }          
        }); 
        markersForHotels(mapCityInfo, mapHotelInfo);
      }
    });      
        
    xhr.open("GET", "https://travel-advisor.p.rapidapi.com/locations/search?query="+city+"&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US");
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "54820a3f8bmsh6eb73e1468a61b6p16d82fjsncd7f5423e63f");

    xhr.send(data);
  }

  const createHotelList = (hotelList) => {
    const allHotels = hotelList.map((hotelObj) => {
        return `<a href="detail.html?location_id=${hotelObj.locationID}"><div class="hotels"  >
          <img class="hotel_img" src="${hotelObj.photoUrl}"></img>
          <div class="infoDiv" style=" color: black; margin-top: 2.5%;">
            <h3>${hotelObj.hotelName}"</h3>
            <span>${hotelObj.rating}<span><span class="fa fa-star checked"></span>
            <p>${hotelObj.address}</p>
          </div>
          </div></a>`
    }).join('');
    console.log(allHotels);
    let hotelDivList = document.getElementById('list_');
    hotelDivList.innerHTML = allHotels;
  };

  window.addEventListener("load", getHotelsList);


//Generate google map for map view
const markersForHotels = (cityMarkerList, hotelMarkerList) => {
  let script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyDT1Z6M7vr87uBSD-s04Rxk_wa7W8z0aL4&callback=initMap';
  script.async = true;

  //Attach your callback function to the `window` object
  window["initMap"] = function() {
    let map = new google.maps.Map(document.getElementById('map_view'), {
      zoom: 8,
      center: new google.maps.LatLng(cityMarkerList[0].latitude, cityMarkerList[0].longitude),
      mapTypeId: google.maps.MapTypeId.ROADMAP
    });

  //JS API is loaded and available
    
  let infoContent;
    let infowindow = new google.maps.InfoWindow({
      content: infoContent 
    });
    var marker, i;
    
    
    for (i = 0; i < hotelMarkerList.length; i++) { 
      // infoContent = `<a  href = detail.htmllocation_id=${hotelMarkerList[i].locationID}>Book Now</a>`; 
      marker = new google.maps.Marker({
        position: new google.maps.LatLng(hotelMarkerList[i].latitude, hotelMarkerList[i].longitude),
        map: map
      });
      
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          var name = hotelMarkerList[i].hotelName;
          infoContent = `<a style=" color: black;" href = detail.html?location_id=${hotelMarkerList[i].locationID}>Book Now</a>`; 
          var html = name + "<br>"+infoContent;
          infowindow.setContent(html);
          infowindow.open(map, marker, html);
        }
      })(marker, i));
    }
  };    
  //Append the 'script' element to 'head'
  document.head.appendChild(script);
}


