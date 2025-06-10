document.addEventListener('DOMContentLoaded', function () {
    load_category_list();
    load_products();
})

function load_category_list() {
    var catList = document.getElementById("inventory-list")
    data.categories.forEach(function (entry) {
        catList.innerHTML += '<li><a href="#' + entry.name + '">' + entry.name + '</a></li>'
    })
}

function load_products() {
    var main = document.getElementById("main")

    let counter = 0;

    data.categories.forEach(function (entry) {
        counter++;
        var cat = document.createElement("section")
        cat.setAttribute("id", entry.name);
        cat.classList.add('inventory');
        if (counter % 2 == 1) { cat.classList.add('section'); }
        else { cat.classList.add('primary-color-bg'); }

        cat.innerHTML += `<div class="container"> 
                            <div class="centered-container">
                                <h1 class="decorated-title font-secondary main-color-emphasized category-title">`+ entry.name + `</h1>
                                <div class="separator"></div> 
                            </div> 
                        </div>`

        var products = document.createElement("div")
        products.classList.add('row');

        entry.products.forEach(function (product) {
            products.innerHTML += `<div class="column"> <div class="containerForOverlay">
                                    <img src="`+ product.image + `" alt="` + product.name + `"/>
                                    <div class="overlay">
                                        <button class="overlayButton" onclick="addProduct('`+ product.id + `');"><img src= "slike i ikone/216477_shhopping_cart_icon.png" alt="Cart icon"></button></div>
                                    </div>
                                    <h1 style="text-align: center"><span class="decorated-title font-secondary main-color">`+ product.name + `</span></h1>
                                    <h2 style="text-align: center"><span class="decorated-title font-secondary main-color">`+ product.price + `  ` + product.opis + `</span></h2>
                                </div>`
        })

        cat.appendChild(products);
        main.appendChild(cat);
    })
}

function addProduct(productID) {
    var productID = String(productID)
    var cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : [];

    // Provjera je li proizvod već u košarici
    var quantityProduct = 0;
    cart.forEach(function (entry) {
        if (entry.productID === productID) {
            entry.quantity++;
            quantityProduct = entry.quantity;
        }
    });

    // Ako proizvod nije u košarici, dodajte ga s količinom 1
    if (quantityProduct == 0) {
        cart.push({ productID: productID, quantity: 1 });
        quantityProduct = 1;
    }

    // Spremanje košarice u localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    //alert('Proizvod ' + productID + ' dodan u košaricu.');

    showNumberItemsInCart();
}