//Globales
let productos = [];
let carrito = [];
let comprasFinalizadas = [];


//captando desde html
let contenedorProductos;
let contenedorCarrito;
let contenedorFooterCarrito;


//funciones
function agregarProductoEnCarrito(producto) {
    let productoCarrito = {
        ...producto,
        cantidad: 1
    }
    carrito.push(productoCarrito);
}

// Funcion Crear cada carta de producto
function crearCardProducto(producto) {

    //boton
    let botonAgregar = document.createElement("button");
    botonAgregar.className = "btn btn-success";
    botonAgregar.innerText = "Agregar";

    //imagen
    let imagen = document.createElement("img");
    imagen.className = "cardImg-tamano";
    imagen.src = producto.imagen;
    imagen.alt = producto.nombre;

    //Otra informacion
    let nombre = document.createElement("h3")
    nombre.innerText = producto.nombre;

    let informacion = document.createElement("p");
    informacion.innerText = producto.informacion;

    let precio = document.createElement("p");
    precio.innerText = `$${producto.precio}`;

    //card
    let carta = document.createElement("div");
    carta.className = "card";

    //agregacion final
    carta.appendChild(imagen);
    carta.appendChild(nombre);
    carta.appendChild(informacion);
    carta.appendChild(precio);
    carta.appendChild(botonAgregar);

    //preparacion de boton
    botonAgregar.onclick = () => {
        let productoExistente = carrito.find(item => item.id == producto.id);

        (productoExistente == undefined) ? agregarProductoEnCarrito(producto) : (productoExistente.cantidad++);
        
        //carga en localStorage
        localStorage.setItem("carrito", JSON.stringify(carrito));
        //alert("El producto " + producto.nombre + " fue agregado");
        Swal.fire(
            "Producto "+ producto.nombre,
            "Agregado exitosamente",
            "success"
        ); 
        
        dibujarCarrito();
    }
    return carta;
}


function dibujarCatalogoDeProductos() {

    //captando desde html
    contenedorProductos = document.getElementById("contenedorProductos");
    contenedorCarrito = document.getElementById("tablaBoby");
    contenedorFooterCarrito = document.getElementById("footerTabla");

    for (const prod of productos) {
        let productoAmostrar = crearCardProducto(prod);
        contenedorProductos.append(productoAmostrar);
    }
}


function dibujarCarrito() {
    let sumaTotalCarrito = 0;

    //desactivando o activando boton de finalizar compra
    finalizarCompra = document.getElementById("finalizar");
    (carrito.length == 0) ? finalizarCompra.className = "btn btn-success disabled" : finalizarCompra.className = "btn btn-success";

    finalizarCompra.onclick = () => {
        Swal.fire({
            title: 'Estas seguro que quieres terminar la compra?',
            text: "El precio final es de $" + sumaTotalCarrito,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, quiero pagar!'
          }).then((result) => {
              if (result.isConfirmed) {
                  Swal.fire({
                      title: 'Compra realizada con exito',
                      //'Puedes visualizar tus compras desde la opción "Mis compras"',
                      icon: 'success',
                      html: '<a href="./vistas/compras.html">Ir a mis compras</a> '
                  })
                  let compra = new Compra(carrito, sumaTotalCarrito);
                  //console.log("Fecha " + compra.fecha)
                  comprasFinalizadas.push(compra);
                  localStorage.setItem("compras", JSON.stringify(comprasFinalizadas));
                  carrito = [];
                  contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="5">Carrito vacio</th>`;
                  localStorage.removeItem("carrito");
                  dibujarCarrito();
              }
          })
    }

    //reinicio el contenedor para que no se repitan los elementos
    contenedorCarrito.innerHTML = "";

    carrito.forEach(elemento => {
        let renglonesCarrito = document.createElement("tr");
        let contenedorBotonEliminar = document.createElement("td");
        let botonEliminar = document.createElement("button");
        
        //para eliminar de carrito
        botonEliminar.innerHTML = `<i class="fa-sharp fa-solid fa-trash"></i>`;
        botonEliminar.className = "btn btn-danger";

        renglonesCarrito.innerHTML += `
            <th scope="row">${elemento.id}</th>
            <td>${elemento.nombre}</td>
            <td><input id="cantidad-producto-${elemento.id}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 70px;"/></td>
            <td>$${elemento.precio * elemento.cantidad}</td>
            `;

        //agrego el eliminar    
        contenedorBotonEliminar.appendChild(botonEliminar);
        renglonesCarrito.appendChild(contenedorBotonEliminar);

        //agrego toda la info
        contenedorCarrito.appendChild(renglonesCarrito);

        //Para el cambio manual de cantidades
        let cantidadElementos = document.getElementById(`cantidad-producto-${elemento.id}`);
        cantidadElementos.addEventListener("change", (e) => {
            let nuevaCantidad = e.target.value;
            elemento.cantidad = nuevaCantidad;

            //actualizo localStorage
            localStorage.setItem("carrito",JSON.stringify(carrito));
            dibujarCarrito();
        });

        //logica del eliminar
        botonEliminar.onclick = () => {
            Swal.fire({
                title: 'Producto ' + elemento.nombre,
                text: "Esta seguro que desea eliminarlo del carrito?",
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si, borrarlo!'
              }).then((result) => {
                if (result.isConfirmed) {
                    let indice = carrito.findIndex(prod => prod.id == elemento.id);
                    sumaTotalCarrito =- elemento.precio * elemento.cantidad;
                    carrito.splice(indice,1);
                    dibujarCarrito();
                    //actualizo localstorage
                    localStorage.setItem("carrito",JSON.stringify(carrito));
                    if (carrito.length == 0){
                        contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="5">Carrito vacio</th>`; 
                    }
                  Swal.fire(
                    'Borrado',
                    'El producto fue borrado exitosamente',
                    'success'
                  )
                }
              })
        }

        sumaTotalCarrito += elemento.precio * elemento.cantidad;

        contenedorFooterCarrito.innerHTML = (carrito.length > 0) 
        ? 
            `<th scope="row" colspan="5">Total = $${sumaTotalCarrito}</th>` 
        :
            `<th scope="row" colspan="5">Carrito vacio</th>`
    })
}

//funcion ordenar para los filtros
function ordenar() {
    let miSeleccion = document.getElementById("miSeleccion").value;
    if (miSeleccion =="menor") {
        productos.sort(function (a, b) {
            return a.precio - b.precio;
        });
    } else if (miSeleccion =="mayor") {
        productos.sort(function (a, b){
            return b.precio - a.precio;
        });    
    } else if (miSeleccion =="alfabetico") {
        productos.sort(function (a, b){
            return a.nombre.localeCompare(b.nombre);
        });
    } else if (miSeleccion == "sinFiltro") {
        obtenerProductosDesdeJson();
        contenedorProductos.innerHTML="";
        return productos;
    }

    contenedorProductos.innerHTML="";
    dibujarCatalogoDeProductos();
    dibujarCarrito();
}

//Funcion Principal
function main() {
    if (localStorage.getItem("carrito")){
        let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
        carritoLocalStorage.forEach(item => {
            carrito.push(item);
        });
    }
    if (localStorage.getItem("compras")){
        let comprasLocalStorageFinalizadas = JSON.parse(localStorage.getItem("compras"));
        comprasLocalStorageFinalizadas.forEach(item => {
            comprasFinalizadas.push(item);
        });
    } else {
        comprasFinalizadas = [];
    }

    //por defecto
    obtenerProductosDesdeJson();
    document.getElementById("miSeleccion").setAttribute("option", "pordefecto");
   
    //onchange para el caso de que cambie la opcion del "select"
    document.getElementById("miSeleccion").onchange=()=>ordenar();

}

//funcion para carga de productos a traves de json
async function obtenerProductosDesdeJson() {
    const urlJsonProductos = "productos.json";
    const respuesta = await fetch(urlJsonProductos);
    const datos = await respuesta.json();
    productos = datos;
    dibujarCatalogoDeProductos();
    dibujarCarrito();
}


//INVOCACION AL PROGRAMA PRINCIPAL
//Cuando el HTML está cargado
window.onload=()=>{
    main();
};