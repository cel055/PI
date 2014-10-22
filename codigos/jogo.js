"use strict";
var cont;
var heroi;
var listInimigos;
var palco;
var divSaida;
var fruta;
var dificuldade;
var intervalo;
var teclasPressionadas = new Array();

var Dificuldade = function(saida, heroi, inimigo, criacao, numInicioInimigos, estrategia){
    this.mudaSaida = saida;
    this.velocidadeHeroi = heroi;
    this.velocidadeInimigo = inimigo;
    this.criaInimigo = criacao;
    this.inimigosIniciais = numInicioInimigos;
    this.estrategia = estrategia;
}

var Elemento = function(pElemento){
    this.elemento = pElemento;
    this.topo;
    this.esquerda;
    this.altura;
    this.largura;
    
    this.setPosicaoInicial = function (){
        this.topo = parseInt(window.getComputedStyle(this.elemento,null).getPropertyValue("top"));
        this.esquerda = parseInt(window.getComputedStyle(this.elemento,null).getPropertyValue("left"));
    }
    
    this.setLarguraAltura = function(){
        this.altura = parseInt(window.getComputedStyle(this.elemento,null).getPropertyValue("height"));
        this.largura = parseInt(window.getComputedStyle(this.elemento,null).getPropertyValue("width"));
    }
}

var Palco = function(elemento){
    Elemento.apply(this,[elemento]);
    
    this.saida;
    
    this.mudaSaida = function(){
        do{
			this.saida = parseInt(Math.random() * 4);
		}while(this.saida > 3);
		
		if(this.saida < 1){
            divSaida.style.width = this.largura + "px";
            divSaida.style.height = "50px";
            divSaida.style.top = (this.topo - 23) + "px";
            divSaida.style.left = (this.esquerda + 3) + "px";
            divSaida.style.backgroundImage = 'url(imagens/saidaHorizontal.png)';
		}else if(this.saida < 2){
            divSaida.style.width = "50px";
            divSaida.style.height = this.altura + "px";
            divSaida.style.top = (this.topo + 3) + "px";
            divSaida.style.left = (this.esquerda + this.largura - 19) + "px";
            divSaida.style.backgroundImage = 'url(imagens/saidaVertical.png)';
		}else if(this.saida < 3){
            divSaida.style.width = this.largura + "px";
            divSaida.style.height = "50px";
            divSaida.style.top = (this.topo + this.altura - 21) + "px";
            divSaida.style.left = (this.esquerda + 3) + "px";
            divSaida.style.backgroundImage = 'url(imagens/saidaHorizontal.png)';
		}else{
            divSaida.style.width = "50px";
            divSaida.style.height = this.altura + "px";
            divSaida.style.top = (this.topo + 3) + "px";
            divSaida.style.left = (this.esquerda - 23) + "px";
            divSaida.style.backgroundImage = 'url(imagens/saidaVertical.png)';
		}
    }
}

var Personagem = function(elemento, velocidadePersonagem){
    Elemento.apply(this,[elemento]);
    
    this.velocidade = velocidadePersonagem;
    
    this.movePersonagem = function(){
        this.elemento.style.top = this.topo + "px";
        this.elemento.style.left = this.esquerda + "px";
    }
}

var Heroi = function(elemento, velocidadeHeroi){
    Personagem.apply(this,[elemento, velocidadeHeroi]);
    
    this.pontos = 0;
    
    this.confereVitoria = function(){
        if(this.topo < 0){
            if(palco.saida == 0){
                console.log("venceu\nPonto:" + this.pontos);
                document.removeEventListener("keydown", keyDownMovePersonagens, false);
                document.removeEventListener("keyup", keyUpMovePersonagens, false);
                clearInterval(intervalo);
                iniciaPartida(7, 4, 2, 50, 3, dificuldade.estrategia);
            }else{
                this.topo = 0;
                this.movePersonagem();
            }
        }else if(this.topo + this.altura > palco.altura){
            if(palco.saida == 2){
                console.log("venceu\nPonto:" + this.pontos);
                document.removeEventListener("keydown", keyDownMovePersonagens, false);
                document.removeEventListener("keyup", keyUpMovePersonagens, false);
                clearInterval(intervalo);
                iniciaPartida(7, 4, 2, 50, 3, dificuldade.estrategia);
            }else{
                this.topo = palco.altura - this.altura;
                this.movePersonagem();
            }
        }
        
        if(this.esquerda < 0){
            if(palco.saida == 3){
                console.log("venceu\nPonto:" + this.pontos);
                document.removeEventListener("keydown", keyDownMovePersonagens, false);
                document.removeEventListener("keyup", keyUpMovePersonagens, false);
                clearInterval(intervalo);
                iniciaPartida(7, 4, 2, 50, 3, dificuldade.estrategia);
            }else{
                this.esquerda = 0;
                this.movePersonagem();
            }
        }else if(this.esquerda + this.largura > palco.largura){
            if(palco.saida == 1){
                console.log("venceu\nPonto:" + this.pontos);
                document.removeEventListener("keydown", keyDownMovePersonagens, false);
                document.removeEventListener("keyup", keyUpMovePersonagens, false);
                clearInterval(intervalo);
                iniciaPartida(7, 4, 2, 50, 3, dificuldade.estrategia);
            }else{
                this.esquerda = palco.largura - this.largura;
                this.movePersonagem();
            }
        }
    }
}

var Inimigo = function(elemento, velocidadeInimigo){
    Personagem.apply(this,[elemento, velocidadeInimigo]);
    
    this.imagem = false;
    
    this.confereDerrota = function(){
        if(this.esquerda + this.largura >= heroi.esquerda && this.esquerda <= heroi.esquerda + heroi.largura && this.topo <= heroi.topo + heroi.altura && this.topo + this.altura >= heroi.topo ){
            console.log("perdeu\nPonto:" + heroi.pontos);
            document.removeEventListener("keydown", keyDownMovePersonagens, false);
            document.removeEventListener("keyup", keyUpMovePersonagens, false);
            clearInterval(intervalo);
            iniciaJogo(7, 4, 2, 50, 3, dificuldade.estrategia);
        }
    }
    
    this.giraInimigo = function(radianos){
        this.elemento.style.transform = "rotate(" + radianos + "rad)";
        this.elemento.style.webkitTransform = "rotate(" + radianos + "rad)";
        this.elemento.style.mozTransform = "rotate(" + radianos + "rad)";
        this.elemento.style.msTransform = "rotate(" + radianos + "rad)";
        this.elemento.style.oTransform = "rotate(" + radianos + "rad)";
    }
    
    this.mudaImagem = function(){
        if(this.imagem){
            this.elemento.style.backgroundImage = 'url(imagens/pacmanFechado.png)';
            this.imagem = false; 
        }else{
            this.elemento.style.backgroundImage = 'url(imagens/pacmanAberto.png)';
            this.imagem = true; 
        }
    }
    
    this.moveInimigo = function(){
        
        var radianos = this.calcRadiano();
        
        this.topo -= Math.sin(radianos) * this.velocidade;
        this.esquerda -= Math.cos(radianos) * this.velocidade;
        this.movePersonagem();
        
        this.giraInimigo(radianos);
        this.mudaImagem();
        this.confereDerrota();
    }
    
    this.calcRadiano = function(){
        var alturaRel = (this.topo + this.altura/2) - (heroi.topo + heroi.altura/2);
        var larguraRel = (this.esquerda + this.largura/2) - (heroi.esquerda + heroi.largura/2);
        return Math.atan2(alturaRel, larguraRel);
    }
}

var Fruta = function(){
    Elemento.apply(this, [null]);
    
    this.pontos;
    this.numFruta = 0;
    
    this.confereContato = function(){
        if(this.esquerda + this.largura >= heroi.esquerda && this.esquerda <= heroi.esquerda + heroi.largura && this.topo <= heroi.topo + heroi.altura && this.topo + this.altura >= heroi.topo ){
            heroi.pontos += this.pontos * this.numFruta;
            palco.elemento.removeChild(this.elemento);
            criaFruta();
            console.log("pontos do heroi = " + heroi.pontos);
        }
    }
}

window.addEventListener("load",inicia,false);

function inicia(){    
    document.getElementById("inicia").addEventListener("click",comecaJogo,false);

}

function comecaJogo(evento){
    var estrategia = document.getElementById("estrategia").checked;
    document.getElementById("menuJogo").style.display = "none";

    iniciaJogo(7, 6, 2, 50, 3, estrategia);
}

function iniciaJogo(saida, velocidadeHeroi, velocidadeInimigo, criacao, numInicioInimigos, modoEstrategia){
    document.addEventListener("keydown", keyDownMovePersonagens, false);
    document.addEventListener("keyup", keyUpMovePersonagens, false);

    cont = 0;
    dificuldade = new Dificuldade(saida, velocidadeHeroi, velocidadeInimigo, criacao, numInicioInimigos, modoEstrategia);
    
    palco = new Palco(document.getElementById("palco"));
    palco.setPosicaoInicial();
    palco.setLarguraAltura();
    
    divSaida = document.createElement("div");
    divSaida.setAttribute("class", "saida");
    
    while (palco.elemento.firstChild) {
        palco.elemento.removeChild(palco.elemento.firstChild);
    }
    
    heroi = new Heroi(document.createElement("div"), dificuldade.velocidadeHeroi);
    heroi.elemento.id = "heroi";
    heroi.elemento.setAttribute("class", "personagem heroi");
    palco.elemento.appendChild(heroi.elemento);
    heroi.setPosicaoInicial();
    heroi.setLarguraAltura();
    
    palco.elemento.appendChild(divSaida);
    palco.mudaSaida();
    
    fruta = new Fruta();
    criaFruta();
    
    listInimigos = new Array();
    for(var i = 0; i < dificuldade.inimigosIniciais; i++){
        criaInimigo();
    }
    if(!dificuldade.estrategia){
        intervalo = setInterval(moveInimigos,41);
    }
}

function iniciaPartida(saida, velocidadeHeroi, inimigo, criacao, numInicioInimigos, modoEstrategia){
    document.addEventListener("keydown", keyDownMovePersonagens, false);
    document.addEventListener("keyup", keyUpMovePersonagens, false);

    cont = 0;
    dificuldade = new Dificuldade(saida, velocidadeHeroi, inimigo, criacao, numInicioInimigos, modoEstrategia);
    
    while (palco.elemento.firstChild) {
        palco.elemento.removeChild(palco.elemento.firstChild);
    }
    palco.elemento.appendChild(divSaida);
    palco.mudaSaida();
    palco.elemento.appendChild(heroi.elemento);
    
    heroi.topo = palco.altura/2 - heroi.altura/2;
    heroi.esquerda = palco.largura/2 - heroi.largura/2;
    heroi.velocidade = dificuldade.velocidadeHeroi;
    heroi.movePersonagem();
    
    criaFruta();
    
    listInimigos = new Array();
    for(var i = 0; i < dificuldade.inimigosIniciais; i++){
        criaInimigo();
    }
    if(!dificuldade.estrategia){
        intervalo = setInterval(moveInimigos,41);
    }
}

function keyDownMovePersonagens(evento){
    if(evento.keyCode > 36 && evento.keyCode < 41){
        evento.preventDefault();
        teclasPressionadas[evento.keyCode] = true;
        
        if(teclasPressionadas[38]){
            heroi.topo -= dificuldade.velocidadeHeroi;
        }
        if(teclasPressionadas[40]){
            heroi.topo += dificuldade.velocidadeHeroi;
        }
	
        if(teclasPressionadas[39]){
            heroi.esquerda += dificuldade.velocidadeHeroi;
        }
        if(teclasPressionadas[37]){
            heroi.esquerda -= dificuldade.velocidadeHeroi;
        }
        
        heroi.movePersonagem();
        heroi.confereVitoria();
        
        fruta.confereContato();
        
        if(dificuldade.estrategia){
            for(var i = 0; i < listInimigos.length; i++){
                listInimigos[i].moveInimigo();
            }
        }
        
        cont++;
        if(cont % dificuldade.criaInimigo == 0){
            criaInimigo();
        }
        if(cont % dificuldade.mudaSaida == 0){
            palco.mudaSaida();
        }
    }
}

function keyUpMovePersonagens(evento){
    teclasPressionadas[evento.keyCode] = false;
}

function criaInimigo(){
    var inimigo = new Inimigo(document.createElement("div"), dificuldade.velocidadeInimigo);
    inimigo.elemento.setAttribute("class", "personagem inimigo");
    palco.elemento.appendChild(inimigo.elemento);
    inimigo.setLarguraAltura();
    
    var topo;
    var esquerda;
    do{
        topo = Math.random() * palco.altura;
        esquerda = Math.random() * palco.largura;
    }while(topo > palco.altura - inimigo.altura || esquerda > palco.largura - inimigo.largura || Math.abs(topo - heroi.topo) < 100);
    
    inimigo.topo = topo;
    inimigo.esquerda = esquerda;
    inimigo.movePersonagem();
    listInimigos.push(inimigo);
}

function criaFruta(){
    fruta.numFruta++;
    fruta.elemento = document.createElement("div");
    fruta.elemento.setAttribute("class", "personagem fruta");
    
    var imagemFruta = Math.random() * 4;
    if(imagemFruta < 1){
        fruta.elemento.style.backgroundImage="url(imagens/cereja.png)";
        fruta.pontos = 3;
    }else if(imagemFruta < 2){
        fruta.elemento.style.backgroundImage="url(imagens/laranja.png)";
        fruta.pontos = 5;
    }else if(imagemFruta < 3){
        fruta.elemento.style.backgroundImage="url(imagens/maca.png)";
        fruta.pontos = 7;
    }else{
        fruta.elemento.style.backgroundImage="url(imagens/morango.png)";
        fruta.pontos = 9;
    }
    
    palco.elemento.appendChild(fruta.elemento);
    fruta.setLarguraAltura();
    
    var topo;
    var esquerda;
    do{
        topo = Math.random() * palco.altura;
        esquerda = Math.random() * palco.largura;
    }while(topo > palco.altura - fruta.altura || esquerda > palco.largura - fruta.largura || Math.abs(topo - heroi.topo) < 100);
    
    fruta.topo = topo;
    fruta.esquerda = esquerda;
    fruta.elemento.style.top = topo + "px";
    fruta.elemento.style.left = esquerda + "px";
    
}

function moveInimigos(){
    for(var i = 0; i < listInimigos.length; i++){
        listInimigos[i].moveInimigo();
    }
}
