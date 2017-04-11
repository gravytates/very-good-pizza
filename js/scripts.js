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

Pizza.prototype.sizeCost = function() {
  var sizePrice = 0;
  console.log(this.size);
  if (this.size === "small") {
    sizePrice = 0;
  } else if (this.size === "medium") {
    sizePrice = 2;
  } else if (this.size === "large"){
    sizePrice = 4;
  }
  return sizePrice;
}

Pizza.prototype.isDelivery = function() {
  var vectorPrice = 0;
  console.log(this.vector);
  if (this.vector === "pick-up") {
    vectorPrice = 0;
  } else if (this.vector === "delivery") {
    vectorPrice = 3;
  }
  return vectorPrice;
}

Pizza.prototype.frillsCost = function() {
  let frillsPrice = 0;
  console.log(this.frillsArray);
  for(i=0; i<=this.frillsArray.length -1; i++) {
    frillsPrice += parseFloat(frillsArray[i]);
  }
  return frillsPrice;
}

Pizza.prototype.pizzaCost = function(){
  var price = 9 + this.sizeCost() + this.isDelivery() + this.frillsCost();
  return "$" + price.toFixed(2);
}

// EXAMPLE

Pizza.prototype.frillsCost = function(){ let frillsPrice = 0; console.log(this.frillsArray); for(i=0; i<=this.frillsArray.length -1; i++) { frillsPrice += parseFloat(this.frillsArray[i]); } return frillsPrice;
}

Pizza.prototype.pizzaCost = function(){ var price = 9 + this.sizeCost() + this.isDelivery() + this.frillsCost(); return "$" + price.toFixed(2);
}

var nameWarning = function() {
  $("#name-warning").show();
  $("#state-warning").hide();
  $("#city-warning").hide();
  $("#street-warning").hide();
  $("#vector-warning").hide();
  $("#size-warning").hide();
}

var sizeWarning = function() {
  $("#size-warning").show();
  $("#name-warning").hide();
  $("#state-warning").hide();
  $("#city-warning").hide();
  $("#street-warning").hide();
  $("#vector-warning").hide();
}

var vectorWarning = function() {
  $("#vector-warning").show();
  $("#name-warning").hide();
  $("#state-warning").hide();
  $("#city-warning").hide();
  $("#street-warning").hide();
  $("#size-warning").hide();
}

// warning functions to preprocess and save ui space
var streetWarning = function() {
  $("#street-warning").show();
  $("#name-warning").hide();
  $("#state-warning").hide();
  $("#city-warning").hide();
  $("#vector-warning").hide();
  $("#size-warning").hide();
}

var cityWarning = function() {
  $("#city-warning").show();
  $("#name-warning").hide();
  $("#state-warning").hide();
  $("#street-warning").hide();
  $("#vector-warning").hide();
  $("#size-warning").hide();
}

var stateWarning = function() {
  $("#state-warning").show();
  $("#name-warning").hide();
  $("#city-warning").hide();
  $("#street-warning").hide();
  $("#vector-warning").hide();
  $("#size-warning").hide();
}

var resultHideAddress = function() {
  $(".result").show();
  $(".home-page").hide();
  $(".address-result").hide();
  $("#name-warning").hide();
  $("#state-warning").hide();
  $("#city-warning").hide();
  $("#street-warning").hide();
  $("#vector-warning").hide();
  $("#size-warning").hide();
}

var showResult = function() {
  $(".result").show();
  $(".home-page").hide();
  $("#state-warning").hide();
  $("#city-warning").hide();
  $("#street-warning").hide();
  $("#vector-warning").hide();
  $("#size-warning").hide();
}

// UI LOGIC
$(function(){
  // shows address inputs upon delivery vector selection
  $("#vector").change(function() {
    if ($("#vector").val() === "delivery") {
      $("#address").show();
    } else {
      $("#address").hide();
    }
  });



  // MULTIPLE PIES?!?!
  $("#another-pie").click(function(){
    $(".new-pie").append('<div class="new-pie">'+
                            '<div class="form-group">' +
                              '<label for="size-label">Size:</label>' +
                              '<span id="size-warning">Please choose a'+    'pizza size</span>' +
                              '<select class="form-control" id="sizes">'+
                                '<option>Choose your pizza size</option>'+
                                '<option id="small" value="small">Small- 10"'+
                                ' $9.00</option>'+
                                '<option id="medium" value="medium">Medium-'+
                                ' 14" $11.00</option>' +
                                '<option id="large" value="large">Large- 18"'+
                                ' $13.00</option>'+
                              '</select>'+
                            '</div>'+
                            '<div id="frills" class="form-group">'+
                              '<label for="show-label">Unnecessary' +  'Frills:</label><br>'+
                              '<input type="checkbox" name="frills"'+ 'value="1.5"> pepperoni $1.50<br>'+
                              '<input type="checkbox" name="frills"'+ 'value="1.5"> sausage $1.50<br>'+
                              '<input type="checkbox" name="frills"'+ 'value="1.5"> bacon $1.50<br>'+
                              '<input type="checkbox" name="frills"'+ 'value="0.75"> mushrooms $0.75<br>'+
                              '<input type="checkbox" name="frills"'+ 'value="0.75"> olives $0.75<br>'+
                              '<input type="checkbox" name="frills"'+ 'value="0.75"> arugula $0.75<br>'+
                              '<input type="checkbox" name="frills"'+ 'value="0.75"> basil $0.75<br>'+
                            '</div>'+
                          '</div>');
  });
// PLACE ORDER SUBMISSION
  $("#mainForm").submit(function(e){
    e.preventDefault();
    var name = $("#name").val();
    var size = $("#sizes").val();
    var vector = $("#vector").val();
    var street = $("#street").val();
    var city = $("#city").val();
    var state = $("#state").val();
    var newCustomer = new Customer(name);
    var pizza = new Pizza(size, vector);
    var newAddress = new Address(street, city, state)

// attempt to loop through the pies to grab correct values for each additional pie
    $(".new-pie").each(function(){
      var size = $(this).find("#sizes").val();
      $("input:checkbox[name=frills]:checked").each(function(){
        let inputFrills = parseFloat($(this).val());
        pizza.frillsArray.push(inputFrills);
      });
      newCustomer.address.push(newAddress);
      console.log(newCustomer.address);
    })

    // user input warnings and address display upon order submission
    if (newCustomer.name === "") {
      nameWarning(newCustomer.name);
    } else if (size === "Choose your pizza size") {
      sizeWarning(size);
    } else if (vector === "Choose an option") {
      vectorWarning(vector);
    } else if ((vector === "delivery") && (street === "")) {
      streetWarning(street);
    } else if ((vector === "delivery") && (city === "")) {
      cityWarning(city);
    } else if ((vector === "delivery") && (state === "")) {
      stateWarning(state);
    } else if (vector === "pick-up") {
      resultHideAddress(vector);
    } else {
      showResult();
    }

  // DISPLAY ORDER INFORMATION
    let totalCost = pizza.pizzaCost(pizza.size, pizza.vector, pizza.frillsArray);
    $("#name-result").html(`<strong>${newCustomer.name}</strong>`);
    $("#size-result").text(size);
    $("#price-result").text(totalCost);
    $("#vector-result").text(vector);
    $("#street-result").text(newCustomer.address[0].street);
    $("#city-result").text(newCustomer.address[0].city);
    $("#state-result").text(newCustomer.address[0].state);
  });
});
