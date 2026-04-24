const map = L.map('map', {
    minZoom: 13,
    maxZoom: 18
}).setView([-22.120016425426552, -45.053681520779705], 15);

const lightLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
})

const darkLayer = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}.png', {
	attribution: '&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
})

lightLayer.addTo(map);

function updateMapTheme(isDark) {
    if (isDark) {
        map.removeLayer(lightLayer);
        darkLayer.addTo(map);
    } else {
        map.removeLayer(darkLayer);
        lightLayer.addTo(map);
    }
}

window.updateMapTheme = updateMapTheme;

const iconLixo = L.icon({ iconUrl: 'imgs/recicle.png', iconSize: [25, 25]});
const iconFacul = L.icon({ iconUrl: 'imgs/iconfacul.png', iconSize: [25, 25]});
const iconPrefeitura = L.icon({ iconUrl: 'imgs/iconprefeitura.png', iconSize: [25, 25]});
const iconFarmacia = L.icon({ iconUrl: 'imgs/farmacia.png', iconSize: [25, 25]});
const iconPos = L.divIcon({
    className: "posIcon",
    html: `
        <svg class="icon">
            <use href="icons.svg#iconOrigin"></use>
        </svg>
    `,
    iconSize: [25, 25]
});

//marcadores vindo do db
const mapMarkers = [];
const iconMap = {
    "lixo": iconLixo,
    "facul": iconFacul,
    "prefeitura": iconPrefeitura,
    "farmacia" : iconFarmacia
};

async function marcadores() {
    const response = await fetch('locais.php');
    const marks = await response.json();
        marks.forEach(({ latitude, longitude, nome, endereco, icone, tipo}) => {
            const icon = iconMap[tipo] || iconLixo;
            const marker = L.marker([latitude, longitude], { icon })
                .bindPopup(`
                    <div class="popup">
                        <img src="${icone}">
                        <h3>${nome}</h3>
                        <p>${endereco}</p>
                        <button onclick="iniciarRota(${latitude},${longitude})">Como chegar</button>
                    </div>
                `)
                .addTo(map);

            mapMarkers.push({ latitude, longitude, marker });
        });
    }
marcadores();

window.focusMarker = function(lat, lng) {
    const found = mapMarkers.find(m => parseFloat(m.latitude) === lat && parseFloat(m.longitude) === lng);
    if (!found) return;

    window.scrollTo({ top: 0, behavior: 'smooth'});
    map.flyTo([lat, lng], 17);
    found.marker.openPopup();
};

//Localizaçao atual
navigator.geolocation.watchPosition(success, error);

let posicaoAtual, zoomed;
let latAtual, lngAtual;

function success(position){
    latAtual = position.coords.latitude;
    lngAtual = position.coords.longitude;
    
    if (posicaoAtual){
        map.removeLayer(posicaoAtual);
    }

    posicaoAtual = L.marker([latAtual, lngAtual],{ icon: iconPos}).addTo(map);   

    if (!zoomed){
        map.setView([latAtual, lngAtual], 17);
        zoomed = true;
    }       
}
function error(err){
    if (err.code === 1){
        alert("Por favor, permita o acesso a sua localização");
    } else {
        alert("Não foi possivel conseguir sua localização");
    }
}

function iniciarRota(latDest, lngDest) {
    const url = `https://www.google.com/maps/dir/${latAtual},${lngAtual}/${latDest},${lngDest}`;
    window.open(url);
}

const darkMode = document.documentElement.classList.contains("dark");
updateMapTheme(darkMode);
