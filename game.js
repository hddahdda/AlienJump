document.addEventListener('DOMContentLoaded', () => {
    const dino = document.querySelector('.dino')
   const grid = document.querySelector('.grid')
    const alert = document.getElementById('alert')
   let isJumping = false
    let gravity = 0.9
    let isGameOver = false

    function control(e) {
        if (e.keyCode === 32) {
            if (!isJumping) {
                isJumping = true
                jump()
            }
        }
    }
    document.addEventListener('keyup', control)
     
    let position = 0
    function jump() {
        let count = 0
        let timerId = setInterval(function () {

            //move down
            if (count === 20) {
                clearInterval(timerId)
                let downTimeId = setInterval(function(){
                    if (count === 0) {
                        clearInterval(downTimeId)
                        isJumping = false
                    }
                position -= 2
                count--
                position = position * gravity
                dino.style.bottom = position + 'px'  
                }, 20)
               
            }

            // move up
        console.log('up')
        count++
        position += 80 
        position = position * gravity
        dino.style.bottom = position + 'px'
        }, 20)
    }

    function generateObstacle() {
        let randomTime = Math.random() * 4000
        let obstaclePosition = 1000
        const obstacle = document.createElement('div')
        if(!isGameOver) obstacle.classList.add('obstacle')
        grid.appendChild(obstacle)
        obstacle.style.left = obstaclePosition + 'px'

        let timerId = setInterval(function() {
            if (obstaclePosition > 0 && obstaclePosition < 100 && position < 100) {
                clearInterval(timerId)
                alert.innerHTML = 'Game Over'
                isGameOver = true
                //remove all children 
                while (grid.firstChild) {
                    grid.removeChild(grid.lastChild)
                }
            }
            obstaclePosition -=10
            obstacle.style.left = obstaclePosition + 'px' 
            
        },20)
       if (!isGameOver) setTimeout(generateObstacle, randomTime)
    }
    generateObstacle()

})