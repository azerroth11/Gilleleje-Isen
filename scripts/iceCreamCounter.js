// General
function $(id) {
    return document.getElementById(id)
}

// Vores is
const tastes = [
    "Vanilje",
    "Chokolade",
    "Koldskål",
    "Kæmpe Solbær",
    "Lakrids",
    "Citrontærte",
    "Saltkaramel",
    "Hasselnød",
    "Ægte pistacie",
    "Nougat",
    "Kaffe",
    "Kokos",
    "Mango-Passion",
    "Blodappelsin",
    "Jordbær-Rabarber",
]

;(() => {
    const iceCreamCounter = $("iceCreamCounter")
    tastes.forEach(e => {
        iceCreamCounter.appendChild(document.createElement("div"))
        const iceBox = iceCreamCounter.lastChild
        iceBox.className = "iceBox"
        iceBox.appendChild(document.createElement("img"))
        const iceBoxImg = iceBox.lastChild
        iceBoxImg.className = "iceBox-img"
        iceBoxImg.src = `./img/${e}-img.jpg`
        iceBox.appendChild(document.createElement("p"))
        iceBox.lastChild.className = "taste-name"
        iceBox.lastChild.innerText = `${e}`
        iceBox.appendChild(document.createElement("div"))
        iceBox.lastChild.className = "taste-name-foot"
        const iceBoxH1 = document.createElement("h1")
        iceBoxH1.classList.add("iceBoxH1", "hidden")
        iceBoxH1.innerText = `${iceBoxImg.nextSibling.innerText}`
        iceBox.appendChild(iceBoxH1)
        const iceBoxP = document.createElement("p")
        iceBoxP.classList.add("iceBoxP", "hidden")
        iceBoxP.innerText =
            "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Saepe vel at reiciendis iure possimus delectus nostrum debitis consectetur ipsum maiores nihil, distinctio quidem mollitia quis eius provident rerum sequi neque illo, nobis voluptatibus facere voluptate?"
        iceBox.appendChild(iceBoxP)

        iceBox.addEventListener("click", e => {
            Array.from(document.querySelectorAll(".iceBox")).forEach(e =>
                e.classList.toggle("hidden")
            )
            iceBoxH1.classList.toggle("hidden")
            iceBoxP.classList.toggle("hidden")
            createIceBox(e)
            iceBoxImg.nextSibling.classList.toggle("hidden")
            iceBoxImg.nextSibling.nextSibling.classList.toggle("hidden")
        })
    })
})()

function createIceBox(e) {
    const selectedParent = e.target.parentNode
    selectedParent.parentNode.classList.toggle("iceCreamCounter-active")
    selectedParent.classList.remove("hidden")
    selectedParent.classList.toggle("active-taste")
}
