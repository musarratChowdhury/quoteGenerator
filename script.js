//
let apiQuotes;
let randomIndex;
//selector
const quote = document.querySelector("#quote");
const author = document.querySelector("#author");
const newQuoteBtn = document.querySelector(".new-quote");
const loader = document.querySelector(".loader");
const quoteContainer = document.querySelector(".quote-container");
//
//loader function
function loading() {
  loader.hidden = false;
  quoteContainer.style.display = "none";
}
//hide loader
function complete() {
  loader.hidden = true;
  quoteContainer.style.display = "block";
}
//

document.body.onload = function () {
  getQuotes();
};
//updating the DOM
function newQoute() {
  loading();
  quote.innerText = `${apiQuotes[randomIndex].text}`;
  !apiQuotes[randomIndex].author
    ? (author.innerText = "unknown")
    : (author.innerText = `${apiQuotes[randomIndex].author}`);
  apiQuotes[randomIndex].text.length >= 120
    ? quote.classList.add("long-quote")
    : quote.classList.remove("long-quote");

  complete();
}
//
async function getQuotes() {
  loading();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    randomIndex = getRandomNumber(0, apiQuotes.length);
    console.log(apiQuotes[randomIndex].text, randomIndex);
    newQoute();
  } catch (err) {
    //error gets here
  }
}
newQuoteBtn.addEventListener("click", () => {
  getQuotes();
});

setInterval(() => {
  getQuotes();
}, 10000);

//random number generator
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * max + min);
}
