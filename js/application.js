// calculate sub total price function
var subTotalPrice = function (element) {
  var qty = Number(element.val());
  var price = Number(element.closest('.col-xs-3').siblings('.item-price').text().slice(1));
  
  totalPrice = qty * price;
  return totalPrice;
}

var sum = function (sum, nums) {return sum + nums;};

// calculate total price function 
var allTotalPrice = function (elements) {
  var array = elements.map(function (index, element) {
    if (!Number.isNaN(Number($(element).text().slice(1)))) {
      return Number($(element).text().slice(1));
    }
  }).get();

  if (array.length) {
    return array.reduce(sum);
  } else {
    return 0;
  }
}

$(document).ready(function () {
  
  $(document).on('input','input[name=qty]', function () {
    // update sub total price
    var subTotal = subTotalPrice($(this));
    $(this).closest('.col-xs-3').siblings('.sub-total').text('$' + subTotal)
    // update total price
    var completeTotalPrice = allTotalPrice($('.sub-total'));
    $('#total-price #show-total-price').text('$' + completeTotalPrice)
  });
   
 
  // add new item
  $('#add-item .btn.add').on('click', function () {
    var name = $('#add-item input[type=text]').val();
    var price = $('#add-item input[type=number]').val();
    
    $('.container.main').prepend('<div class="row">' + 
    '<div class="col-xs-3">' + name + '</div>' + 
    '<div class="col-xs-3 item-price">' + '$' + price + '</div>' +
    '<div class="col-xs-3"><label><span>QTY </span><input type="number" name="qty"></label></div>' + 
    '<div class="col-xs-1 remove"><button class="btn btn-danger">Remove</button></div>' +
    '<div class="col-xs-1 sub-total">$--.--</div>' + 
    '</div>')
  })

  // remove an item
  $(document).on('click', '.remove button', function () {
    $(this).closest('.row').remove();
    var completeTotalPrice = allTotalPrice($('.sub-total'));
    $('#total-price #show-total-price').text('$' + completeTotalPrice)
  })
  
})