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

 