class Carrito {
    constructor(){
        this.productos = [];
        this.precioTotal = 0;
        this.cantidadItems = 0;
    }

    //metodos de clase
    actualizarPrecio(precio){
        this.precioTotal += precio;
    }

    incremetarCantidadItems(){
        this.cantidadItems += 1;
    }

    decrementarCantidadItems(){
        this.cantidadItems -= 1;
    }

    agregarProducto(producto){
        this.productos.push(producto);
    }

    setProductos(productos){
        this.productos = productos;
    }

    setCantidad(cantidadItems){
        this.cantidadItems = cantidadItems;
    }

    getCantidadItems(){
        return this.cantidadItems;
    }

    actualizarPrecioTotal(){
        this.precioTotal = this.productos.reduce((suma, item) => suma + item.precio, 0);
    }

    getProductos(){
        return this.productos;
    }

    getPrecioTotal(){
        return this.precioTotal;
    }
}

//operaciones necesarias al agregar un producto
function sumarProductoCarrito(producto) {
    carro.agregarProducto(producto);
    carro.incremetarCantidadItems();
    carro.actualizarPrecioTotal();
}

//agregar un producto a carrito
function agregarProductoCarrito(producto) {
    //let cantidadesProductosStock = document.getElementsByClassName("cantProducto");


    if (producto.hayStock()){
        document.getElementById("tablaBoby").innerHTML += `
        <tr>
            <td>${producto.nombre}</td>
            <td>${producto.precio}</td>
        </tr>
        `;
        producto.descontar();
        sumarProductoCarrito(producto);
        localStorage.setItem("carrito",JSON.stringify(carro.getProductos()));

        // let productoBuscado = productos.find((prod) => {
        //     prod.nombre === producto.nombre;
        // });

        // productoBuscado.actualizarCantidad(producto.cantidad);

        //mostrando carrito
        carritoActual.innerHTML = `<span>Total actual: ${carro.getPrecioTotal()}</span>`;
    } else {
        alert("No hay stock de " + producto.getNombre());
    }
}

function actualizarCantidadProductos(productosCarrito) {
    for (let prodClase in productos) {
        for (let prodCarro in productosCarrito) {
            if (prodClase.opcion == prodCarro.opcion) {
                prodClase.actualizarCantidad(prodCarro.cantidad);
            }
        }
    }    
}



//variables globales
const carro = new Carrito();

//para el total--
let carroCompras = document.getElementById("totalCarrito");
let carritoActual = document.createElement("div");

function main() {
    //localStorage
    if (localStorage.getItem("carrito")){
        let lista = [];
        let productosLocalStorage = JSON.parse(localStorage.getItem("carrito"));


        productosLocalStorage.forEach((p) => {
            document.getElementById("tablaBoby").innerHTML += `
            <tr>
                <td>${p.nombre}</td>
                <td>${p.precio}</td>
            </tr>
            `;
        });

        productosLocalStorage.forEach((p) => {
            let producto = new Producto ( 
                p.opcion, 
                p.nombre,
                p.precio,
                p.cantidad,
                p.informacion,
                p.imagen    
            )         
            lista.push(producto);   
        })

        carro.setProductos(lista);
        carro.actualizarPrecioTotal();
        carro.setCantidad(lista.length);

        actualizarCantidadProductos(carro.getProductos);


        // let cantidades = document.getElementsByClassName("cantProducto");
        
        // for (const p of productos) {
        //     p.descontar();
        //     console.log("Los productos son: " + JSON.stringify(productos));
        //     let productoBuscado = productos.find((prod) => {
        //         prod.getOpcion() == p.getOpcion();
        //     });
        //     console.log("Producto encontrado es : "+ productoBuscado);
        //     productoBuscado.cantidad -= 1;
        //     let idProducto = productos.indexOf(producto);
        //     cantidades[idProducto].innerHTML = producto.getCantidad();
        // }
    }

    console.log(carro.getProductos());

    carritoActual.className = "mostrarCarrito";
    carritoActual.innerHTML = `<span>Total actual: ${carro.getPrecioTotal()}</span>`;
    carroCompras.appendChild(carritoActual);
    
    //eventos / Escucha de cada boton de producto
    productos.forEach(p => {
        //evento individual por cada boton
        document.getElementById(`btn${p.opcion}`).addEventListener("click", function(){
            agregarProductoCarrito(p);
        });
    });
}

//ejecucion de programa principal
main();