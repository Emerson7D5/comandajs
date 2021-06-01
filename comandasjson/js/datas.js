import { getmesas } from './mesas.js';
import { getClientes } from './clientes.js'

const { mesas } = getmesas;
const { clientes } = getClientes;
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

// const getClientesList = () => {
//     ulClientesList = document.getElementById("clientesList");
//     //const clientesList = clientes.map(c => c.nombrecliente);
//     clientes.forEach(function(unCliente) {
//         const elCliente = document.createElement("li");
//         elCliente.innerHTML = unCliente.nombrecliente; ///+ ' - ' + unCliente.telefono1;
//         ulClientesList.appendChild(elCliente);
//     });

// }

getSalas();
//getClientesList();

const mesasSala = (idSala) => {
    // console.log("Filtrando mesas ");
    // console.log(idSala);
    const mesasEn = mesas.filter(mesa => mesa.sala === idSala);
    return mesasEn;
}

const crearMesa = (mesa) => {
    const { activa, codcliente, numesa, posx, posy, sala, tarifa, tipoobjeto } = mesa;
    var dvPadre = document.createElement("DIV");
    dvPadre.className = " pl-0 pr-1 py-1";

    var dvHijo = document.createElement("DIV");

    var link = document.createElement("A");
    link.setAttribute('href', '#');

    var img = document.createElement("IMG");
    img.className = 'img-fluid px-2'

    var nombreMesa = document.createElement("P");
    nombreMesa.className = 'm-0 pt-2 text-muted text-center'
    nombreMesa.innerHTML = 'Mesa ' + numesa;

    if (activa) {
        dvHijo.className = "bg-white shadow-sm rounded text-center  px-2 py-3 c-it";
        //link.setAttribute('data-toggle', 'modal');
        link.setAttribute('href', 'clientes.html?mesa=' + numesa);
        img.setAttribute('src', 'img/categorie/check-circled.svg');
    } else {
        dvHijo.className = "bg-mocaccine shadow-sm rounded text-center  px-2 py-3 c-it";
        img.setAttribute('src', 'img/categorie/ui-lock.svg');
    }


    link.appendChild(img);
    link.appendChild(nombreMesa);
    dvHijo.appendChild(link);
    dvPadre.appendChild(dvHijo);

    var x = document.getElementById("mesasList"); // Get the element with id="demo"    
    x.appendChild(dvPadre);
}


// document.getElementById('cliente').onkeyup = function() {
//     console.log($(this).val());
// }

$('#cbxSalas').on({
    "focus": function() {
        //console.log('clicked!', this, this.value);
        this.selectedIndex = -1;
    },
    "change": function() {
        var x = document.getElementById("mesasList"); // Get the element with id="demo"    
        x.innerHTML = "";
        const choice = $(this).val();
        const mesasList = mesasSala(parseInt(choice));
        // console.log(mesasList.sort((firstItem, secondItem) => firstItem.numesa - secondItem.numesa))
        mesasList.forEach(function(valor) {
            crearMesa(valor);
        })
    }
});