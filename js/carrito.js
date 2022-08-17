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

//funciones
function armarRetornarElementoCarrito(producto){
    let cardProductoCarrito = document.createElement("div");
    let cardProductoCarritoBody = document.createElement("div");
    cardProductoCarrito.className = "card cardProductoCarrito";
    cardProductoCarritoBody.className = "card-body cardProductoCarrito__body";
    
    cardProductoCarritoBody.innerHTML = `
        <h6 class="cardProductoCarrito__nombre">Nombre: ${producto.nombre}<h6/>
        <h6 class="cardProductoCarrito__informacion">Descripcion: ${producto.informacion}<h6/>
        <h6 class="cardProductoCarrito__precioTotal">PRECIO TOTAL: $${producto.precio}<h6/>
    `;

    cardProductoCarrito.appendChild(cardProductoCarritoBody);
    
    return cardProductoCarrito;
}

//operaciones necesarias al agregar un producto
function sumarProductoCarrito(producto) {
    carro.agregarProducto(producto);
    carro.incremetarCantidadItems();
    carro.actualizarPrecioTotal();
}

//agregar un producto a carrito
function agregarProductoCarrito(producto, indice) {
    let carrito = document.getElementById("carrito");
    let cantidadesProductosStock = document.getElementsByClassName("cantProducto");
    if (producto.hayStock()){
        sumarProductoCarrito(producto);
        producto.descontar();

        //mostrando carrito
        carritoActual.innerHTML = `<span>Total actual: ${carro.getPrecioTotal()}</span>`;

        //actualizo cantidades del stock de productos
        cantidadesProductosStock[indice].innerHTML = `<span>Cantidad: ${producto.getCantidad()}</span>`;

        let nuevoElementoCarrito = armarRetornarElementoCarrito(producto);
        carrito.appendChild(nuevoElementoCarrito);
    } else {
        alert("No hay stock de " + producto.getNombre());
    }
}

//variables globales
const carro = new Carrito();
let contenedorCarrito = document.getElementById("carrito");
let carroCompras = document.getElementById("totalCarrito");
let carritoActual = document.createElement("div");
const btnComprar = document.getElementsByClassName("agregar");

function main() {
    carritoActual.className = "mostrarCarrito";
    carritoActual.innerHTML = `<span>Total actual: ${carro.getPrecioTotal()}</span>`;
    carroCompras.appendChild(carritoActual);
    for (let index = 0; index < btnComprar.length; index++) {
        btnComprar[index].onclick = () => {
            agregarProductoCarrito(productos[index], index);
        }
    }    
}

//ejecucion de programa principal
main();








//--------- Boton de terminar compra -------

// const carritoTotal = document.getElementById("finalizarCompra");
// let finalizar = document.getElementById("finalizar");

// const dibujar = () => {
//     carritoTotal.innerHTML = `
//         <h4>${carro.getPrecioTotal()}</h4>
//     ` 
// } 

// finalizar.addEventListener('click', dibujar);
//----------- FIN CARRITO ------------------