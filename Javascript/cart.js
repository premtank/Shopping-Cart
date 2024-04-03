//Shopping Cart start 

let label = document.getElementById("label");

let shoppingCart = document.getElementById("shopping-cart");

// to parse the data of string type to back object and get it from local storage  
let basket = JSON.parse(localStorage.getItem("shop-data")) || [];

console.log(basket);

let calculation = () => {

    let cartItem = document.getElementById("Cart-amt");

    let search = (basket.map((x) => x.item)).reduce((x, y) => x + y, 0);

    cartItem.innerHTML = search;
};
calculation();

// function to generate cart items

let generateCartItems = () => {

    if (basket.length !== 0) {

        return shoppingCart.innerHTML = (basket
            .map((x) => {
                let { id, item } = x;

                let search = shopCardData.find((y) => y.id === id) || [];

                return `
                <div class="cart-item">
                    <img src="${search.img}" alt="Buy" width="100">
                    <div>
                        <div class="title-price-x">
                            <h4 class="title-price">
                                <p>${search.name}</p>
                                <p class="price-badge">$${search.price}</p>
                            </h4>
                            <i onclick="removeItem(${id})" class="bi bi-x-circle"></i>
                        </div>
                    <div class="buttons">
                        <i onclick="minus(${id})" class="bi bi-dash-lg"></i>
                        <div id="${id}" class="quantity">${item}</div>
                        <i onclick="plus(${id})" class="bi bi-plus-lg icon-shop"></i>
                    </div>
                    <h3 class="individual-total-price">$${item * search.price}</h3>
                    </div>
                </div>`;

            }).join(""))
    }
    else {

        shoppingCart.innerHTML = ``;

        label.innerHTML = `
        <h2>Cart is empty</h2>
        <a href="index.html">
            <button class="homeBtn">Back to home</button>
        </a>
        `

    }
}
generateCartItems();

// Quantity increament and decreament functions on card

// Quantity increament in card

let plus = (id) => {
    let selectedId = id;
    let search = basket.find((x) => x.id === selectedId.id);

    if (search === undefined) {
        basket.push({
            id: selectedId.id,
            item: 1,
        });
    }
    else {
        search.item += 1;
    }

    localStorage.setItem("shop-data", JSON.stringify(basket));
    generateCartItems();
    update(selectedId.id);
};

// Quantity decreament in card

let minus = (id) => {
    let selectedId = id;
    let search = basket.find((x) => x.id === selectedId.id);

    if (search === undefined || search.item === 0) return;
    else {
        search.item -= 1;
    }
    update(selectedId.id);
    basket = basket.filter((x) => x.item !== 0)
    generateCartItems();
    localStorage.setItem("shop-data", JSON.stringify(basket));
};

// Quantity update in card 

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
    totalAmount();
};

// Remove cart with x

let removeItem = (id) => {
    let selectedItem = id;
    basket = basket.filter((x) => x.id !== selectedItem.id);
    generateCartItems();
    totalAmount();  
    calculation();
    localStorage.setItem("shop-data", JSON.stringify(basket));
}

// Total amount

let totalAmount = () => {
    if (basket.length !== 0) {
        let amount = basket
            .map((x) => {
                let { id, item } = x;

                let search = shopCardData.find((y) => y.id === id) || [];

                return item * search.price;

            }).reduce((x, y) => x + y, 0);
        label.innerHTML = `
        <h2 class="totalbill">Total Bill : $${amount}</h2>
        <button onclick="checkOut()" class="checkout">Checkout</button>
        <button onclick="clearCart()" class="removeall">Clear Cart</button>
        `;
    }
    else return;
}
totalAmount();

// clear cart

let clearCart = ()=>{
    basket=[];
    generateCartItems();
    calculation();
    localStorage.setItem("shop-data", JSON.stringify(basket));
}
// End Shopping Cart 