$(document).ready(inicia);

function inicia(){
    $("#acordion").accordion();
    $("#container .quadrado").on("click",abreDiv);
}

function abreDiv(evento){
    $("#container .quadradoE").css("display","none");
    if(this.id == "divPacMonster"){
        $("#textoPacMonster").css("display","block");
    }else if(this.id == "divDesenvolvimento"){
        $("#textoDesenvolvimento").css("display","block");
    }else{
        $("#textoEmpresa").css("display","block");
    }
}