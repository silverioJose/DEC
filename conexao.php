<?php
// variaveis
    $servidor = "localhost";
    $usuario = "oficinahotrods_15888";
    $senha = "FSLads2025";
    $banco_dados = "oficinahotrods_15888_DescarteEletronico";
    
    // conectar 
    $con = mysqli_connect($servidor, $usuario, $senha, $banco_dados);
    if (!$con) {
        die("Falha na conexao :(" .mysqli_connect_error());
    }
    //echo "<br> Conectado :) <br> Bem vindo: " .$usuario;
    
    /*
    
    //Get locations
    $result = mysqli_query($con, "SELECT * FROM lugares");
    
    $locais = [];
    while($row = mysqli_fetch_assoc($result)){
        $locais[] = $row;
    }
    
    //Json back to Js
    header('Content-Type: application/json');
    echo json_encode($locais);
    mysqli_close($con);
    
    */
?>