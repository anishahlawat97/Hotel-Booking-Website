// window.onload = function(){
//     document.getElementByID('toDate').addEventListener('load', calculateAmount);
// }


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
    console.log(Math.round((toDate-frmDate)/84600000));
    var fullAmount = roomPrice*customerCount*(Math.round((toDate-frmDate)/84600000));    
    if(frmDate>toDate){
        alert("Check-in date can't be after Checkout date!!");
    }
    else{
        document.getElementById('total').value = (isNaN(fullAmount))?"Rs. "+0: "Rs. "+fullAmount;
    }
} 
