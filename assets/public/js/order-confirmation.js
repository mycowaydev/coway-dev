var orderList = JSON.parse(sessionStorage.order_submitted)

function setElementValue(element, value){
    if(value){
        $(element).append(value);
    }
}

setElementValue("#order_num", orderList._id);
setElementValue("#date", orderList.order_date);
setElementValue("#phone_no", orderList.phone_no);
setElementValue("#emergency_phone_no", orderList.emergency_no);
setElementValue("#email", orderList.email);
setElementValue("#first_line", orderList.address.first_line);
setElementValue("#second_line", orderList.address.second_line);
setElementValue("#third_line", orderList.address.third_line);
setElementValue("#city", orderList.address.city);
setElementValue("#postcode", orderList.address.postcode);
setElementValue("#state", orderList.address.state);
setElementValue("#country", orderList.address.country);

var orderProductItems = orderList.order_product;
$.each( orderProductItems , function( index, obj ){
    $('#product_list').append(
        "<tr>" +
            "<td><h5>" + obj.product_name + "</h5></td>" +
            "<td><p>" +  obj.quantity + "</p></td>" +
            "<td><p>" + obj.payment_type  + "</p></td>" +
            "<td><p>RM " + obj.payment + "</p></td>" +
        "</tr>"
    );
});

$('#product_list').append(
    "<tr>" +
         "<td><h4>Shipping</h4></td>" +
         "<td><h5></h5></td>" +
         "<td><h5></h5></td>" +
         "<td><p>Free</p></td>" +
     "</tr>"
);
