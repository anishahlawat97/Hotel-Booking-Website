function getHotelsList(){
    const data = null;
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    let city = window.location.href.substring(window.location.href.indexOf('=')+1);
    

    xhr.addEventListener("readystatechange", function () {
      let listTiles = document.getElementById('list_');
      if (this.readyState === this.DONE) {        
        let respObj = JSON.parse(xhr.response);
        console.log(respObj);

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
        });
        
        createHotelList(hotelObjectList);
      }
    });

    xhr.open("GET", "https://travel-advisor.p.rapidapi.com/locations/search?query="+city+"&limit=30&offset=0&units=km&location_id=1&currency=USD&sort=relevance&lang=en_US");
    xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
    xhr.setRequestHeader("x-rapidapi-key", "cb317dd6bcmsheb95c2514d30caap1faf14jsn492d361686e4");

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
           </div></a>
          `
      }).join('');
      console.log(allHotels);
      let hotelDivList = document.getElementById('list_');
      hotelDivList.innerHTML = allHotels;
  };

  window.addEventListener("load", getHotelsList);