let strict
// Cards
const isCard = document.querySelector(".is-card")
const sizeCard = document.querySelector(".size-card")
const basketCard = document.querySelector(".basket-card")
const formCard = document.querySelector(".form-card")

// Rest
const size = document.querySelector("#size")
const checkoutBtn = document.createElement("a")
const orderList = []

const cardsd = [isCard, sizeCard, basketCard, formCard]

init()

document.querySelector("#prevToShop").addEventListener("click", e => {
  isCard.classList.toggle("hidden")
  sizeCard.classList.toggle("hidden")
})

document.querySelector("#prevToBasket").addEventListener("click", e => {
  formCard.classList.toggle("hidden")
  basketCard.classList.toggle("hidden")
})

// Cards display
document.querySelector("#ice-order").addEventListener("click", e => {
  isCard.classList.toggle("hidden")
  sizeCard.classList.toggle("hidden")
  document.querySelector("#rentACounter").classList.toggle("hidden")
  document.querySelector("#visit").classList.toggle("hidden")
})

const addMoreBtn = document.querySelector("#btn-back")
addMoreBtn.addEventListener("click", e => {
  basketCard.classList.add("hidden")
  sizeCard.classList.remove("hidden")
})

document.querySelector("#shopping-cart").addEventListener("click", e => {
  isCard.classList.add("hidden")
  sizeCard.classList.add("hidden")
  basketCard.classList.remove("hidden")
  checkoutBtn.innerText = `Checkout: ${totalPrice()} dkk`
})

checkoutBtn.addEventListener("click", e => {
  basketCard.classList.add("hidden")
  formCard.classList.remove("hidden")
})

// Display correct number of tastes options
size.addEventListener("input", e => {
  const choice1 = document.querySelector("#choice1")
  const choice2 = document.querySelector("#choice2")
  const choice3 = document.querySelector("#choice3")
  const choice4 = document.querySelector("#choice4")
  const choice5 = document.querySelector("#choice5")
  if (size.value == "medium") {
    choice1.classList.remove("hidden")
    choice2.classList.remove("hidden")
    choice3.classList.remove("hidden")
    choice4.classList.add("hidden")
    choice5.classList.add("hidden")
  } else if (size.value == "large") {
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
document.addEventListener("click", e => {
  const smagvariant = document.querySelectorAll(".select")
  const select = Array.from(smagvariant)
  select.forEach(e => {
    if (e.value == "undefined") {
      e.classList.add("undefined")
    } else {
      e.classList.remove("undefined")
    }
  })
})

// Add to basket event
document.querySelector("#add").addEventListener("click", e => {
  const list = [
    (smagvariant1 = document.querySelector("#smagsvariant1").value),
    (smagvariant2 = document.querySelector("#smagsvariant2").value),
    (smagvariant3 = document.querySelector("#smagsvariant3").value),
    (smagvariant4 = document.querySelector("#smagsvariant4").value),
    (smagvariant5 = document.querySelector("#smagsvariant5").value),
  ]
  filterundefined(list)
  filteredList != "" && size.value != "undefined"
    ? orderList.push(
        new Order("Is ", iceQuantity(), Price(), Tastes(), SKU())
      ) + populateBasketLists()
    : alert("You must pick a size and taste")
  basketAmount()
  updateBasket()
  resetForm()
})

// Calculate the total price
function totalPrice() {
  i = 0
  orderList.forEach(e => (i += e.price))
  return i
}

// Object constructor
function Order(type, quantity, price, details, SKU) {
  this.type = type
  this.quantity = quantity
  this.price = price
  this.details = details
  this.SKU = SKU
}

function iceQuantity() {
  if (size.value == "medium") {
    return "750ml"
  } else if (size.value == "large") {
    return "1500ml"
  }
}

function Price() {
  if (size.value == "medium") {
    return 89
  } else if (size.value == "large") {
    return 152
  }
}

function filterundefined(list) {
  filteredList = list.filter(e => e != "undefined")
}

function Tastes() {
  return filteredList
}

function SKU() {
  return `Is${iceQuantity() == "750ml" ? "-M-" : "-L-"}${filteredList
    .map(el => el.slice(0, 3))
    .join("")}`
}

// Basket number
function basketAmount() {
  const cartItemCount = document.querySelector("#itemCount")
  cartItemCount.innerText = " " + orderList.length
}

function updateBasket() {
  const emptyBasket = document.querySelector(".empty-basket")
  const mediumBasket = document.querySelector(".medium-basket")
  const largeBasket = document.querySelector(".large-basket")
  orderList.length != 0
    ? emptyBasket.classList.add("hidden")
    : emptyBasket.classList.remove("hidden")
  showBasketLists(mediumBasket, largeBasket)
}

function showBasketLists(mediumBasket, largeBasket) {
  orderList.filter(obj => obj.quantity == "750ml").length == 0
    ? mediumBasket.classList.add("hidden")
    : mediumBasket.classList.remove("hidden"),
    orderList.filter(obj => obj.quantity == "1500ml").length == 0
      ? largeBasket.classList.add("hidden")
      : largeBasket.classList.remove("hidden")
}

function populateBasketLists() {
  const mediumBasketList = document.querySelector(".medium-basket-list")
  const largeBasketList = document.querySelector(".large-basket-list")
  if (orderList[orderList.length - 1].quantity == "750ml") {
    mediumBasketList.appendChild(document.createElement("ul"))
    mediumBasketList.lastChild.className = "basket-list"
    mediumBasketList.lastChild.setAttribute(
      "id",
      `${orderList[orderList.length - 1].SKU}`
    )
    createRemoveBtn()
    mediumBasketList.lastChild.appendChild(removeBtn)
    orderList[orderList.length - 1].details.forEach(e => {
      mediumBasketList.lastChild.appendChild(
        document.createElement("li")
      ).innerText = `${e}`
    })
  } else if (orderList[orderList.length - 1].quantity == "1500ml") {
    largeBasketList.appendChild(document.createElement("ul"))
    largeBasketList.lastChild.className = "basket-list"
    largeBasketList.lastChild.setAttribute(
      "id",
      `${orderList[orderList.length - 1].SKU}`
    )
    createRemoveBtn()
    largeBasketList.lastChild.appendChild(removeBtn)
    orderList[orderList.length - 1].details.forEach(e => {
      largeBasketList.lastChild.appendChild(
        document.createElement("li")
      ).innerText = `${e}`
    })
  } else {
    console.log("Something went wrong at populateBasketLists()")
  }
}

// Reset form after submit
function resetForm() {
  const smagvariant = document.querySelectorAll(".select")
  const select = Array.from(smagvariant)
  select.forEach(e => {
    e.value = "undefined"
  })
}

// Remove Button
function createRemoveBtn() {
  removeBtn = document.createElement("i")
  removeBtn.classList.add("fas", "fa-minus-circle")
  removeBtnArr = []
  removeBtnArr.push(removeBtn)
  removeBtnArr.forEach(removeBtn => {
    removeBtn.addEventListener("click", e => {
      const removeIndex = orderList
        .map(function (item) {
          return item.SKU
        })
        .indexOf(`${removeBtn.parentNode.id}`)
      orderList.splice(removeIndex, 1)
      removeBtn.parentNode.remove()
      removeBtn.remove(e)
      basketAmount()
      updateBasket()
      checkoutBtn.innerText = `Checkout: ${totalPrice()} dkk`
    })
  })
}

// Init parameters
function init() {
  const addMoreBtn = document.createElement("a")
  addMoreBtn.setAttribute("id", "btn-back")
  addMoreBtn.innerText = "Add more!"
  addMoreBtn.classList.add("button")
  checkoutBtn.classList.add("button")
  basketCard.appendChild(addMoreBtn)
  basketCard.appendChild(checkoutBtn)
}

// Order form
document.querySelector("#pay").addEventListener("click", e => {
  e.preventDefault()
  let person = {
    firstName: "",
    lastName: "",
    companyName: "",
    email: "",
    pickupDate: "",
  }
  person.firstName = document.querySelector("#fname").value
  person.lastName = document.querySelector("#lname").value
  person.companyName = document.querySelector("#company-name").value
  person.email = document.querySelector("#input-mail").value
  person.pickupDate = document.querySelector("#pickup-date").value
  if (
    document.querySelector("#fname").checkValidity() &&
    document.querySelector("#lname").checkValidity() &&
    document.querySelector("#input-mail").checkValidity() &&
    document.querySelector("#pickup-date").checkValidity()
  ) {
    // Pass totalPrice(), person, orderList to API
    payment()
  } else {
    alert("Make sure to complete all required fields")
  }
})

function payment() {
  const apikey =
    "4417:TFYlzvKYN5eAgehM7Oig+94MWl8Cv7ABdCQEBDQduBNxk0oEDw/dzY0Eh2ifnHuU"
  const successURL = "https://azerroth11.github.io/Gilleleje-Isen/success.html"
  const language = "da" // default is to use browser language

  fetch("https://api.test.scanpay.dk/v1/new", {
    method: "POST",
    headers: {
      Authorization: "Basic" + window.btoa(apikey),
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      successurl: "https://azerroth11.github.io/Gilleleje-Isen/success.html",
      language: "da", // default is 'auto', e.g. use browser language
      orderid: "1",
      items: orderList,
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

// [
//   {
//     name: "750ml: Vanilje, Chokolade, Lakrids",
//     quantity: 2,
//     total: "89 DKK",
//     sku: "7vcl",
//   },
//   {
//     name: "1500ml: Kaffe, Vanilje, Chokolade, Lakrids, Kaffe",
//     quantity: 1,
//     total: "152 DKK",
//     sku: "15kvclk",
//   },
// ]
