function collapse() {
  
    var moreTiles = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (moreTiles.style.display === "none" || moreTiles.style.display === "") {
      moreTiles.style.display = "flex";
      btnText.innerHTML = "View Less";
    } 
    else {
      moreTiles.style.display = "none";
      btnText.innerHTML = "View More";
    }
  }

  function searchAutoComplete(inputValue){
    if(inputValue === ''){
      return;
    }
    else{
      inputValue = inputValue.toLowerCase();
      const data = null;
      const xhr = new XMLHttpRequest();
      xhr.withCredentials = false;

      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === this.DONE) {
          console.log(this.responseText);
          let respObj = JSON.parse(xhr.response);
          console.log(respObj);
          let citySearchList = new Array();
          respObj.data.forEach((element) => {
            if(element.result_type==="geos"){                
              let eachCity = { 
                  locationID: element.result_object.location_id,
                  cityName: element.result_object.name              
              };
              citySearchList.push(eachCity); 
            }                       
          });      
          console.log(citySearchList);
          createCityDropDown(citySearchList);      
              // createCityList(citySearchList);                     
        }
      });
    

      xhr.open("GET", "https://travel-advisor.p.rapidapi.com/locations/auto-complete?query="+inputValue+"&lang=en_US&units=km");
      xhr.setRequestHeader("x-rapidapi-host", "travel-advisor.p.rapidapi.com");
      xhr.setRequestHeader("x-rapidapi-key", "54820a3f8bmsh6eb73e1468a61b6p16d82fjsncd7f5423e63f");

      xhr.send(data);
    }
  }

function createCityDropDown(cityList){
  let cityDropList = document.getElementById('dropdownSearch');
  const appendCities = cityList.map((cityObject) => {
    return `<ul>
              <li class="dropdownList"><a href ="list.html?city=${cityObject.cityName}">${cityObject.cityName}</a></li>
            </ul>
            <hr>`
  }).join('');
  
  cityDropList.innerHTML = appendCities;
  displayDropDown();
}
  

function displayDropDown(){
  document.getElementById('dropdownSearch').style.display = 'block';
}

var elem = document.getElementById("searchQuery");
elem.onchange = function(){
  var hiddenDiv = document.getElementById("dropdownSearch");  
  hiddenDiv.style.display = (this.value == "") ? "none":"block";
};

window.onclick = function(){
  document.getElementById("dropdownSearch").style.display = 'none';
}

function loaderLoad() {
    if (document.readyState !== "complete") {
        document.querySelector("body").style.visibility = "hidden";
        document.getElementById("loading").style.visibility = "visible";
    } 
    else {        
        document.getElementById("loading").style.display = "none";
        document.querySelector("body").style.visibility = "visible";                
    };
}

window.addEventListener('load', loaderLoad);


  