let strict

// Cards
const isCard = document.querySelector(".is-card")
const sizeCard = document.querySelector(".size-card")
const basketCard = document.querySelector(".basket-card")
const formCard = document.querySelector(".form-card")

// Rest
const checkoutBtn = document.createElement("a")
const shoppingCart = $("shopping-cart")
const orderList = []

let filteredList

function $(id) {
    return document.getElementById(id)
}

;(() => {
    // Init
    const btn = document.createElement("a")
    btn.setAttribute("id", "btn-back")
    btn.innerText = "Tilføj mere !"
    btn.classList.add("button")
    checkoutBtn.classList.add("button")
    basketCard.appendChild(btn)
    basketCard.appendChild(checkoutBtn)
})()

$("prevToShop").addEventListener("click", () => {
    isCard.classList.toggle("hidden")
    sizeCard.classList.toggle("hidden")
    $("rentACounter").classList.remove("hidden")
    $("visit").classList.remove("hidden")
})

$("prevToBasket").addEventListener("click", () => {
    formCard.classList.toggle("hidden")
    basketCard.classList.toggle("hidden")
})

// Cards display
$("ice-order").addEventListener("click", () => {
    isCard.classList.toggle("hidden")
    sizeCard.classList.toggle("hidden")
    $("rentACounter").classList.add("hidden")
    $("visit").classList.add("hidden")
})

$("btn-back").addEventListener("click", () => {
    basketCard.classList.add("hidden")
    sizeCard.classList.remove("hidden")
})

shoppingCart.addEventListener("click", () => {
    isCard.classList.add("hidden")
    sizeCard.classList.add("hidden")
    $("rentACounter").classList.add("hidden")
    $("visit").classList.add("hidden")
    basketCard.classList.remove("hidden")
})

checkoutBtn.addEventListener("click", () => {
    basketCard.classList.add("hidden")
    formCard.classList.remove("hidden")
})

const size = $("size")
// Display correct number of tastes options
size.addEventListener("input", () => {
    const choice1 = $("choice1")
    const choice2 = $("choice2")
    const choice3 = $("choice3")
    const choice4 = $("choice4")
    const choice5 = $("choice5")
    if (size.value === "medium") {
        choice1.classList.remove("hidden")
        choice2.classList.remove("hidden")
        choice3.classList.remove("hidden")
        choice4.classList.add("hidden")
        choice5.classList.add("hidden")
    } else if (size.value === "large") {
        choice1.classList.remove("hidden")
        choice2.classList.remove("hidden")
        choice3.classList.remove("hidden")
        choice4.classList.remove("hidden")
        choice5.classList.remove("hidden")
    } else {
        choice1.classList.add("hidden")
        choice2.classList.add("hidden")
        choice3.classList.add("hidden")
        choice4.classList.add("hidden")
        choice5.classList.add("hidden")
    }
})

// Adds border to undefined items
size.addEventListener("click", evt => {
    const smagVariant = document.querySelectorAll(".select")
    for (const elem of smagVariant) {
        if (elem.value === "undefined") {
            elem.classList.add("undefined")
        } else {
            elem.classList.remove("undefined")
        }
    }
})

// Add to basket event
$("add").addEventListener("click", e => {
    const list = [
        (smagvariant1 = $("smagsvariant1").value),
        (smagvariant2 = $("smagsvariant2").value),
        (smagvariant3 = $("smagsvariant3").value),
        (smagvariant4 = $("smagsvariant4").value),
        (smagvariant5 = $("smagsvariant5").value),
    ]
    filterUndefined(list)
    if (filteredList.length > 0 && size.value !== "undefined") {
        orderList.push(
            new Order({
                name: "Is ",
                quantity: iceQuantity(),
                price: Price(),
                tastes: Tastes(),
                SKU: SKU(),
            })
        )
        populateBasketLists()
        addedBanner()
    } else {
        alert("Du skal vælge størrelse og smag.")
    }
    cartItemCount()
    updateBasket()
    resetForm()
})

function addedBanner() {
    shoppingCart.appendChild(document.createElement("div"))
    shoppingCart.lastChild.className = "banner"
    document.querySelector(".banner").appendChild(document.createElement("p"))
    document.querySelector(".banner").firstChild.innerText =
        "Tilføjet til kurv !"
    setTimeout(() => document.querySelector(".banner").remove(), 3000)
}

// Calculate the total price
function totalPrice() {
    let i = 0
    orderList.forEach(item => (i += item.price))
    return i
}

// Object constructor
function Order(obj) {
    this.name = obj.name
    this.quantity = obj.quantity
    this.price = obj.price
    this.tastes = obj.tastes
    this.SKU = obj.SKU
}

function iceQuantity() {
    if (size.value === "medium") {
        return "750ml"
    } else if (size.value === "large") {
        return "1500ml"
    }
}

function Price() {
    if (size.value === "medium") {
        return 89
    } else if (size.value === "large") {
        return 152
    }
}

function filterUndefined(list) {
    filteredList = list.filter(e => e !== "undefined")
}

function Tastes() {
    return filteredList
}

function SKU() {
    return `Is${iceQuantity() === "750ml" ? "-M-" : "-L-"}${filteredList
        .map(el => el.slice(0, 3))
        .join("")}`
}

// Basket number
function cartItemCount() {
    const cartItemCount = $("itemCount")
    cartItemCount.innerText = " " + orderList.length
}

function updateBasket() {
    const emptyBasket = document.querySelector(".empty-basket")
    const mediumBasket = document.querySelector(".medium-basket")
    const largeBasket = document.querySelector(".large-basket")
    emptyBasket.classList.toggle("hidden", orderList.length != 0)
    checkoutBtn.innerText = `Checkout: ${totalPrice()} dkk`
    showBasketLists(mediumBasket, largeBasket)
}

function showBasketLists(mediumBasket, largeBasket) {
    orderList.filter(obj => obj.quantity === "750ml").length === 0
        ? mediumBasket.classList.add("hidden")
        : mediumBasket.classList.remove("hidden")
    orderList.filter(obj => obj.quantity == "1500ml").length == 0
        ? largeBasket.classList.add("hidden")
        : largeBasket.classList.remove("hidden")
}

function populateBasketLists() {
    let basketList
    if (orderList[orderList.length - 1].quantity === "750ml") {
        basketList = document.querySelector(".medium-basket-list")
    } else if (orderList[orderList.length - 1].quantity === "1500ml") {
        basketList = document.querySelector(".large-basket-list")
    } else {
        return alert("Something went wrong at populateBasketLists()")
    }
    basketList.appendChild(document.createElement("ul"))
    basketList.lastChild.className = "basket-list"
    basketList.lastChild.setAttribute(
        "id",
        `${orderList[orderList.length - 1].SKU}`
    )
    basketList.lastChild.appendChild(createRemoveBtn())
    orderList[orderList.length - 1].tastes.forEach(tastes => {
        basketList.lastChild.appendChild(
            document.createElement("li")
        ).innerText = `${tastes}`
    })
    cartItemCount()
    updateBasket()
}

// Reset form after submit
function resetForm() {
    const smagVariant = document.querySelectorAll(".select")
    for (const elem of smagVariant) {
        elem.value = "undefined"
    }
}

// Remove Button
function createRemoveBtn() {
    const removeBtn = document.createElement("i")
    removeBtn.classList.add("fas", "fa-minus-circle")
    removeBtn.addEventListener("click", () => {
        const removeIndex = orderList
            .map(item => item.SKU)
            .indexOf(`${removeBtn.parentNode.id}`)
        orderList.splice(removeIndex, 1)
        removeBtn.parentNode.remove()
        cartItemCount()
        updateBasket()
    })
    return removeBtn
}

// Order form
$("pay").addEventListener("click", evt => {
    evt.preventDefault()

    const person = {
        firstName: $("fname").value,
        lastName: $("lname").value,
        companyName: $("company-name").value,
        email: $("input-mail").value,
        pickupDate: $("pickup-date").value,
    }

    if (
        $("fname").checkValidity() &&
        $("lname").checkValidity() &&
        $("input-mail").checkValidity() &&
        $("pickup-date").checkValidity()
    ) {
        payment()
    } else {
        alert("Make sure to complete all required fields")
    }
})

function payment() {
    const apikey =
        "4417:TFYlzvKYN5eAgehM7Oig+94MWl8Cv7ABdCQEBDQduBNxk0oEDw/dzY0Eh2ifnHuU"
    const successURL =
        "https://azerroth11.github.io/Gilleleje-Isen/success.html"
    const language = "da" // default is to use browser language

    const newOrderList = []
    for (const obj of orderList) {
        let name = obj.quantity + ": "

        for (let i = 0; i < obj.tastes.length; i++) {
            name += obj.tastes[i]
            if (i < obj.tastes.length - 1) name += ", "
        }
        newOrderList.push({
            name: name,
            quantity: 1,
            total: obj.price + " DKK",
            sku: obj.SKU,
        })
    }

    fetch("https://api.test.scanpay.dk/v1/new", {
        method: "POST",
        headers: {
            Authorization: "Basic" + window.btoa(apikey),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            successurl:
                "https://azerroth11.github.io/Gilleleje-Isen/success.html",
            language: "da", // default is 'auto', e.g. use browser language
            orderid: "1",
            items: newOrderList,
        }),
    })
        .then(res => res.json())
        .then(o => {
            // https://developer.mozilla.org/en-US/docs/Web/API/Location/replace
            window.location.replace(o.url)
        })
        .catch(() => {
            alert(
                "Something went wrong. Please contact support to get a new payment link"
            )
        })
}