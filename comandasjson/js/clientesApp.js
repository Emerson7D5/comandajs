import { getClientes } from './clientes.js';
import { getSecciones } from './secciones.js';

const { clientes } = getClientes;
const { secciones } = getSecciones;
const getClientesList = () => {
    var ulClientesList = document.getElementById("listaClientes");
    //const clientesList = clientes.map(c => c.nombrecliente);
    clientes.forEach(function(unCliente) {
        var elClienteli = document.createElement("li");
        elClienteli.setAttribute('onClick', 'fnClickCliente("' + unCliente.nombrecliente + '")');
        var elClienteHref = document.createElement("a");
        elClienteHref.innerHTML = unCliente.nombrecliente; ///+ ' - ' + unCliente.telefono1;
        elClienteli.appendChild(elClienteHref);
        ulClientesList.appendChild(elClienteli);
    });

}
const getSeccionesList = () => {
    var ulListSecciones = document.getElementById("listSecciones");
    //const clientesList = clientes.map(c => c.nombrecliente);
    secciones.forEach(function(unaSeccion) {
        var elSeccionHref = document.createElement("a");
        elSeccionHref.className = "text-decoration-none text-dark";
        elSeccionHref.setAttribute('href', 'mesasArticulos.html?codFavorito=' + unaSeccion.codfavorito);
        var elSeccionli = document.createElement("li");
        elSeccionli.className = "border-bottom bg-white d-flex align-items-center p-3";

        var elSeccionI = document.createElement("i");
        elSeccionI.className = "icofont-info-circle osahan-icofont bg-primary";
        elSeccionI.innerHTML = unaSeccion.descripcion; ///+ ' - ' + unCliente.telefono1;

        var span = document.createElement("span");
        span.className = "badge badge-success p-1 badge-pill ml-auto";

        var elSeccionII = document.createElement("i");
        elSeccionII.className = "icofont-simple-right";

        elSeccionli.appendChild(elSeccionI);
        elSeccionli.innerHTML = unaSeccion.descripcion;
        elSeccionli.appendChild(span);
        elSeccionli.appendChild(elSeccionII);
        elSeccionHref.appendChild(elSeccionli);
        ulListSecciones.appendChild(elSeccionHref);
    });

}
getClientesList();
getSeccionesList();