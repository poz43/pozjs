let colors = ['#CB356B', '#BD3F32', '#3A1C71', '#D76D77', '#283c86', '#45a247', '#8e44ad', '#155799', '#159957', '#000046', '#1CB5E0', '#2F80ED']

let $start = document.querySelector('#start');
let $game = document.querySelector('#game');

$start.addEventListener('click', startGame);

$game.addEventListener('click', function (evt) {
    if (evt.target.dataset.box) {
        renderBox();
    }
});

function startGame() {
    $start.classList.add('hide');
    $game.style.background = '#fff';

    renderBox();
}


function renderBox() {
    $game.innerHTML = '';
    let boxSize = getRandom(30, 100);
    let box = document.createElement('div');
    let gameSize = $game.getBoundingClientRect();
    let maxTop = gameSize.height - boxSize;
    let maxLeft = gameSize.width - boxSize;

    box.style.height = box.style.width = boxSize + 'px';
    box.style.background = colors[getRandom(0, colors.length)];
    box.style.position = 'absolute';
    box.style.top = getRandom(0, maxTop) + 'px';
    box.style.left = getRandom(0, maxLeft) + 'px';
    box.setAttribute('data-box', 'true');

    $game.insertAdjacentElement('afterbegin', box);
}


function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}
