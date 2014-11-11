<?php
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $assunto = $_POST["assunto"];
    $msg = $_POST["mensagem"];

    $header = implode("\n",array("From: $email", "Subject: $assunto","Return-Path: $email","MIME-Version: 1.0", "X-Priority: 3","Coontent-Type: text/html; charset=UTF-8"));
    mail("cel055.ufsc@gmail","$assunto",$msg,$header);
    mail("herbert.sprengel@gmail.com","$assunto",$msg,$header);

    $header = implode("\n",array("From: cel055.ufsc@gmail.com", "Subject: Equipe PacMonster","Return-Path: cel055.ufsc@gmail.com","MIME-Version: 1.0", "X-Priority: 3","Coontent-Type: text/html; charset=UTF-8"));
    $msg = "Obrigado pela mensegem.\nEste email foi gerado automaticamente, favor não responder";
    mail("$email","Equipe PacMonster",$msg,$header);
    echo"<script>location.href='index.html';/></div>";
?>
