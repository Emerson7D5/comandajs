//import { getClientes } from './clientes.js';
//import { getSecciones } from './secciones.js';
import { getUrlApi } from './genericfunctions.js';
const { servidorApi, servidorPrint } = getUrlApi;
localStorage.setItem("servidorPrint", servidorPrint);

const btnAperturarMesa = document.getElementById("btnAperturarMesa");
btnAperturarMesa.setAttribute("disabled", "disabled");


const getClientesList = (clientes) => {
    var ulClientesList = document.getElementById("listaClientes");
    clientes.forEach(function(unCliente) {
        var elClienteli = document.createElement("li");
        elClienteli.setAttribute('onClick', 'fnClickCliente("' + unCliente.codcliente + '")');
        elClienteli.setAttribute('data-toggle', "modal");
        elClienteli.setAttribute('data-target', "#modalCategorias")
        var elClienteHref = document.createElement("a");
        elClienteHref.setAttribute("id", unCliente.codcliente);
        elClienteHref.innerHTML = unCliente.nombrecliente; ///+ ' - ' + unCliente.telefono1;
        elClienteli.appendChild(elClienteHref);
        ulClientesList.appendChild(elClienteli);
    });

}

const getSeccionesList = (secciones) => {
    var ulListSecciones = document.getElementById("listaSecciones");
    secciones.forEach(function(unaSeccion) {
        // var elSeccionHref = document.createElement("a");
        // elSeccionHref.className = "text-decoration-none text-dark";
        // elSeccionHref.setAttribute('href', 'mesasArticulos.html?codFavorito=' + unaSeccion.codfavorito);
        // var elSeccionli = document.createElement("li");
        // elSeccionli.className = "border-bottom bg-white d-flex align-items-center p-3";

        // var elSeccionI = document.createElement("i");
        // elSeccionI.className = "icofont-info-circle osahan-icofont bg-primary";
        // elSeccionI.innerHTML = unaSeccion.descripcion; ///+ ' - ' + unCliente.telefono1;

        // var span = document.createElement("span");
        // span.className = "badge badge-success p-1 badge-pill ml-auto";

        // var elSeccionII = document.createElement("i");
        // elSeccionII.className = "icofont-simple-right";

        // elSeccionli.appendChild(elSeccionI);
        // elSeccionli.innerHTML = unaSeccion.descripcion;
        // elSeccionli.appendChild(span);
        // elSeccionli.appendChild(elSeccionII);
        // elSeccionHref.appendChild(elSeccionli);
        // ulListSecciones.appendChild(elSeccionHref);

        var elSeccionli = document.createElement("li");
        elSeccionli.setAttribute('onClick', 'fnSeleccionarCategoria("' + unaSeccion.codfavorito + '")');
        elSeccionli.className = "list-group-item text-decoration-none text-dark";
        var elSeccionHref = document.createElement("a");
        elSeccionHref.setAttribute('href', 'mesasArticulos.html?codFavorito=' + unaSeccion.codfavorito);
        elSeccionHref.setAttribute("id", unaSeccion.codfavorito);
        elSeccionHref.className = "list-group-item text-decoration-none text-dark border-bottom bg-white d-flex align-items-center p-3";
        elSeccionHref.innerHTML = unaSeccion.descripcion; ///+ ' - ' + unCliente.telefono1;
        //elSeccionli.appendChild(elSeccionHref);
        ulListSecciones.appendChild(elSeccionHref);

    });

}

const fetchClientes = async() => {
    try {
        const clientesListApi = await fetch(servidorApi + 'clientes')
            .then((response) => {
                return response.json(); //Se serializa desde el json
            })
            .then((myJson) => {
                const { clientes } = myJson; //El array del json se obtiene la seccion de requerida 
                return clientes;
            });
        getClientesList(clientesListApi);
    } catch (error) { // catch block for network errors
        console.log("Error obtencion de CLIENTES desde la API");
        console.log(error);
    }
}

const fetchSecciones = async() => {
    try {
        const seccionesListApi = await fetch(servidorApi + 'secciones')
            .then((response) => {
                return response.json(); //Se serializa desde el json
            })
            .then((myJson) => {
                const { secciones } = myJson; //El array del json se obtiene la seccion de requerida                 
                localStorage.setItem("secciones", JSON.stringify(secciones));
                return secciones;
            });
        getSeccionesList(seccionesListApi);
    } catch (error) { // catch block for network errors
        console.log("Error obtencion de SECCIONES desde la API");
        console.log(error);
    }
}

fetchClientes();
fetchSecciones();