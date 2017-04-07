// Business Logic

function Pizza(name, size){
  this.name = name;
  this.size = size;
  this.frills = [];
}

// test works!
var sizeCost = function(size) {
  var sizePrice = 0;
  if (size === "small") {
    sizePrice = 0;
  } else if (size === "medium") {
    sizePrice = 2;
  } else if (size === "large"){
    sizePrice = 4;
  }
  return sizePrice;
}

var frillsCost = function(frills) {
  let frillsPrice = 0;
  for(i=0; i<=this.frills.length; i++) {
    frillsPrice += this.frills[i];
  }
  return frillsPrice;
}

Pizza.prototype.pizzaCost = function(size){
  var price = 9 + sizeCost(size);
  //  + frillsCost(frills);
  return "$" + price + ".00";
}


// UI Logic
$(function(){
  $("#mainForm").submit(function(e){
    e.preventDefault();
    var name = $("#name").val();
    var size = $("#sizes").val();
    var pizza = new Pizza(name, size);
    $("input:checkbox[name=frills]:checked").each(function(){
    let inputFrills = parseFloat($(this).val());
    pizza.frills.push(inputFrills);
    console.log(pizza.frills);
    });

    let totalCost = pizza.pizzaCost(pizza.size);
    $(".result").show();
    $("#price-result").text(totalCost);
  });
});
