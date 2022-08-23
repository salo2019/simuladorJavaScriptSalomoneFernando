const productos = [];
const carrito = [];

//captando desde html
const contenedorProductos = document.getElementById("contenedorProductos");
const contenedorCarrito = document.getElementById("tablaBoby");
const contenedorFooterCarrito = document.getElementById("footerTabla");


//Creacion de productos
function cargarProductos() {
    const p1 = new Producto ( 
        "1", 
        "Notebook Intel",
        100000,
        4,
        "Notebook con procesador i5-1010 con 8gb de RAM y 500gb hdd",
        "../asset/notebook-removebg-preview.png"    
    )
    
    const p2 = new Producto ( 
        "2", 
        "Mini Pc Intel",
        85000,
        5,
        "MiniPc Intel con procesador i7-1010 con 8gb de RAM y 259gb ssd",
        "../asset/miniPcIntel-removebg-preview.png"
    )
    
    const p3 = new Producto ( 
        "3", 
        "Mini Pc Amd",
        80000,
        3,
        "MiniPc AMD con procesador Ryzen 5 3600 con 8gb de RAM y 259gb ssd",
        "../asset/miniPcAmd-removebg-preview.png"
    )
    
    //Agrega los productos
    productos.push(p1);
    productos.push(p2);
    productos.push(p3);    
}

function existe(producto) {
    let encontrado = carrito.find(item => {
        item.producto.id == producto.id;
    });
    return encontrado;
}


function crearCardProducto(producto) {
    let corte = false;

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
        carrito.forEach(item => {
            if (item.producto.id == producto.id) {
                item.cantidad += 1;
                corte = true;
            }
        });
        if (!corte) {
            let productoCarrito = new Carrito(producto, 1);
            carrito.push(productoCarrito);
        }

        localStorage.setItem("carrito", JSON.stringify(carrito));
        alert("El producto " + producto.nombre + " fue agregado");
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
            <td>${elemento.producto.id}</td>
            <td>${elemento.producto.nombre}</td>
            <td><input id="cantidad-producto-${elemento.producto.id}" type="number" value="${elemento.cantidad}" min="1" max="1000" step="1" style="width: 70px;"/></td>
            <td>${elemento.producto.precio * elemento.cantidad}</td>
            `;

        //agrego el eliminar    
        contenedorBotonEliminar.appendChild(botonEliminar);
        renglonesCarrito.appendChild(contenedorBotonEliminar);

        //agrego toda la info
        contenedorCarrito.appendChild(renglonesCarrito);

        //Para el cambio manual de cantidades
        let cantidadElementos = document.getElementById(`cantidad-producto-${elemento.producto.id}`);
        cantidadElementos.addEventListener("change", (e) => {
            let nuevaCantidad = e.target.value;
            elemento.cantidad = nuevaCantidad;
            localStorage.setItem("carrito",JSON.stringify(carrito));
            dibujarCarrito();
        });

        botonEliminar.onclick = () => {
            alert(`Elemento ${elemento.producto.nombre} para ser eliminado`);
        }

        sumaTotalCarrito += elemento.producto.precio * elemento.cantidad;

        if (carrito.length > 0){
            contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="5">Total = $${sumaTotalCarrito}</th>` 
        } else {
            contenedorFooterCarrito.innerHTML = `<th scope="row" colspan="5">Carrito vacio</th>`
        }

    })
}


function main() {
    //llamado a funciones
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

//principal
main();


//Muestra de productos en el index
// let padreRaiz = document.getElementById("main__section");
// padreRaiz.className = "cardContainer";
  
// productos.forEach(p => {
//     let container = document.createElement("div");
//     container.className = "card";
//     container.innerHTML =`
//     <div class="cardImg"><img class="cardImg-tamano" src=${p.imagen} alt="imagen"></div>
//     <h3>${p.nombre}</h3> 
//     <p>Descripción: ${p.informacion}</p> 
//     <h4>Precio: $${p.precio}</h4> 
//     <span class="cantProducto">Cantidad: ${p.cantidad}</span>
//     <button class="agregar btn btn-primary" id="btn${p.opcion}">Comprar</button>
//     `;
//     padreRaiz.appendChild(container);
// })


//------------------------ FUNCIONES---------------------------------
// function procesarPedido(producto, listaCarrito) {
//     if (producto.hayStock()) {
//         listaCarrito.push(producto);
//         producto.descontar();
//         alert(producto.nombre + " agregado");
//     } else {
//         alert(producto.nombre + " sin Stock");
//     }
// }

// function imprimirProductos(listaProductos) {
//     listaProductos.forEach((item) => {
//         console.log("Nombre: " + item.nombre + " con un precio de: " + item.precio);        
//     });
// }

// function reiniciarStock() {
//     productos.map((p)=> p.setStock(4));
// }

// function buscarProducto(prod) {
//     return productos.filter((p)=> (p.nombre.toLowerCase()).includes(prod))
// }

//operaciones necesarias al agregar un producto
// function sumarProductoCarrito(producto) {
//     carro.agregarProducto(producto);
//     carro.incremetarCantidadItems();
//     carro.actualizarPrecioTotal();
// }

//agregar un producto a carrito
// function agregarProductoCarrito(producto) {

//     if (producto.hayStock()){
//         document.getElementById("tablaBoby").innerHTML += `
//         <tr>
//             <td>${producto.nombre}</td>
//             <td>${producto.precio}</td>
//         </tr>
//         `;
//         producto.descontar();
//         sumarProductoCarrito(producto);
//         localStorage.setItem("carrito",JSON.stringify(carro.getProductos()));

//         carritoActual.innerHTML = `<span>Total actual: ${carro.getPrecioTotal()}</span>`;
//     } else {
//         alert("No hay stock de " + producto.getNombre());
//     }
// }

// function actualizarCantidadProductos(productosCarrito) {
//     for (let prodClase in productos) {
//         for (let prodCarro in productosCarrito) {
//             if (prodClase.opcion == prodCarro.opcion) {
//                 prodClase.actualizarCantidad(prodCarro.cantidad);
//             }
//         }
//     }    
// }


//variables globales
// const carro = new Carrito();

//para el total--
// let carroCompras = document.getElementById("totalCarrito");
// let carritoActual = document.createElement("div");

// function main() {

//     if (localStorage.getItem("carrito")){
//         let productoCarrito;
//         let cantidadCarrito;
//         let lista = [];
//         let productoOriginal;
//         let productosLocalStorage = JSON.parse(localStorage.getItem("carrito"));

//         productosLocalStorage.forEach((p) => {
//             document.getElementById("tablaBoby").innerHTML += `
//             <tr>
//                 <td>${p.nombre}</td>
//                 <td>${p.precio}</td>
//             </tr>
//             `;
//             // lista.push(p);
//             productoCarrito = p.opcion;
//             cantidadCarrito = p.cantidad;
//             productos.forEach((prod) => {
//                 if (prod.opcion == productoCarrito) {
//                     prod.actualizarCantidad(cantidadCarrito);                          
//                 }

//             });
//         });

//         productosLocalStorage.forEach((p) => {
//             let producto = new Producto ( 
//                 p.opcion, 
//                 p.nombre,
//                 p.precio,
//                 p.cantidad,
//                 p.informacion,
//                 p.imagen    
//             )         
//             lista.push(producto);   
//         })
//         carro.setProductos(lista);
//         carro.actualizarPrecioTotal();
//         carro.setCantidad(lista.length);
//     }

//     console.log("Productos Carrito: " + carro.getProductos());
//     console.log("Productos originales: " + productos);


//     carritoActual.className = "mostrarCarrito";
//     carritoActual.innerHTML = `<span>Total actual: ${carro.getPrecioTotal()}</span>`;
//     carroCompras.appendChild(carritoActual);
    
//     //eventos / Escucha de cada boton de producto
//     productos.forEach(p => {
//         //evento individual por cada boton
//         document.getElementById(`btn${p.opcion}`).addEventListener("click", function(){
//                 agregarProductoCarrito(p);
//         });
//     });
// }

// //ejecucion de programa principal
// main();


