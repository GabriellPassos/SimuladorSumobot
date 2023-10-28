let canvas = document.getElementById("canvas");
const contex = canvas.getContext("2d");
let x = 100;
let y = 100;

let Bolas = [];
let ESQUERDA, CIMA, DIREITA, BAIXO;
let friccao = .1;
class Vetor{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
    somar(vetor){
        return new Vetor(this.x + vetor.x, this.y + vetor.y);
    }
    subtrair(vetor){
        return new Vetor(this.x - vetor.x, this.y - vetor.y);
    }
    calcularMagnitude(){
        return Math.sqrt(this.x**2 + this.y**2);
    }
    mutiplicar(escalar){
        return new Vetor(this.x * escalar, this.y * escalar);
    }
    calcularNormal(){
        return new Vetor(-this.y, this.x).normalizar();
    }
    normalizar(){
        let magnitude = this.calcularMagnitude();
        console.log(magnitude)
        if(magnitude === 0){
            return new Vetor(0,0);
        }
        return new Vetor(this.x/magnitude, this.y/magnitude);
    }
    calcularProdutoEscalar(vetor1, vetor2){
        return new Vetor(vetor1.x * vetor2.x + vetor1.y * vetor2.y);
    }
    desenharVetor(inicial_x, inicial_y, mod, cor){
        contex.beginPath();
        contex.moveTo(inicial_x,  inicial_y);
        contex.lineTo(inicial_x + this.x  * mod, inicial_y + this.y * mod);
        contex.strokeStyle = cor;
        contex.stroke();
    }
}
class Bola{
    constructor(x, y, r){
        this.x = x;
        this.y = y;
        this.r = r;
        this.player = false;
        this.velocidade = new Vetor(0,0);
        this.aceleracao = new Vetor(0,0);
        this.modAceleracao = 1;
        Bolas.push(this);
    }
    desenharBola() {
        contex.beginPath();
        contex.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        contex.strokeStyle = "black";
        contex.stroke();
        contex.fillStyle = "red";
        contex.fill();
    }
    display(){
        contex.beginPath();
        contex.arc(550, 400, 50, 0, 2 * Math.PI);
        contex.strokeStyle = "black";
        contex.stroke();
        this.velocidade.normalizar().desenharVetor(550, 400, 50, "green");
        this.aceleracao.desenharVetor(550, 400, 50, "blue");
        this.aceleracao.calcularNormal().desenharVetor(550, 400, 50, "red");
    }
    
}


function controle(bola){
    canvas.addEventListener("keydown", (event) => {

        if (event.code === "ArrowDown") {
            CIMA = true;
        }
        if (event.code == "ArrowUp") {
            BAIXO = true;
        }
        if (event.code === "ArrowLeft") {
            ESQUERDA = true;
        }
        if (event.code === "ArrowRight") {
            DIREITA = true;
        }
    });
    canvas.addEventListener("keyup",(event)=>{
        if (event.code === "ArrowDown") {
            CIMA = false;
        }
        if (event.code == "ArrowUp") {
            BAIXO = false;
        }
        if (event.code === "ArrowLeft") {
            ESQUERDA = false;
        }
        if (event.code === "ArrowRight") {
            DIREITA = false;
        }
    });

    if (ESQUERDA) {
        bola.aceleracao.x = -bola.modAceleracao;
    }
    if (DIREITA) {
        bola.aceleracao.x = bola.modAceleracao;
    }
    if (BAIXO) {
        bola.aceleracao.y = -bola.modAceleracao;
    }
    if (CIMA) {
        bola.aceleracao.y = bola.modAceleracao;
    }
    if(!CIMA && !BAIXO){
        bola.aceleracao.y = 0;
    }
    if(!ESQUERDA && !DIREITA){
        bola.aceleracao.x = 0;
    }
    bola.aceleracao = bola.aceleracao.normalizar().mutiplicar(bola.modAceleracao);
    bola.velocidade = bola.velocidade.somar(bola.aceleracao);
    bola.velocidade = bola.velocidade.mutiplicar(1 - friccao);


    bola.x += bola.velocidade.x;
    bola.y += bola.velocidade.y;
}
function loopPrincipal(){
    contex.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    Bolas.forEach(bola=>{
        bola.desenharBola();
        if(bola.player){
            controle(bola);
        }
        bola.display();
    });
    requestAnimationFrame(loopPrincipal);
}
requestAnimationFrame(loopPrincipal);

let bola2 = new Bola(100,100,20);
bola2.player = true;
