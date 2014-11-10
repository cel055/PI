<?php
    $nome = $_POST["nome"];
    $email = $_POST["email"];
    $assunto = $_POST["assunto"];
    $msg = $_POST["mensagem"];

    $header = implode("\n",array("From: $email", "Subject: teste","Return-Path: $email","MIME-Version: 1.0", "X-Priority: 3","Coontent-Type: text/html; charset=UTF-8"));
    mail("cel055.ufsc@gmail","TestePHP",$msg,$header);
    echo"<script>location.href='index.html';</script>";
?>