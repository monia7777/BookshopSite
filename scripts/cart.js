function showCart() {
    var cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    var cartDiv = document.getElementById('cart-items-list');

    var suma = 0;

    cart.forEach(function (entry) {
        var divProduct = document.createElement('div');
        divProduct.classList.add('cart-item');

        var productName = null;
        var productPrice = 0;
        for (const category of data.categories) {
            for (const product of category.products) {
                if (product.id == entry.productID) {
                    productName = product.name;
                    productPrice = product.price;
                }
            }
        }
        productName = productName ? productName : entry.productID;

        divProduct.innerHTML = '<div class="cart-item-title">' + productName + '</div>';
        divProduct.innerHTML += '<div class="cart-item-price">' + productPrice + '</div>';
        divProduct.innerHTML += '<div class="cart-item-quantity">' + entry.quantity + '</div>';
        divProduct.innerHTML += `<div class="cart-item-button"><button class="cart-item-button" onclick="addToCart('` + entry.productID + `')">+</button></div>`
        divProduct.innerHTML += `<div class="cart-item-button"><button class="cart-item-button" onclick="removeFromCart('` + entry.productID + `')">-</button></div>`

        cartDiv.appendChild(divProduct);

        suma += productPrice * entry.quantity;
    });

    var totalDiv = document.getElementById("total-number");
    totalDiv.innerHTML = suma;
}

function checkout() {
    alert("obrisana košarica");
    var cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    refreshCart();
}

function refreshCart() {
    var cartDiv = document.getElementById('cart-items-list');
    cartDiv.innerHTML = ''; // Brišemo trenutni prikaz
    showCart(); // Ponovno prikazujemo stavke u košarici
    showNumberItemsInCart();
}

function addToCart(productID) {

    var cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    // Pronalazimo indeks stavke u košarici koju želimo promijeniti
    var index = cart.findIndex(function (entry) {
        return entry.productID === productID;
    });

    // Ako je Product već u košarici, povećavamo količinu za 1
    if (index !== -1) {
        cart[index].quantity++;
    }

    // Ažuriramo lokalno pohranjenu košaricu
    localStorage.setItem('cart', JSON.stringify(cart));

    refreshCart();

}

function removeFromCart(productID) {
    var cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    // Pronalazimo indeks stavke u košarici koju želimo promijeniti
    var index = cart.findIndex(function (entry) {
        return entry.productID === productID;
    });

    // Ako je Product već u košarici i količina nije 1, smanjujemo količinu za 1
    if (index !== -1 && cart[index].quantity >= 1) {
        cart[index].quantity--;
    }

    // Ako je količina 1 i korisnik pritisne "-", uklonimo stavku iz košarice
    if (index !== -1 && cart[index].quantity === 0) {
        cart.splice(index, 1);
    }

    // Ažuriramo lokalno pohranjenu košaricu
    localStorage.setItem('cart', JSON.stringify(cart));

    refreshCart();

}