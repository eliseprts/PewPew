const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')

// Size of canvas
canvas.width = innerWidth
canvas.height = innerHeight

class Cannon {

    constructor() {
        this.velocity = {
            x: 0,
            y: 0
        }

        const image = new Image()
        image.src = 'assets/img/cannon-small.png'
        image.onload = () => {
            const scale = 0.30
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            this.position = {
                x: canvas.width / 2 - this.width / 2,
                y: canvas.height - this.height - 10
            }
        }
    }

    draw() {
        // ctx.fillStyle = 'red';
        // ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
        ctx.drawImage(
            this.image,
            this.position.x,
            this.position.y,
            this.width,
            this.height)
    }

    update() {
        if (this.image) {
            this.draw()
            this.position.x += this.velocity.x
        }
    }
}

const cannon = new Cannon()
cannon.draw()

function animate() {
    requestAnimationFrame(animate)
    cannon.update()
}
animate()

addEventListener('keydown', ({ key }) => {
    switch (key) {
        case 'ArrowLeft':
            console.log('left')
            break
        case 'ArrowRight':
            console.log('right')
            break
        case ' ':
            console.log('space')
            break
    }
})