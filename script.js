const canvas = document.querySelector('canvas')
const c = canvas.getContext('2d')
//ajustando o tamnho do canvas com o tamanho da tela
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

//criando o player
class Player{
    
    constructor(){

        this.velocity = {
            x:0,
            y:0
        }

        this.rotation = 0
        // aqui carrego a imagem do jogador
        const image = new Image()
        image.src = './img/spaceship.png'
        //esse codigo define o tamanho da image so apos ela ser
        //carregada 
        // isso aqui '=>' é uma callBackFunction
        image.onload = () =>{
            const scale = 0.15
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            // aqui defino a posição inical
            this.position = {
                x: canvas.width/ 2 - this.width / 2,
                y: canvas.height - this.height - 20
            }
        }
        

    }
    //metodo do canvas para desenhar o player
    draw(){
       // c.fillStyle = 'red'
       // c.fillRect(this.position.x , this.position.y, this.width, this.height)
        
       //metedo aonde respectivamente eu pego a img,ponho na posx e y.
       //e depois defino o tamanho da img do jogador
       //aqui eu so desenho o player na posição que eu quero e do tamanho que eu quero
       //quando a condiçao do if é vdd
       //(quando so tem uma condiçao nao precisa de {})
       c.save()
       c.translate(player.position.x + player.width/2, player.position.y + player.height/2)
       c.rotate(this.rotation)
       c.translate(-player.position.x - player.width/2, -player.position.y - player.height/2)
       if (this.image)
       c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
       c.restore() 
    }

    update(){
        if (this.image){
            this.draw()
            this.position.x += this.velocity.x

        }

    }
   
    
}
const player = new Player()
const keys ={
    a:{
        pressed: false
    },
    d:{
        pressed: false
    },
    space:{
        pressed:false
    }
}
//player.draw()

//func feita para ficar 'desenhando'(atualizando) o player na tela
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    //agora para preencher o canvas da cor preta
    //o parenteses define a area a ser pintada(preencheu de preto por default)
    c.fillRect(0,0, canvas.width,canvas.height)
    player.update()
    if (keys.a.pressed && player.position.x >= 0){
        player.velocity.x = -5
        player.rotation = -.15
    }else if(keys.d.pressed && player.position.x + player.width <= canvas.width){
        player.velocity.x = +5
        player.rotation = 0.15

    }
    else{
        player.velocity.x = 0
        player.rotation = 0
    }
}
animate()
addEventListener('keydown', ({key}) => {
    switch(key){
        case 'a':
            console.log('left')
            
            keys.a.pressed = true
            break
        case 'd':
            console.log('right')
            keys.d.pressed = true
            break
        case ' ':
            console.log('Space')
            break
    }   
}
)

addEventListener('keyup', ({key}) => {
    switch(key){
        case 'a':
            console.log('left')
            
            keys.a.pressed = false
            break
        case 'd':
            console.log('right')
            keys.d.pressed = false
            break
        case ' ':
            console.log('Space')
            break
    }   
}
)