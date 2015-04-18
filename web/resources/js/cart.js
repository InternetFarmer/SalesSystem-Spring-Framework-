$(function() {
    cart();

    $(".addbutton").on("click", function() {
        var product_id = $(this).attr("data-id");
        var amount_box = $("amount_box_" + product_id);

        var amount = amount_box.val();
        amount++;
        amount_box.attr("value", amount);
    });

    $('.minusbutton').on("click", function() {

    });
});

function cart() {
    var bag = JSON.parse(sessionStorage.getItem("bag"));
    var tbady = document.getElementById("shoppingbagarea");
    if (bag !== null) {
        for (var i = 0; i < bag.length; i++) {
            var p = bag[i];
            tbady.insertAdjacentHTML("beforeend", "<tr id='product_" + p.product_id + "'><td>" + p.product_id + "</td><td>" + p.product_name + "</td><td>" + p.price + "</td><td>" + p.category.category_name + "</td><td>" +
                "<input type='button' value='-' class='minusbutton' data-id='" + p.product_id + "'/>" +
                "<input id='amount_box_" + p.product_id + "' type='text' value='1' size='1px'/>" +
                "<input type='button' class='addbutton' value='+' data-id='" + p.product_id + "'/>" +
                "</td><td><button type='button' class='deletebutton btn btn-primary btn-sm' onclick='removeProduct(" + p.product_id + ")'>" +
                "<span class='glyphicon glyphicon-remove'></span></button></td></tr>");
        }
    }
    total_amount();
}

function removeProduct(id) {
    var bag = JSON.parse(sessionStorage.getItem("bag"));
    for (var i = 0; i < bag.length; i++) {
        var p = bag[i];
        if (p.product_id == id) {
            bag.splice(i, 1);
            var pr = $("#product_" + id);
            pr.parentNode.removeChild(pr);
        }
    }
    sessionStorage.setItem("bag", JSON.stringify(bag));
    calculateTotalMoney();
}

function total_amount() {
    var cart = JSON.parse(sessionStorage.getItem("bag"));
    var total = 0;
    //alert(1);
    for (var i = 0; i < cart.length; i++) {
        var product = cart[i];
        var amount = $("#amount_box_" + product.product_id).value;
        total += product.price * amount;
    }
    var totalDisplay = $("#totle_money");
    totalDisplay.value = total;
}