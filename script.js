
let mario = document.querySelector('.mario')
const pipe = document.querySelector('.pipe')
const cloud = document.querySelector('.clouds')


const jump =() => {
    mario.classList.add('jump');
    setTimeout(() =>{
        mario.classList.remove('jump')
    }, 500)
    /*setTimeout(removeAnimation, 500)*/
}

function removeAnimation(){
    mario.classList.remove('jump')
}

const loop = setInterval(() =>{
    const pipePosition = pipe.offsetLeft;
    //com o getcomputedstyle eu consigo acessar qualquer propriedade css do elemento
    //o metedo replace é para tirar o px e o + na frente converte uma string para numero!!!
    const marioPosition = +window.getComputedStyle(mario).bottom.replace('px','');
   //const cloudPosition = +window.getComputedStyle(cloud).left.replace('px','')
    const cloudPosition = cloud.offsetLeft
    
    if(pipePosition <= 40 && pipePosition > 0 && marioPosition < 27){
        pipe.style.animation = 'none'
        pipe.style.left = `${pipePosition}px`
        mario.style.animation = 'none'
        mario.style.bottom = `${marioPosition}px`
        mario.src = 'img/game-over.png'
        mario.style.width = '30px'
        mario.style.marginLeft = '10px'
        clearInterval(loop)
        cloud.style.animation = 'none'
        cloud.style.left = `${cloudPosition}px`
    }
}, 10)

document.addEventListener('keydown', jump);

