/**
 *   @author Scanpay ApS.
 *   @version 1.0
 *   A tiny browser client for the Scanpay Payment Link API.
 */

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
          quantity: 1,
          total: "99.95 DKK",
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
