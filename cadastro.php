<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Descarte Consciente</title>
    <link rel="icon" href="imgs/recicle.png">
    <script src="scripts/theme.js" defer></script>
    <link rel="stylesheet" href="style.css">
</head>

<?php
    $nome     = $_POST['nome'];
    $telefone       = $_POST['telefone'];
    $email          = $_POST['email'];
    $nomeLocal        = $_POST['nomeLocal'];
    $descricao       = $_POST['desc'];
    $endereco     = $_POST['local'];
    $numero       = $_POST['numero'];
    $cidade  = $_POST['cidade'];

echo "<div class= 'container'> <h3> Redirecionando </h3> <img src='imgs/load.png' class='spinner'> </div>";
    //"DADOS:<br>
    //$nome<br> $telefone<br> $email<br> $nomeLocal<br> 
    //$descricao <br> $endereco<br> $numero<br> $cidade <br>";

//ACESSO E GRAVAÇÃO NO BANCO DE DADOS
include_once('conexao.php');
$insert="INSERT INTO cadastro (
id_cadastro, nome_prop, telefone, email, nome_lugar, 
descricao, endereco, numero, cidade, imagem) 
VALUES (
NULL, '$nome', '$telefone', '$email', '$nomeLocal', '$descricao', 
'$endereco', '$numero', '$cidade', NULL)";

$resultado=mysqli_query($con,$insert);
   
if ($resultado==1)
    {
		echo "<script>alert('Cadastrada com Sucesso!')</script>";
		echo "<div class='container'> <br> <p> Você será redirecionado automáticamente em alguns segundos, caso não seja, 
		<a href='https://oficinahotrods.com.br/15888/DEC'> [ clique aqui ] </a>. </p> </div>";
		header("Refresh: 7; url=https://oficinahotrods.com.br/15888/DEC");
    }
    else
    {
        echo "<script>alert('Erro ao Cadastrar os dados! Contate o administrador')</script>";
        echo"<div class='container'> <br>Errorcode: " . mysqli_errno($con) . "</div>";
    }

    mysqli_close($con);

?>