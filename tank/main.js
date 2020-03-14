let field = document.querySelector('.box')
let cellCount = 100
let x = 1
let y = 1
let tank
let direction = 'right'
let transform = 0
let fire;

function createField() {
  for (let i = 1; i <= cellCount; i++) {
    let cell = document.createElement('div')
    cell.classList.add('cell')
    field.insertAdjacentElement('afterbegin', cell)
  }

  let cells = field.querySelectorAll('.cell')

  for (let i = 0; i < cells.length; i++) {

    if (x > 10) {
      x = 1
      y++
    }

    cells[i].setAttribute('posX', x)
    cells[i].setAttribute('posY', y)

    x++
  }
}

function createTank(x, y) {
  tank = field.querySelector('[posX="' + x + '"][posY="' + y + '"]')
  tank.classList.add('tank')
}

function setTank() {
  tank.style.transform = 'rotate(' + transform + 'deg)'
  tank.classList.add('tank')
}

function delTank() {
  tank.style = ''
  tank.classList.remove('tank')
}

function setNewCoord(coord, x, y) {
  delTank()
  tank = field.querySelector('[posX="' + (+coord[0] + x) + '"][posY="' + (+coord[1] + y) + '"]')
  setTank()
}

function tankMove() {
  let tankCoord = [tank.getAttribute('posX'), tank.getAttribute('posY')]

  if (direction === 'left') {
    if (tankCoord[0] > 1) {
      setNewCoord(tankCoord, -1, 0)
    }
  } else if (direction === 'right') {
    if (tankCoord[0] < 10) {
      setNewCoord(tankCoord, 1, 0)
    }
  } else if (direction === 'up') {
    if (tankCoord[1] > 1) {
      setNewCoord(tankCoord, 0, -1)
    }
  } else if (direction === 'down') {
    if (tankCoord[1] < 10) {
      setNewCoord(tankCoord, 0, 1)
    }
  }
}

function tankControl() {
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 37) {
      direction = 'left'
      transform = 180
    } else if (evt.keyCode === 39) {
      direction = 'right'
      transform = 0
    } else if (evt.keyCode === 38) {
      direction = 'up'
      transform = 270
    } else if (evt.keyCode === 40) {
      direction = 'down'
      transform = 90
    } else {
      return
    }

    tankMove()
  })
}

function delFire() {
  fire = field.querySelector('.fire')
  fire ? fire.classList.remove('fire') : null
}

function setFire() {
  fire ? fire.classList.add('fire') : null
}

function setCoordFire(coord, x, y) {
  delFire()
  fire = field.querySelector('[posX="' + (+coord[0] + x) + '"][posY="' + (+coord[1] + y) + '"]')
  setFire()
}

function newCoordFire(currentCoord, x, y) {
  setCoordFire(currentCoord, x, y)
  currentCoord[0] = +currentCoord[0] + x
  currentCoord[1] = +currentCoord[1] + y
  console.log('asd')
}

function fireRight(coord) {
  let interval = setInterval(function () {
    if (coord[0] < 10) {
      newCoordFire(coord, 1, 0)
    } else {
      clearInterval(interval)
      delFire()
    }
  }, 500)
}

function fireLeft(coord) {
  let interval = setInterval(function () {
    if (coord[0] > 1) {
      newCoordFire(coord, -1, 0)
    } else {
      clearInterval(interval)
      delFire()
    }
  }, 500)
}

function fireUp(coord) {
  let interval = setInterval(function () {
    if (coord[1] > 1) {
      newCoordFire(coord, 0, -1)
    } else {
      clearInterval(interval)
      delFire()
    }
  }, 500)
}

function fireDown(coord) {
  let interval = setInterval(function () {
    if (coord[1] < 10) {
      newCoordFire(coord, 0, 1)
    } else {
      clearInterval(interval)
      delFire()
    }
  }, 500)
}

function hit() {
  document.addEventListener('click', function () {
    let currentCoord = [tank.getAttribute('posX'), tank.getAttribute('posY')]

    if (direction === 'right') {
      fireRight(currentCoord);
    } else if (direction === 'left') {
      fireLeft(currentCoord);
    } else if (direction === 'up') {
      fireUp(currentCoord);
    } else if (direction === 'down') {
      fireDown(currentCoord);
    }
  })
}

function init() {
  createField()
  createTank(5, 5)
  tankControl()
  hit()
}

init()
