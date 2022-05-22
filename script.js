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
// aqui eu faço o missil ,definindo posicao inicial
class Projectile{
    constructor({position, velocity}){
        this.position = position
        this.velocity = velocity
        this.radius = 4
    }
    // aqui eu crio o missil (mas ainda nao esta desenhado)
    draw(){
        c.beginPath()
        //aqui sao parametros pre definidos para fazer um circulo
        c.arc(this.position.x, this.position.y,this.radius,0, Math.PI * 2)
        c.fillStyle = 'red'
        c.fill()
        c.closePath()
    }
    //e aqui sim eu desenho o missil
    update(){
        this.draw()
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
    }

}
class Invader{
    
    constructor({position}){

        this.velocity = {
            x:0,
            y:0
        }

        
        // aqui carrego a imagem do Inimogo
        const image = new Image()
        image.src = './img/invader.png'
        //esse codigo define o tamanho da image so apos ela ser
        //carregada 
        // isso aqui '=>' é uma callBackFunction
        image.onload = () =>{
            const scale = 1
            this.image = image
            this.width = image.width * scale
            this.height = image.height * scale
            // aqui defino a posição inical
            this.position = {
                x: position.x,
                y: position.y
            }
        }
        

    }
    //metodo do canvas para desenhar o Inimigo
    draw(){
  

       c.drawImage(this.image, this.position.x, this.position.y, this.width, this.height)
        
    }

    update({velocity}){
        if (this.image){
            this.draw()
            this.position.x += velocity.x
            this.position.y += velocity.y

        }

    }
   
}

class Grid{
    constructor(){
        this.position = {
            x: 0,
            y: 0 
        }
        this.velocity = {
            x: 3,
            y:0
        }
        this.invaders = []
        const columns = Math.floor(Math.random() * 10 + 5)
        const rows = Math.floor(Math.random() * 5 + 2)
        //aqui é para ter uma largura maxima da grid * 30 ( que é a largura da figura do invader)
        //isso é usado para fazer com que a grid de inimigo "rebata" na largura da tela e não saia fora da tela!
        this.width = columns * 30
        for(let x = 0;x < columns; x+= 1){
        for (let y = 0; y < rows; y+= 1){
            this.invaders.push(new Invader({position: {
                x: x * 30,
                y: y * 30
            }}))
        }
        }
    }
    update(){
        this.position.x += this.velocity.x
        this.position.y += this.velocity.y
        this.velocity.y = 0
        if(this.position.x + this.width >= canvas.width || this.position.x <= 0){
            this.velocity.x = -this.velocity.x
            this.velocity.y = 30
        }
    }
}

const player = new Player()
const projectiles = []
const grids = []

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


let frames = 0
//o let randomInterval é para ter um controle da primeira grid de inimigos.
let randomInterval = Math.floor((Math.random() * 500) + 500)


//func feita para gerenciar a animação do jogo,atualizando prejeteis,jogador e inimigo
function animate(){
    requestAnimationFrame(animate)
    c.fillStyle = 'black'
    //agora para preencher o canvas da cor preta
    //o parenteses define a area a ser pintada(preencheu de preto por default)
    c.fillRect(0,0, canvas.width,canvas.height)
    
    player.update()
    projectiles.forEach((projectile, index) =>{
        //nesse if eu faço o controle para quando  os projeteis sairem da tela  eu deleto eles
        if(projectile.position.y + projectile.radius <= 0){
            setTimeout(() => {
                projectiles.splice(index, 1)
            }, 0)
            
        }else{
            projectile.update()
        }
        //projectile.update()
    })
    grids.forEach(grid =>{
        grid.update()
        grid.invaders.forEach((invader, i)=>{
            invader.update({velocity: grid.velocity})
            projectiles.forEach((projectile, j) =>{
                //aqui é aonde eu faço a colisao do missil com o inimigo e confiro todos os lados da interação do inimigo com o missil
                if(projectile.position.y - projectile.radius <= invader.position.y + invader.height && projectile.position.x + projectile.radius >= invader.position.x && projectile.position.x - projectile.radius <= invader.position.x + invader.width && projectile.position.y + projectile.radius >= invader.position.y){
                    setTimeout(()=>{
                        //aqui pelo que entendi , esse codigo é feito porque toda vez que eu removo algum objeto do array com o metodo splice o array se arranja
                        //causando um comportamento "erroneo" dos inimigos a serem removidos do arrray cada vez que o missil detecta uma colisao
                        const invaderFound = grid.invaders.find((invader2) => invader2 === invader)
                            
                        
                        const projectileFound = projectiles.find((projectile2) => projectile2 === projectile)
                        if(invaderFound && projectileFound){
                            grid.invaders.splice(i,1)
                            projectiles.splice(j, 1)
                        }    
                    }, 0)
                }

            })
        })
    })
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
    //aqui é aonde eu controlo o spawns das grids de inimigos o frames é meu contador que é resetado sempre que uma grid eh criada.
    if(frames % randomInterval === 0){
        grids.push(new Grid())
        randomInterval = Math.floor((Math.random() * 500) + 500)
        frames = 0
        
    }
    frames++
}

animate()
addEventListener('keydown', ({key}) => {
    switch(key){
        case 'a':
            
            
            keys.a.pressed = true
            break
        case 'd':
            
            keys.d.pressed = true
            break
        case ' ':
            
            projectiles.push(new Projectile({
                position:{
                    x: player.position.x + player.width / 2,
                    y: player.position.y
                },
                velocity:{
                    x: 0,
                    y: -10
                }
            }))
            break
    }   
}
)

addEventListener('keyup', ({key}) => {
    switch(key){
        case 'a':
            
            
            keys.a.pressed = false
            break
        case 'd':
            
            keys.d.pressed = false
            break
        case ' ':
            
            break
    }   
}
)