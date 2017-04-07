// Business Logic
function Pizza(name, size, vector){
  this.name = name;
  this.size = size;
  this.vector = vector;
  this.frillsArray = [];
}

var isDelivery = function(vector) {
  var vectorPrice = 0;
  if (vector === "pick-up") {
    vectorPrice = 0;
  } else if (vector === "delivery") {
    vectorPrice = 3;
  }
  return vectorPrice;
}

var sizeCost = function(size) {
  var sizePrice = 0;
  console.log(size);
  if (size === "small") {
    sizePrice = 0;
  } else if (size === "medium") {
    sizePrice = 2;
  } else if (size === "large"){
    sizePrice = 4;
  }
  return sizePrice;
}

var frillsCost = function(frillsArray) {
  let frillsPrice = 0;
  console.log(frillsArray);
  for(i=0; i<=frillsArray.length -1; i++) {
    frillsPrice += parseFloat(frillsArray[i]);
  }
  return frillsPrice;
}

Pizza.prototype.pizzaCost = function(size, vector, frillsArray){
  var price = 9 + sizeCost(size) + isDelivery(vector) + frillsCost(frillsArray);
  return "$" + price.toFixed(2);
}

// UI Logic
$(function(){
  $("#mainForm").submit(function(e){
    e.preventDefault();
    var name = $("#name").val();
    var size = $("#sizes").val();
    var vector = $("#vector").val();
    var frillsArray = [];
    var frillsNames = $("#frills input:checked").text();
    var pizza = new Pizza(name, size, vector, frillsArray);
    $("input:checkbox[name=frills]:checked").each(function(){
      let inputFrills = $(this).val();
      pizza.frillsArray.push(inputFrills);
    });
    if (name === "") {
      $("#name-warning").show();
    } else if (size === "Choose your pizza size") {
      $("#size-warning").show();
    } else if (vector === "Choose an option") {
      $("#vector-warning").show();
    } else {
      $(".result").show();
      $(".home-page").hide();
    }

    let totalCost = pizza.pizzaCost(pizza.size, pizza.frillsArray);
    $("#name-result").html(`<strong>${name}</strong>`);
    $("#size-result").text(size);
    $("#frills-result").text(frillsNames);
    $("#price-result").text(totalCost);
  });
});
