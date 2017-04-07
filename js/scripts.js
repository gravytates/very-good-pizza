// Business Logic
function Customer(name){
  this.name = name;
  this.address = [];
}

function Address(street, city, state){
  this.street = street;
  this.city = city;
  this.state = state;
}

function Pizza(size, vector){
  this.size = size;
  this.vector = vector;
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

var isDelivery = function(vector) {
  var vectorPrice = 0;
  if (vector === "pick-up") {
    vectorPrice = 0;
  } else if (vector === "delivery") {
    vectorPrice = 3;
  }
  return vectorPrice;
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
  // shows address inputs upon delivery vector selection
  $("#vector").change(function() {
    if ($("#vector").val() === "delivery") {
      $("#address").show();
    }
  });

  $("#mainForm").submit(function(e){
    e.preventDefault();
    var name = $("#name").val();
    var size = $("#sizes").val();
    var vector = $("#vector").val();
    var street = $("#street").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var address = [];

    var frillsArray = [];
    var newCustomer = new Customer(name, address);
    var pizza = new Pizza(size, vector, frillsArray);
    $("input:checkbox[name=frills]:checked").each(function(){
      let inputFrills = parseFloat($(this).val());
      pizza.frillsArray.push(inputFrills);
    });
    newCustomer.address.push(street, city, state);
    console.log(newCustomer.address);


    // user input warnings and address display upon order submission
    if (newCustomer.name === "") {
      $("#name-warning").show();
    } else if (size === "Choose your pizza size") {
      $("#size-warning").show();
    } else if (vector === "Choose an option") {
      $("#vector-warning").show();
    } else if ((vector === "delivery") && (street === "")) {
      $("#street-warning").show();
    } else if ((vector === "delivery") && (city === "")) {
      $("#city-warning").show();
    } else if ((vector === "delivery") && (state === "")) {
      $("#state-warning").show();
    } else if (vector === "pick-up") {
      $(".result").show();
      $(".home-page").hide();
      $(".address-result").hide();
    } else {
      $(".result").show();
      $(".home-page").hide();
    }


    let totalCost = pizza.pizzaCost(pizza.size, pizza.vector, pizza.frillsArray);
    $("#name-result").html(`<strong>${newCustomer.name}</strong>`);
    $("#size-result").text(size);
    $("#price-result").text(totalCost);
    $("#vector-result").text(vector);
    $("#street-result").text(newCustomer.address[0]);
    $("#city-result").text(newCustomer.address[1]);
    $("#state-result").text(newCustomer.address[2]);
  });
});
