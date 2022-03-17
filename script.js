const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// SIZE OF CANVAS
canvas.width = innerWidth
canvas.height = innerHeight

// CANNON
class Cannon {

    constructor() {
        this.speed = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src = 'assets/img/cannon-small.png'
        image.onload = () => {
            const scale = 0.50
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height

        )

    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.speed.x
        }
    }

    move() {
        if (keys.ArrowLeft.pressed && cannon.position.x >= 0) {
            cannon.speed.x = -7
        }
        else if (keys.ArrowRight.pressed && cannon.position.x + cannon.width <= canvas.width) {
            cannon.speed.x = 7
        }
        else {
            cannon.speed.x = 0
        }
    }

}

// PROJECTILES
class Projectile {

    constructor() {
        this.position = {
            x: cannon.position.x + cannon.width / 2,
            y: cannon.position.y
        }
        this.speed = {
            x: 0,
            y: -10
        }
        this.radius = 5
    }

    draw() {
        ctx.beginPath()
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'black'
        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.speed.x
        this.position.y += this.speed.y
    }

}

// TARGET
class PiouPiou {

    constructor() {
        this.speed = {
            x: 3,
            y: 0
        }

        const image = new Image()
        image.src = 'assets/img/pioupiou.png'
        image.onload = () => {
            const scale = 0.08
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: 0,
                y: Math.floor(Math.random() * canvas.height / 2)
            }
        }
    }

    draw() {
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height

        )

    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.speed.x
        }
    }

    move() {
        if (this.image)
            if (this.position.x - this.width > canvas.width || this.position.x + this.width < 0) {
                this.speed.x = - this.speed.x
            }
    }

}

// GAME

// VARIABLES
const cannon = new Cannon()
const projectiles = []
const pioupious = []
pioupious.push(new PiouPiou())

const keys = {
    ArrowLeft: {
        pressed: false
    },
    ArrowRight: {
        pressed: false
    },
    space: {
        pressed: false
    },
    Enter: {
        pressed: false
    }
}

// ANIMATE

function animate() {

    requestAnimationFrame(animate)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Cannon
    cannon.update()
    cannon.move()

    // Create projectile
    if (keys.space.pressed) {
        projectiles.push(new Projectile())
    }

    // Shoot projectile and clear
    projectiles.forEach((projectile, index) => {
        if (projectile.position.y + projectile.radius <= 0) {
            projectiles.splice(index, 1)
        } else {
            projectile.update()
        }
    })

    // Target
    pioupious.forEach((pioupiou, j) => {
        pioupiou.update()
        pioupiou.move()
    })

    // Collision
    projectiles.forEach((projectile, i, pioupiou, j) => {
        if (projectile.position.y - projectile.radius <= pioupiou.position.y + pioupiou.height) {
            projectiles.splice(i, 1)
            pioupious.splice(j, 1)
        }

    })
}

animate()

// EventListener keys
addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            break
        case ' ':
            keys.space.pressed = true
            break
    }
})

addEventListener('keyup', ({ key }) => {
    switch (key) {
        case 'ArrowLeft':
            // console.log('left')
            keys.ArrowLeft.pressed = false
            break
        case 'ArrowRight':
            // console.log('right')
            keys.ArrowRight.pressed = false
            break
        case ' ':
            // console.log('space')
            keys.space.pressed = false
            break
    }
})