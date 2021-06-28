let strict

const start = document.querySelector(".start")
const priceH1 = document.querySelector(".priceH1")
const size = document.querySelector("#size")
const isCard = document.querySelector(".is-card")
const sizeCard = document.querySelector(".size-card")
const basketCard = document.querySelector(".basket-card")
const cart = document.querySelector(".shop")
const add = document.querySelector("#add")
const mediumBasket = document.querySelector(".medium-basket")
const largeBasket = document.querySelector(".large-basket")

start.addEventListener("click", e => {
  isCard.classList.toggle("hidden")
  sizeCard.classList.toggle("hidden")
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

// Verify if != undefined
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
let { itemCount, h, totalPriceAmount, t } = init()

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
  const smagvariant1 = document.querySelector("#smagsvariant1").value
  const smagvariant2 = document.querySelector("#smagsvariant2").value
  const smagvariant3 = document.querySelector("#smagsvariant3").value
  const smagvariant4 = document.querySelector("#smagsvariant4").value
  const smagvariant5 = document.querySelector("#smagsvariant5").value
  let emptyBasket = document.querySelector(".list")
  const itemCountEl = document.querySelector("#itemCount")

  if (size.value == "medium" && smagvariant1 !== "undefined") {
    const list = [smagvariant1, smagvariant2, smagvariant3]
    const mediumPrice = 89
    itemCountFn(itemCountEl)
    itemListFn(emptyBasket, list)
    totalPrice(mediumPrice)
    mediumBasket.insertAdjacentElement("afterend", ulList)
    mediumBasket.classList.remove("hidden")
    resetForm()
  } else if (size.value == "large" && smagvariant1 !== "undefined") {
    const list = [
      smagvariant1,
      smagvariant2,
      smagvariant3,
      smagvariant4,
      smagvariant5,
    ]
    const largePrice = 152
    itemCountFn(itemCountEl)
    itemListFn(emptyBasket, list)
    largeBasket.insertAdjacentElement("afterend", ulList)
    totalPrice(largePrice)
    largeBasket.classList.remove("hidden")
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

// Functions
function itemListFn(emptyBasket, list) {
  emptyBasket.classList.add("hidden")
  ulList = document.createElement("li")
  filteredList = list.filter(e => e != "undefined")
  ulList.appendChild(document.createTextNode(filteredList.join(" and ")))
}

function itemCountFn(itemCountEl) {
  itemCount++
  itemCountEl.textContent = " " + itemCount
}

function init() {
  let itemCount = 0
  let totalPriceAmount = 0
  let h = document.createElement("H2")
  let t = document.createTextNode("")
  let btnBack = document.createElement("a")
  btnBack.setAttribute("id", "btn-back")
  btnBack.innerHTML = "Add more!"
  btnBack.classList.add("start")
  let btnForth = document.createElement("a")
  btnForth.setAttribute("href", "#")
  btnForth.innerHTML = "Proceed to checkout"
  btnForth.classList.add("start")
  basketCard.appendChild(h)
  basketCard.appendChild(btnBack)
  basketCard.appendChild(btnForth)
  return { itemCount, h, totalPriceAmount, t }
}

function totalPrice(price) {
  totalPriceAmount = totalPriceAmount + price
  t.textContent = "Total price: " + totalPriceAmount + "dkk"
  h.appendChild(t)
}

const btnBack = document.querySelector("#btn-back")
btnBack.addEventListener("click", e => {
  basketCard.classList.add("hidden")
  sizeCard.classList.remove("hidden")
})
