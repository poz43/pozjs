let bodyEl = document.querySelector(`body`)
let cardsEl = document.querySelector('.cards')
let countCards = 22
let deskrs = [
  `Как вам мой лук?`,
  `Красота фотографии не имеет границ`,
  `Настроение: "А я сядууу в кабриолет и уедууу куда-нибудь!.."`,
  `Это лучшее, что я видел за последнее время`,
  `Остаюсь верен традициям – субботнее фото`,
  `Сначала мы работали тяжело, а потом стали работать еще тяжелее`,
  `Дисциплина – выбор между тем, чего ты хочешь сейчас, и тем, чего ты хочешь больше всего в жизни`,
  `Вторник – день вкусняшек`,
  `Что это было?`,
  `Будь крутым или иди домой`
]
let cards = []

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
              <div class="hover__wrap" id="${index - 1}">
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

function createCards() {
  for (let i = 0; i < countCards; i++) {
    let card = {}
    card.likes = getRandomNumber(20, 150)
    card.comments = getRandomNumber(3, 15)
    card.deskr = deskrs[getRandomNumber(1, 9)]
    card.id = i
    cards.push(card)
  }
}

function insertCards() {
  for (let i = 0; i < cards.length; i++) {
    cardsEl.insertAdjacentHTML(`beforeEnd`, createCard(i + 1, cards[i].likes, cards[i].comments))
  }
}

let modal = document.querySelector('.modal-wrap')
let closeBtn = document.querySelector('.close')

document.addEventListener('click', function (evt) {
  if (evt.target.classList.contains('hover__wrap')) {
    let currentId = evt.target.getAttribute('id')

    let likes = modal.querySelector('.likes')
    let comments = modal.querySelector('.comments')
    let image = modal.querySelector('img')
    let deskr = modal.querySelector('p')

    image.src = `photos/${+currentId + 1}.jpg`
    likes.textContent = cards[currentId].likes
    comments.textContent = cards[currentId].comments
    deskr.textContent = cards[currentId].deskr

    modal.classList.add('open')

  }
});

closeBtn.addEventListener('click', function () {
  modal.classList.remove('open')
})

function init() {
  bodyEl.insertAdjacentHTML(`afterBegin`, createHeader())
  createCards()
  insertCards()
}

init()
