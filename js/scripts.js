// Business Logic
function Pizza(name, size){
  this.name = name;
  this.size = size;
  this.frillsArray = [];
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

Pizza.prototype.pizzaCost = function(size, frillsArray){
  var price = 9 + sizeCost(size) + frillsCost(frillsArray);
  return "$" + price.toFixed(2);
}

// UI Logic
$(function(){
  $("#mainForm").submit(function(e){
    e.preventDefault();
    var name = $("#name").val();
    var size = $("#sizes").val();
    var frillsArray = [];
    if (name === "") {
      $("#name-warning").show();
    } else if (size === "Choose your pizza size") {
      $("#size-warning").show();
    } else {
      $(".result").show();
      $(".home-page").hide();
    }
    var pizza = new Pizza(name, size, frillsArray);
    $("input:checkbox[name=frills]:checked").each(function(){
    let inputFrills = parseFloat($(this).val());
    pizza.frillsArray.push(inputFrills);
    });

    let totalCost = pizza.pizzaCost(pizza.size, pizza.frillsArray);
    $("#name-result").text(name);
    $("#size-result").text(size);
    $("#price-result").text(totalCost);
  });
});
