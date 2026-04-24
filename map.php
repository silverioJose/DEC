<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Descarte Consciente</title>
    <link rel="icon" href="imgs/recicle.png">
    <script src="scripts/theme.js" defer></script>
    <link rel="stylesheet" href="style.css">
    <!--link openstreetmap-->
    <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"/>
    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <!--Leaflet routing machine-->
    <link rel="stylesheet" href="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.css" />
    <script src="https://unpkg.com/leaflet-routing-machine@latest/dist/leaflet-routing-machine.js"></script>
    
</head>

<body>

    <header>
    <div class="smallButton">
    <button onclick="window.location.href='index.html'">
        <svg class="icon">
            <use href="icons.svg#iconHome"></use>
        </svg> 
    </button>
    </div>
    
    <div class="bar">
        <h2>
            Descarte de <br>
            Eletrônicos <br>
            Consciente <br>
        </h2>
    </div>

    <div class="smallButton">
        <button id="toggle"> 
            <svg class="icon">
                <use href="icons.svg#iconToggle"></use>
            </svg>
        </button>
    </div>
    </header>

    <!-- Map -->
    
    <div id="map"></div>

    <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
    <script src="scripts/map.js"></script>

    <!-- Table -->

    <div class="table">
    
        <table class="locais">
            <tbody>
                <?php
                    //echo "Conexão com BD";
                    include_once('conexao.php');
                    
                    // selecionar participantes        
                    $select = "SELECT * FROM lugares";
                    $resultado = mysqli_query($con,$select) or die (mysqli_error());
                    
                    //listar participantes
                    if (mysqli_num_rows($resultado) == 0) {
                        echo "<tr><td colspan='4'>Nenum local</td></tr>";
                    } else {
                        while ($linha = mysqli_fetch_assoc($resultado)) {
                            echo "<tr>";
                            
                            echo "<td>                
                                    <div class='miniIMG'> <img src=".$linha['icone']."> </div>
                                </td>";
                          
                            echo "<td>
                                    <h4> ".$linha['nome']."</h4> <br>
                                    ".$linha['endereco']."<br>
                                    ".$linha['telefone']."<br>
                                    ".$linha['email']."<br>
                                    ".(!empty($linha['link']) ? "<a href='".$linha['link']." '>Acessar Site</a>" : "") ."
                                  </td>";
                        
                            // Button column
                            echo "<td>
                                    <button class='btn' onclick='focusMarker(".$linha['latitude'].", ".$linha['longitude'].")'>
                                        <svg class='icon'>
                                            <use href='icons.svg#iconPin'></use>
                                        </svg>
                                        Localizar no mapa
                                    </button>
                                  </td>";
                        
                            echo "</tr>";
                        }
                    }
                
                    mysqli_close($con);
                ?>
            </tbody>
        </table>
        
        <br>
        
        <div class="container">
            <div class="button2">
            <button onclick="window.location.href='form.html'">
                
                <svg class="icon">
                    <use href="icons.svg#iconPinPlus"></use>
                </svg> 

                Cadastrar local de descarte autorizado
                
            </button>
            </div>
        </div>

    </div>

</body>

<footer>

    <p> <br> Ana Carolina (16067), Naomi (15888), José (15565) - ADS 2026 </p>
    
</footer>

</html>