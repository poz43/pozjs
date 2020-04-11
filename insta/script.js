let bodyEl = document.querySelector(`body`)
let cardsEl = document.querySelector('.cards')
let countCards = 22

function createHeader() {
  return (`<header class="header">
            <div class="container">
              <h1 class="title">Фотокарточки</h1>
              <img src="img/logo.svg" alt="Лого" width="50">
            </div>
          </header>`)
}

function createCard(index, randomLikes, randomComments) {
  return (
    `<div class="card">
            <img src="photos/${index}.jpg" alt="">
            <div class="hover">
              <div class="hover__wrap">
                <div class="likes">${randomLikes}</div>
                <div class="comments">${randomComments}</div>
              </div>
            </div>
          </div>
`)
}

function getRandomNumber(min, max) {
  return Math.floor(min - 0.5 + Math.random() * (max - min + 1))
}

function generateCards() {
  for (let i = 0; i < countCards; i++) {
    let countLikes = getRandomNumber(20, 150)
    let countComments = getRandomNumber(3, 15)
    cardsEl.insertAdjacentHTML(`beforeEnd`, createCard(i + 1, countLikes, countComments))
  }
}



function init() {
  bodyEl.insertAdjacentHTML(`afterBegin`, createHeader())
  generateCards()
}

init()



















