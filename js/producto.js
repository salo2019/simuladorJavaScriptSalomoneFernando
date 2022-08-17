class Producto {
    constructor(opcion, nombre, precio, cantidad, informacion,imagen){
        this.opcion = opcion; //podemos hacer esto antes de la carga
        this.nombre = nombre.toLowerCase();
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.informacion = informacion.toLowerCase(); 
        this.imagen = imagen;           
    }

    //metodos de clase
    getOpcion(){
        return this.opcion;
    }

    getNombre(){
        return this.nombre;
    }

    getCantidad(){
        return this.cantidad;
    }

    getOpcion(){
        return this.opcion;
    }

    descontar(){
        if ((this.cantidad) > 0) {
            this.cantidad -= 1;
        }
    }

    hayStock(){
        if (this.cantidad > 0){
            return true;
        } else {
            return false;
        }
    }

    setStock(cantidad){
        this.cantidad = cantidad;
    }
}

//Creacion de productos
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

//carga de productos en sistema
let productos = [];
productos.push(p1);
productos.push(p2);
productos.push(p3);

//Muestra de productos
let padreRaiz = document.getElementById("main__section");
padreRaiz.className = "cardContainer";

productos.forEach(p => {
    let container = document.createElement("div");
    container.className = "card";
    container.innerHTML =`
    <div class="cardImg"><img class="cardImg-tamano" src=${p.imagen} alt="imagen"></div>
    <h3>${p.nombre}</h3> 
    <p>Descripción: ${p.informacion}</p> 
    <h4>Precio: $${p.precio}</h4> 
    <span class="cantProducto">Cantidad: ${p.cantidad}</span>
    <button class="agregar btn btn-primary">Comprar</button>
    `;
    padreRaiz.appendChild(container);
})



//------------------------ FUNCIONES---------------------------------
function procesarPedido(producto, listaCarrito) {
    if (producto.hayStock()) {
        listaCarrito.push(producto);
        producto.descontar();
        alert(producto.nombre + " agregado");
    } else {
        alert(producto.nombre + " sin Stock");
    }
}

function imprimirProductos(listaProductos) {
    listaProductos.forEach((item) => {
        console.log("Nombre: " + item.nombre + " con un precio de: " + item.precio);        
    });
}

function reiniciarStock() {
    productos.map((p)=> p.setStock(4));
}

function buscarProducto(prod) {
    return productos.filter((p)=> (p.nombre.toLowerCase()).includes(prod))
}