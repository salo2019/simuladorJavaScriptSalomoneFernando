//Globales

const productos = [];
const carrito = [];

//captando desde html
const contenedorProductos = document.getElementById("contenedorProductos");
const contenedorCarrito = document.getElementById("tablaBoby");
const contenedorFooterCarrito = document.getElementById("footerTabla");


//Funcion creacion de productos
function cargarProductos() {
    const p1 = new Producto ( 
        "1", 
        "Notebook Intel",
        100000,
        4,
        "Notebook con procesador i5-1010 con 8gb de RAM y 500gb hdd",
        "/asset/notebook-removebg-preview.png"    
    )
    
    const p2 = new Producto ( 
        "2", 
        "Mini Pc Intel",
        85000,
        5,
        "MiniPc Intel con procesador i7-1010 con 8gb de RAM y 259gb ssd",
        "/asset/miniPcIntel-removebg-preview.png"
    )
    
    const p3 = new Producto ( 
        "3", 
        "Mini Pc Amd",
        80000,
        3,
        "MiniPc AMD con procesador Ryzen 5 3600 con 8gb de RAM y 259gb ssd",
        "/asset/miniPcAmd-removebg-preview.png"
    )
    
    //Agrega los productos
    productos.push(p1);
    productos.push(p2);
    productos.push(p3);    
}

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
    productos.forEach(p => {
        let productoAmostrar = crearCardProducto(p);
        contenedorProductos.append(productoAmostrar);
    });
}


function dibujarCarrito() {
    let sumaTotalCarrito = 0;

    //reinicio el contenedor para que no se repitan los elementos
    contenedorCarrito.innerHTML = "";

    carrito.forEach(elemento => {
        let renglonesCarrito = document.createElement("tr");
        let contenedorBotonEliminar = document.createElement("td");
        let botonEliminar = document.createElement("button");
        
        //para eliminar de carrito
        botonEliminar.innerText = "Eliminar";
        botonEliminar.className = "btn btn-danger";

        renglonesCarrito.innerHTML += `
            <td>${elemento.id}</td>
            <td>${elemento.nombre}</td>
            <td><input id="cantidad-producto-${elemento.id}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 70px;"/></td>
            <td>$${elemento.precio}</td>
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

        //logica del eliminar --> EN PROCESO....
        botonEliminar.onclick = () => {
            //alert(`Elemento ${elemento.nombre} para ser eliminado`);
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

//Funcion Principal
function main() {
    if (localStorage.getItem("carrito")){
        let carritoLocalStorage = JSON.parse(localStorage.getItem("carrito"));
        carritoLocalStorage.forEach(item => {
            carrito.push(item);
        });
        dibujarCarrito();
    }
    cargarProductos()
    dibujarCatalogoDeProductos();    
}

//Invocacion principal
main();