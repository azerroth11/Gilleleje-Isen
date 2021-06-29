let strict

const iceOrder = document.querySelector("#ice-order")
const priceH1 = document.querySelector(".priceH1")
const size = document.querySelector("#size")
const isCard = document.querySelector(".is-card")
const sizeCard = document.querySelector(".size-card")
const basketCard = document.querySelector(".basket-card")
const cart = document.querySelector(".shop")
const add = document.querySelector("#add")
const mediumBasketList = document.querySelector(".medium-basket-list")
const largeBasketList = document.querySelector(".large-basket-list")
const btnCheckout = document.createElement("a")
const mediumBasket = document.querySelector(".medium-basket")
const largeBasket = document.querySelector(".large-basket")
const emptyBasket = document.querySelector(".empty-basket")
const formCard = document.querySelector(".form-card")

iceOrder.addEventListener("click", e => {
  isCard.classList.toggle("hidden")
  sizeCard.classList.toggle("hidden")
})

// WIP Form card
btnCheckout.addEventListener("click", e => {
  basketCard.classList.add("hidden")
  formCard.classList.remove("hidden")
  // sessionStorage.setItem("total", `${totalPrice.value}`)
})

// Display correct number of tastes options
size.addEventListener("input", e => {
  const choice1 = document.querySelector("#choice1")
  const choice2 = document.querySelector("#choice2")
  const choice3 = document.querySelector("#choice3")
  const choice4 = document.querySelector("#choice4")
  const choice5 = document.querySelector("#choice5")
  if (size.value == "medium") {
    priceH1.innerText = "DKK 89"
    choice1.classList.remove("hidden")
    choice2.classList.remove("hidden")
    choice3.classList.remove("hidden")
    choice4.classList.add("hidden")
    choice5.classList.add("hidden")
  } else if (size.value == "large") {
    priceH1.innerText = "DKK 152"
    choice1.classList.remove("hidden")
    choice2.classList.remove("hidden")
    choice3.classList.remove("hidden")
    choice4.classList.remove("hidden")
    choice5.classList.remove("hidden")
  } else {
    priceH1.innerText = ""
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

init()

// Reset form after submit
function resetForm() {
  const smagvariant = document.querySelectorAll(".select")
  const select = Array.from(smagvariant)
  select.forEach(e => {
    e.value = "undefined"
  })
  priceH1.innerText = ""
}

// Event Listeners
add.addEventListener("click", e => {
  const list = [
    (smagvariant1 = document.querySelector("#smagsvariant1").value),
    (smagvariant2 = document.querySelector("#smagsvariant2").value),
    (smagvariant3 = document.querySelector("#smagsvariant3").value),
    (smagvariant4 = document.querySelector("#smagsvariant4").value),
    (smagvariant5 = document.querySelector("#smagsvariant5").value),
  ]
  filterundefined(list)
  if (size.value == "medium" && filteredList.length != 0) {
    addMediumItemToList()
    updatePrice(btnCheckout)
    resetForm()
  } else if (size.value == "large" && filteredList.length != 0) {
    addLargeItemToList()
    updatePrice(btnCheckout)
    resetForm()
  } else {
    alert("You must pick a size and taste")
  }
})

cart.addEventListener("click", e => {
  isCard.classList.add("hidden")
  sizeCard.classList.add("hidden")
  basketCard.classList.remove("hidden")
})

function addMediumItemToList() {
  const mediumBasketul = document.createElement("ul")
  mediumBasketList.appendChild(mediumBasketul)
  mediumBasketul.classList.add("basket-list-items")
  createRemoveBtn()
  mediumBasketul.appendChild(removeBtn)
  filteredList.forEach(e => {
    const listItems = document.createElement("li")
    mediumBasketul.appendChild(listItems)
    listItems.appendChild(document.createTextNode(e))
  })
  mediumBasket.insertAdjacentElement("afterend", mediumBasketList)
  mediumBasket.classList.remove("hidden")
  emptyBasket.classList.add("hidden")
}

function addLargeItemToList() {
  const largeBasketul = document.createElement("ul")
  largeBasketList.appendChild(largeBasketul)
  largeBasketul.classList.add("basket-list-items")
  createRemoveBtn()
  largeBasketul.appendChild(removeBtn)
  filteredList.forEach(e => {
    const listItems = document.createElement("li")
    largeBasketul.appendChild(listItems)
    listItems.appendChild(document.createTextNode(e))
  })
  largeBasket.insertAdjacentElement("afterend", largeBasketList)
  largeBasket.classList.remove("hidden")
  emptyBasket.classList.add("hidden")
}

// Price Update
function updatePrice(btnCheckout) {
  const mediumIcePrice = 89
  const largeIcePrice = 152
  const mediumPrice = mediumBasketList.childElementCount * mediumIcePrice
  const largePrice = largeBasketList.childElementCount * largeIcePrice
  const totalPrice = mediumPrice + largePrice
  let itemCount =
    mediumBasketList.childElementCount + largeBasketList.childElementCount
  const itemCountEl = document.querySelector("#itemCount")
  itemCountEl.textContent = " " + itemCount
  btnCheckout.innerHTML = `Checkout: ${totalPrice} dkk`
  emptyItemList(mediumBasket, largeBasket, emptyBasket, btnCheckout)
  return { totalPrice }
}

// Visibility of items in cart
function emptyItemList(mediumBasket, largeBasket, emptyBasket, btnCheckout) {
  if (mediumBasketList.childElementCount == 0) {
    mediumBasket.classList.add("hidden")
  }
  if (largeBasketList.childElementCount == 0) {
    largeBasket.classList.add("hidden")
  }
  if (
    mediumBasketList.childElementCount == 0 &&
    largeBasketList.childElementCount == 0
  ) {
    emptyBasket.classList.remove("hidden")
    btnCheckout.classList.add("hidden")
  } else {
    emptyBasket.classList.add("hidden")
    btnCheckout.classList.remove("hidden")
  }
}

function filterundefined(list) {
  filteredList = list.filter(e => e != "undefined")
}

// Remove Button
function createRemoveBtn() {
  removeBtn = document.createElement("i")
  removeBtn.classList.add("fas", "fa-minus-circle")
  removeBtnArr = []
  removeBtnArr.push(removeBtn)
  removeBtnArr.forEach(removeBtn => {
    removeBtn.addEventListener("click", e => {
      removeBtn.parentNode.remove()
      removeBtn.remove(e)
      updatePrice(btnCheckout)
    })
  })
}

// Init parameters
function init() {
  const h = document.createElement("H2")
  const t = document.createTextNode("")
  const btnBack = document.createElement("a")
  btnBack.setAttribute("id", "btn-back")
  btnBack.innerHTML = "Add more!"
  btnBack.classList.add("start")
  btnCheckout.setAttribute("id", "btnCheckout")
  btnCheckout.classList.add("start")
  basketCard.appendChild(h)
  basketCard.appendChild(btnBack)
  basketCard.appendChild(btnCheckout)
}

const btnBack = document.querySelector("#btn-back")
btnBack.addEventListener("click", e => {
  basketCard.classList.add("hidden")
  sizeCard.classList.remove("hidden")
})

// Payment
document.getElementById("pay").addEventListener("click", () => {
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
      items: [
        {
          name: "750ml: Vanilje, Chokolade, Lakrids",
          quantity: 2,
          total: "89 DKK",
          sku: "7vcl",
        },
        {
          name: "1500ml: Kaffe, Vanilje, Chokolade, Lakrids, Kaffe",
          quantity: 1,
          total: "152 DKK",
          sku: "15kvclk",
        },
      ],
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
})
