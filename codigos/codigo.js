$(document).ready(inicia);

var mapa;
var latLng;

function inicia(){
    $("#acordion").accordion();
    $("#container .quadrado").on("click",abreDiv);
    $("#contato #nome").on("blur",valNome);
    $("#contato #email").on("blur",valEmail);
    $("#contato #assunto").on("blur",valAssunto);
    $("#contato #msg").on("blur",valMsg);
    $("#formulario").on("submit",enviarForm);
    
    if(location.href.substring(location.href.lastIndexOf("/") + 1, location.href.lastIndexOf(".")) == "menu1"){
        google.maps.event.addDomListener(window, 'load', iniciaMapa);
    }
}

function abreDiv(evento){
    $("#container .quadradoE").css("display","none");
    if(this.id == "divPacMonster"){
        $("#textoPacMonster").css("display","block");
    }else if(this.id == "divDesenvolvimento"){
        $("#textoDesenvolvimento").css("display","block");
    }else{
        $("#textoEmpresa").css("display","block");
        google.maps.event.trigger(mapa, 'resize');
        mapa.setCenter(latLng);
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

function iniciaMapa(){
    var opcoes = {
        zoom: 15,
        center: new google.maps.LatLng(-27.762438,-48.579548)
    };

    mapa = new google.maps.Map(document.getElementById("mapa"),opcoes);

    latLng = new google.maps.LatLng(-27.762438,-48.579548);

    var marcador = new google.maps.Marker({
        position: latLng,
        map: mapa,
        title: "Pac Monter Inc"
    });

    var info = new google.maps.InfoWindow({
        content: '<div id="content">Pac Monster Inc.</div>'
    });

    google.maps.event.addListener(marcador, 'click',function(){
        info.open(mapa, marcador);
    });
}
