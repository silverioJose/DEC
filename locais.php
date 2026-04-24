<?php
    include_once 'conexao.php';
    $result = mysqli_query($con, "SELECT * FROM lugares");
    $locais = [];

    while($row = mysqli_fetch_assoc($result)){
        $locais[] = $row;
    }    
    //Json back to Js
    header('Content-Type: application/json');
    echo json_encode($locais);
    mysqli_close($con);
?>