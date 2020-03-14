const field = document.querySelector('.box')
const cellCount = 100
const hitTime = 500
let direction = 'right'
let transform = 0
let x = 1
let y = 1
let tank
let fire

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

function setNewTankCoord(coord, x, y) {
  let newTankCoord = field.querySelector('[posX="' + (+coord[0] + x) + '"][posY="' + (+coord[1] + y) + '"]')

  if (newTankCoord.classList.contains('fire') || newTankCoord.classList.contains('enemy')) {
    return
  }

  delTank()
  tank = newTankCoord
  setTank()
}

function tankMove() {
  let tankCoord = [tank.getAttribute('posX'), tank.getAttribute('posY')]

  if (direction === 'left') {
    if (tankCoord[0] > 1) {
      setNewTankCoord(tankCoord, -1, 0)
    }
  } else if (direction === 'right') {
    if (tankCoord[0] < 10) {
      setNewTankCoord(tankCoord, 1, 0)
    }
  } else if (direction === 'up') {
    if (tankCoord[1] > 1) {
      setNewTankCoord(tankCoord, 0, -1)
    }
  } else if (direction === 'down') {
    if (tankCoord[1] < 10) {
      setNewTankCoord(tankCoord, 0, 1)
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

function delFire(coord) {
  let fireItem = field.querySelector('[posX="' + (+coord[0]) + '"][posY="' + (+coord[1]) + '"]')
  fireItem ? fireItem.classList.remove('fire') : null
}

function setFire() {
  fire ? fire.classList.add('fire') : null
}

function setCoordFire(coord, x, y) {
  delFire(coord)
  fire = field.querySelector('[posX="' + (+coord[0] + x) + '"][posY="' + (+coord[1] + y) + '"]')
  setFire()
}

function newCoordFire(currentCoord, x, y) {
  setCoordFire(currentCoord, x, y)
  currentCoord[0] = +currentCoord[0] + x
  currentCoord[1] = +currentCoord[1] + y
}

function fireRight(coord) {
  let interval = setInterval(function () {
    if (coord[0] < 10) {
      newCoordFire(coord, 1, 0)
    } else {
      clearInterval(interval)
      delFire([10, coord[1]])
    }
  }, hitTime)
}

function fireLeft(coord) {
  let interval = setInterval(function () {
    if (coord[0] > 1) {
      newCoordFire(coord, -1, 0)
    } else {
      clearInterval(interval)
      delFire([1, coord[1]])
    }
  }, hitTime)
}

function fireUp(coord) {
  let interval = setInterval(function () {
    if (coord[1] > 1) {
      newCoordFire(coord, 0, -1)
    } else {
      clearInterval(interval)
      delFire([coord[0], 1])
    }
  }, hitTime)
}

function fireDown(coord) {
  let interval = setInterval(function () {
    if (coord[1] < 10) {
      newCoordFire(coord, 0, 1)
    } else {
      clearInterval(interval)
      delFire([coord[0], 10])
    }
  }, hitTime)
}

function hit() {
  document.addEventListener('keydown', function (evt) {
    if (evt.keyCode === 32) {
      let currentCoord = [tank.getAttribute('posX'), tank.getAttribute('posY')]

      if (direction === 'right') {
        fireRight(currentCoord)
      } else if (direction === 'left') {
        fireLeft(currentCoord)
      } else if (direction === 'up') {
        fireUp(currentCoord)
      } else if (direction === 'down') {
        fireDown(currentCoord)
      }
    }
  })
}

function getRandomCoord() {
  return Math.floor(Math.random() * 9) + 1
}

function getEnemyCoord() {
  let enemyCoord = []
  enemyCoord[0] = getRandomCoord()
  enemyCoord[1] = getRandomCoord()

  return enemyCoord
}

function enemyCoordValidity(enemyCoord) {
  let enemy = field.querySelector('[posX="' + (+enemyCoord[0]) + '"][posY="' + (+enemyCoord[1]) + '"]')
  if (enemy.classList.contains('enemy') || enemy.classList.contains('tank')) {
    return false
  } 

  return true
}

function setEnemy() {
  let validity = false
  let enemyCoords = []

  while (!validity) {
    enemyCoords = getEnemyCoord()
    validity = enemyCoordValidity(enemyCoords)
  }
  
  let enemy = field.querySelector('[posX="' + (+enemyCoords[0]) + '"][posY="' + (+enemyCoords[1]) + '"]')
  enemy.classList.add('enemy')
}

function init() {
  createField()
  createTank(5, 5)
  tankControl()
  hit()
  setEnemy()
  setEnemy()
  setEnemy()
}

init()