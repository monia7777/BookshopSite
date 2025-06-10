function showNumberItemsInCart () {
    var cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    var total = 0;
    cart.forEach(function(entry) {
        total += entry.quantity;
    })

    var numberDiv = document.getElementById('cart-items');
    numberDiv.innerHTML = total;
}


function showTitle() {
    document.title = data.website;
}

function showDropdown() {
    var catList = document.getElementById("dropdown-content")
    data.categories.forEach(function(entry) {
        catList.innerHTML += '<a href="products.html#'+entry.name+'">'+entry.name+'</a>'
    })
}


document.addEventListener('DOMContentLoaded', function() {
    showNumberItemsInCart();
    showTitle();
    showDropdown();
})