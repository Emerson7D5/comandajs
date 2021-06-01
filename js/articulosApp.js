var nombre = localStorage.getItem("secciones");
const secciones = JSON.parse(nombre);

const showOrdenEnProcesoInit = () => {

    var ordenEnProceso = JSON.parse(localStorage.getItem("ordenEnProceso"));

    const labelSala = document.getElementById("lblSala");
    const labelMesa = document.getElementById("lblMesa");
    const labelCliente = document.getElementById("lblCodCliente");
    labelSala.innerHTML = localStorage.getItem("salaid"); //ordenEnProceso.sala;
    labelMesa.innerHTML = localStorage.getItem("mesa"); //ordenEnProceso.mesa;
    labelCliente.innerHTML = localStorage.getItem("cliente"); //ordenEnProceso.codcliente;

    var platos = ordenEnProceso.platos;

    const listadoProceso = document.getElementById("ordenList");
    platos.forEach((platoAgregado, index) => {

        console.log("Mostrar Plato");
        const itemLista = document.createElement("li");
        itemLista.className = "list-group-item d-flex justify-content-between align-items-start";

        const divDetalle = document.createElement("div");
        divDetalle.className = "ms-2 me-auto";

        const divPlato = document.createElement("div");
        divPlato.className = "fw-bold";
        divPlato.innerHTML = platoAgregado.descripcion;

        divDetalle.appendChild(divPlato);

        const cantidadPlato = document.createElement("span");
        cantidadPlato.className = "badge bg-primary rounded-pill";
        cantidadPlato.innerHTML = platoAgregado.cantidadComprada;

        const btnEliminar = document.createElement("a");
        btnEliminar.className = "btn bg-warning";
        btnEliminar.setAttribute('onClick', 'deletePlatoCarrito(' + platoAgregado.codArticulo + ', ' + index + ')');
        btnEliminar.innerHTML = "Eliminar";

        if (platoAgregado.impreso == "N") {
            itemLista.appendChild(btnEliminar);
        }

        itemLista.appendChild(divDetalle);
        itemLista.appendChild(cantidadPlato);

        listadoProceso.appendChild(itemLista);
    })

    const listadoProceso2 = document.getElementById("ordenList2");
    listadoProceso2.innerHTML = listadoProceso.innerHTML;
}
showOrdenEnProcesoInit();
const setListadoPlatos = (plato) => {
    //<div class="cart-items bg-white position-relative border-bottom">
    var ListaPlatos = document.getElementById("dvListaPlatos");
    var dvPrincipal = document.createElement("div");
    dvPrincipal.className = "cart-items bg-white position-relative border-bottom";
    //<div class="d-flex  align-items-center p-3">
    var dvSegundo = document.createElement("div");
    dvSegundo.className = "d-flex  align-items-center p-3";

    // <a href="#"><img src="img/categorie/fast-food.svg" class="img-fluid"></a>
    var hrefUno = document.createElement("h");
    hrefUno.setAttribute('href', '#');

    var imgUno = document.createElement("img");
    imgUno.className = "img-fluid";
    imgUno.setAttribute('src', 'img/categorie/fast-food.svg');

    hrefUno.appendChild(imgUno);

    //<a href="#" class="ml-3 text-dark text-decoration-none w-100">
    var hrefDos = document.createElement("a");
    hrefDos.setAttribute('href', '#');
    hrefDos.className = "ml-3 text-dark text-decoration-none w-100";

    //Los siguientes elementos se agregaran a hrefDos
    //  <h5 class="mb-1">SAND GRA SUP-ESPE</h5>

    var nombreProducto = document.createElement("h5");
    nombreProducto.innerHTML = plato.descripcion;
    nombreProducto.className = "mb-1";
    hrefDos.appendChild(nombreProducto);
    //  <p class="text-muted mb-2"> F01019</p>
    var precioProducto = document.createElement("p");
    precioProducto.innerHTML = plato.referencia;
    precioProducto.className = "mb-1";
    hrefDos.appendChild(precioProducto);

    //    <div class="d-flex align-items-center">
    var dvTercero = document.createElement("div");
    dvTercero.className = "d-flex align-items-center";

    //Los siguientes elementos se agregaran a dvTercero
    //<p class="total_price font-weight-bold m-0">17,500.00</p>
    var precioProducto = document.createElement("p");
    precioProducto.innerHTML = plato.valor;
    precioProducto.className = "total_price font-weight-bold m-0";
    dvTercero.appendChild(precioProducto);

    //<div class="input-group input-spinner ml-auto cart-items-number">
    var dvCuarto = document.createElement("div");
    dvCuarto.className = "input-group input-spinner ml-auto cart-items-number";

    //Los siguientes elementos se agregaran a dvCuarto
    //<input type="text" class="form-control" value="1">
    var inputCantidad = document.createElement("input");
    inputCantidad.className = "form-control";
    inputCantidad.setAttribute('type', 'number');
    inputCantidad.setAttribute('placeHolder', '0');
    inputCantidad.setAttribute('value', '1');
    inputCantidad.setAttribute('id', "pId_" + plato.codarticulo);
    inputCantidad.setAttribute('min', '0');
    inputCantidad.setAttribute('max', '99');

    var btnAgregar = document.createElement("a");
    btnAgregar.className = "btn";
    var setComplementos = "N";
    if (plato.nummodificadores > 0) {
        btnAgregar.setAttribute('data-toggle', 'modal');
        btnAgregar.setAttribute('data-target', '#modalComplementos');
        btnAgregar.setAttribute('data-complementos', 'S');
        setComplementos = "S";
    } else {
        btnAgregar.setAttribute('data-complementos', 'N');
    }
    btnAgregar.setAttribute('onClick', 'setPlatoCarrito("' + parseInt(plato.codarticulo) + '", "' + plato.descripcion + '","' + setComplementos + '")');

    btnAgregar.innerText = '>';

    dvCuarto.appendChild(inputCantidad);
    dvCuarto.appendChild(btnAgregar);

    dvTercero.appendChild(dvCuarto);

    dvSegundo.appendChild(hrefUno);
    dvSegundo.appendChild(hrefDos);
    hrefDos.appendChild(dvTercero);
    dvPrincipal.appendChild(dvSegundo);
    ListaPlatos.appendChild(dvPrincipal);
}

const getUrlParameters = () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const codFavoritoParam = urlParams.get('codFavorito')
    localStorage.setItem("favoritoId", codFavoritoParam);
    const favSeleccionado = secciones.filter(x => x.codfavorito === parseInt(codFavoritoParam));
    const favDescripcion = favSeleccionado[0].descripcion;
    const articulosFav = favSeleccionado[0].articulos;
    var tituloFav = document.getElementById("favSel")
    tituloFav.innerHTML = favDescripcion;
    localStorage.setItem("articulosFav", JSON.stringify(articulosFav));
    articulosFav.forEach((articulo) => {
        setListadoPlatos(articulo);
    })
}

getUrlParameters();


const getSeccionesList = () => {

    const secciones = JSON.parse(localStorage.getItem("secciones"));
    var ulListSecciones = document.getElementById("listSecciones");
    secciones.forEach(function(unaSeccion) {
        var elSeccionli = document.createElement("li");
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

getSeccionesList();