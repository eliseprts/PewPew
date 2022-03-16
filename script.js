const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// SIZE OF CANVAS
canvas.width = innerWidth
canvas.height = innerHeight

// CANNON
class Cannon {

    constructor() {
        this.velocity = {
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
            this.position.x += this.velocity.x
        }
    }

}

// PROJECTILES
class Projectile {

    constructor({ position, velocity }) {
        this.position = position
        this.velocity = velocity
        this.radius = 5
    }

    draw() {
        ctx.beginPath
        ctx.arc(this.position.x, this.position.y, this.radius, 0, Math.PI * 2)
        ctx.fillStyle = 'black'
        ctx.fill()
        ctx.closePath()
    }

    update() {
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }
}

// PIOUPIOU

class PiouPiou {

    constructor() {
        this.velocity = {
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
                x: 50,
                y: 50
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
            this.position.x += this.velocity.x
        }
    }

    move() {
        if (this.position.x + this.width > canvas.width || this.position.x - this.width < 0) {
            this.velocity.x = - this.velocity.x
        }
    }

}

// GAME
const cannon = new Cannon()
const projectiles = []
const pioupiou = new PiouPiou()

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

function animate() {

    requestAnimationFrame(animate)

    ctx.clearRect(0, 0, canvas.width, canvas.height)

    cannon.update()

    pioupiou.update()

    // PiouPiou round trip
    if (pioupiou.position.x - pioupiou.width > canvas.width || pioupiou.position.x + pioupiou.width < 0) {
        pioupiou.velocity.x = - pioupiou.velocity.x
    }

    // Clear projectiles
    projectiles.forEach((projectile, index) => {

        if (projectile.position.y + projectile.radius <= 0) {
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
        } else {
            projectile.update()
        }
    })

    if (keys.ArrowLeft.pressed && cannon.position.x >= 0) {
        cannon.velocity.x = -7
    }
    else if (keys.ArrowRight.pressed && cannon.position.x + cannon.width <= canvas.width) {
        cannon.velocity.x = 7
    }
    else {
        cannon.velocity.x = 0
    }
}

animate()


addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'ArrowLeft':
            keys.ArrowLeft.pressed = true
            break
        case 'ArrowRight':
            keys.ArrowRight.pressed = true
            break
        case ' ':
            // Shoot projectiles
            projectiles.push(new Projectile({
                position: {
                    x: cannon.position.x + cannon.width / 2,
                    y: cannon.position.y
                },
                velocity: {
                    x: 0,
                    y: -10
                }
            }))
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