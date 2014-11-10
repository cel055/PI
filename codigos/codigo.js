$(document).ready(inicia);

function inicia(){
    $("#acordion").accordion();
    $("#container .quadrado").on("click",abreDiv);
    $("#contato #nome").on("blur",valNome);
    $("#contato #email").on("blur",valEmail);
    $("#contato #assunto").on("blur",valAssunto);
    $("#contato #msg").on("blur",valMsg);
    $("#formulario").on("submit",enviarForm);
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

function valNome(evento){
    validaNome(this.value);
}

function valEmail(evento){
    validaEmail(this.value);
}

function valAssunto(evento){
    validaAssunto(this.value);
}

function valMsg(evento){
    validaMsg(this.value);
}

function validaNome(txt){
    if(txt.trim().length <= 0){
        alert("Nome obrigatorio");
        return false;
    }
    return true;
}

function validaEmail(txt){
    if(txt.trim().length <= 0){
        alert("Email obrigatorio");
        return false;
    }else if(validateEmail(txt)){
        alert("Email invalido");
        return false;
    }
    return true;
}

function validaAssunto(txt){
    if(txt.trim().length <= 0){
        alert("Assunto obrigatorio");
        return false;
    }
    return true;
}

function validaMsg(txt){
    if(txt.trim().length <= 0){
        alert("Assunto obrigatorio");
        return false;
    }
    return true;
}

function validateEmail(email) { 
    var re = /^(([^<>()[]\.,;:s@"]+(.[^<>()[]\.,;:s@"]+)*)|(".+"))@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function enviarForm(evento){
    if(!validaNome($("#contato #nome").val()) || !validaEmail($("#contato #email").val()) || !validaAssunto($("#contato #assunto").val()) || !validaMsg($("#contato #msg").val())){
        evento.preventDefault();
        return;
    }
}