import { getUrlApi } from './genericfunctions.js';
const { servidorApi, servidorPrint } = getUrlApi;
localStorage.setItem("servidorApi", servidorApi);
localStorage.setItem("servidorPrint", servidorPrint);
var mesas;

fetch(servidorApi + 'mesas', { mode: 'cors' })
    .then((response) => {
        return response.json(); //Se serializa desde el json
    })
    .then((myJson) => {
        mesas = myJson.mesas; //El array del json se obtiene la seccion de requerida 
        localStorage.setItem("mesas", JSON.stringify(mesas));
        console.log("Desde el fetch");
        console.log(myJson.mesas);
        getSalas();
    });


const getSalas = () => {
    const salas = mesas.map(m => m.sala);
    const cbxSalas = document.getElementById("cbxSalas");
    const salasList = salas.filter((valor, index, arr) => (
        arr.indexOf(valor) === index
    ));

    salasList.forEach(function(sala) {
        const opcionesSala = document.createElement("option");
        opcionesSala.id = sala;
        opcionesSala.innerHTML = sala;
        cbxSalas.appendChild(opcionesSala);
    });
}


const mesasSala = (idSala) => {
    const mesasEn = mesas.filter(mesa => mesa.sala === idSala);
    return mesasEn;
}

const crearMesa = (mesa) => {
    const { activa, codcliente, nummesa, posx, posy, sala, tarifa, tipoobjeto } = mesa;
    var dvPadre = document.createElement("DIV");
    dvPadre.className = " pl-0 pr-1 py-1";

    var dvHijo = document.createElement("DIV");

    var link = document.createElement("A");
    link.setAttribute('href', '#');

    var img = document.createElement("IMG");
    img.className = 'img-fluid px-2'

    var nombreMesa = document.createElement("P");
    nombreMesa.className = 'm-0 pt-2 text-muted text-center'
    nombreMesa.innerHTML = 'Mesa ' + nummesa;

    if (!activa) {
        dvHijo.className = "bg-white shadow-sm rounded text-center  px-2 py-3 c-it";
        //link.setAttribute('data-toggle', 'modal');        
        dvHijo.setAttribute('onClick', 'fnMesaSeleccionada("' + nummesa + '")');
        //link.setAttribute('href', 'clientes.html?mesa=' + numesa);
        img.setAttribute('src', 'img/categorie/check-circled.svg');
    } else {
        dvHijo.className = "bg-mocaccine shadow-sm rounded text-center  px-2 py-3 c-it";
        dvHijo.setAttribute('onClick', 'fnMesaOcupadaSeleccionada("' + nummesa + '","' + codcliente + '")');
        img.setAttribute('src', 'img/categorie/ui-lock.svg');
    }


    link.appendChild(img);
    link.appendChild(nombreMesa);
    dvHijo.appendChild(link);
    dvPadre.appendChild(dvHijo);

    var x = document.getElementById("mesasList"); // Get the element with id="demo"    
    x.appendChild(dvPadre);
}

$('#cbxSalas').on({
    "focus": function() {
        //console.log('clicked!', this, this.value);
        this.selectedIndex = -1;
    },
    "change": function() {
        var x = document.getElementById("mesasList"); // Get the element with id="demo"    
        x.innerHTML = "";
        const salaSeleccionada = $(this).val();
        localStorage.setItem("salaid", salaSeleccionada); //Se gurarda la sala al seleccionarla
        const mesasList = mesasSala(parseInt(salaSeleccionada));
        // console.log(mesasList.sort((firstItem, secondItem) => firstItem.numesa - secondItem.numesa))
        mesasList.forEach(function(valor) {
            crearMesa(valor);
        })
    }
});