// Shopping card main element

let shop = document.getElementById("shop");

// to parse the data of string type to back object and get it from local storage  
let basket = JSON.parse(localStorage.getItem("shop-data")) || [];

//Card generator function 
let generateCards = () => {
    return (shop.innerHTML = shopCardData.map((x) => {
        let { id, name, price, desc, img } = x;
        let search=basket.find((x)=>x.id===id) || [];
        return `<div id="card-id-${id}" class="items">
        <div class="image">
            <img src="${img}" alt="Buy" width="200">
        </div>
        <div class="details">
            <h3>${name}</h3>
            <p class="desc">${desc}</p>
            <div class="price-quantity">
                <h2>$${price}</h2>
                <div class="buttons">
                    <i onclick="minus(${id})" class="bi bi-dash-lg"></i>
                       <div id="${id}" class="quantity">${search.item===undefined?0:search.item}</div>
                    <i onclick="plus(${id})" class="bi bi-plus-lg icon-shop"></i>
                </div>
            </div>
        </div>
    </div>`;
    }).join(""));
};

generateCards();

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

    localStorage.setItem("shop-data",JSON.stringify(basket));
    // console.log(basket);
    update(selectedId.id);
};

// Quantity decreament in card

let minus = (id) => {
    let selectedId = id;
    let search = basket.find((x) => x.id === selectedId.id);

    if (search === undefined || search.item===0) return;
    else {
        search.item -= 1;
    }
    update(selectedId.id);
    basket=basket.filter((x)=>x.item !== 0) 
    localStorage.setItem("shop-data",JSON.stringify(basket));
    // console.log(basket);
};

// Quantity update in card 

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    document.getElementById(id).innerHTML = search.item;
    calculation();
};

// Total calculation on Cart icon

let calculation = () => {
    let cartItem = document.getElementById("Cart-amt");
    cartItem.style.display="flex";
    let search = (basket.map( (x) => x.item)).reduce((x,y) => x+y,0);
    if(search === 0)
    {
    cartItem.style.display="none";
    }
    else{
    cartItem.style.display="flex";
    }
    cartItem.innerHTML=search;    
};
calculation();
//End of Shopping card main element
