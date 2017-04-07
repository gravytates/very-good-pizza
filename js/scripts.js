// Business Logic
function User(name) {
  this.name = name;
}

function Pizza(size){
  this.size = size;
  this.frills = [];
}

Pizza.prototype.sizeCost = function(size) {
  var sizePrice = 0;
  if (this.size === "small") {
    sizePrice = 0;
  } else if (this.size === "medium") {
    sizePrice = 2;
  } else {
    sizePrice = 4;
  }
  return sizePrice;
}

Pizza.prototype.frillsCost = function(frills) {
  let frillsPrice = 0;
  for(i=0; i<this.frills.length; i++) {
    frillsPrice += this.frills[i];
  }
  return frillsPrice;
}

//   var frillsPrices = [];
//   var frillsPrice = 0;
//   var totalFrillsPrice = 0;
//   for(i=0; i<this.frills.length; i++){
//     if (this.frills[i] === "meat") {
//       frillsPrice = 1.5;
//       frillsPrices.push(thisfrills[i])
//     } else {
//       frillsPrice = 0.75;
//     }
//     return frillsPrice;
//   }
//   for(i=0; i<frillsPrices.length; i++){
//     totalFrillsPrice += frillsPrices[i];
//   }
// }

Pizza.prototype.pizzaCost = function(sizePrice, totalFrillsPrice){
  var price = 9 + sizeCost(size) + frillsCost(frills);
  return "$" + price + ".00";
}


// UI Logic
$(function(){
  $("#mainForm").submit(function(e){
    e.preventDefault();
    let name = $("#name").val();
    let size = $("#sizes").val();
    let pizza = new Pizza(size);
    $("input:checkbox[name=frills]:checked").each(function(){
    let inputFrills = parseFloat($(this).val());
    pizza.frills.push(inputFrills);
    console.log(pizza.frills);
    });
  });
});


// checkbox data gather example
// $("input:checkbox[name=work-transportation]:checked").each(function(){
//      var workTransportationMode = $(this).val();
//      $('#work-responses').append(workTransportationMode + "<br>");
//    });
