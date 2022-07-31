class Producto {
    constructor(opcion, nombre, precio, cantidad, informacion){
        this.opcion = opcion; //podemos hacer esto antes de la carga
        this.nombre = nombre.toLowerCase();
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.informacion = informacion.toLowerCase(); 
        this.vendido = false;           
    }

    //metodos de clase
    cambiarAVendido(){
        this.vendido = true;
    }

    cambiarADisponible(){
        this.vendido = false;
    }

    descontar(){
        if ((this.cantidad) > 0) {
            this.cantidad -= 1;
        }
    }

    getNombre(){
        return this.nombre;
    }

    getOpcion(){
        return this.opcion;
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
    "Notebook con procesador i5-1010 con 8gb de RAM y 500gb hdd"
)

const p2 = new Producto ( 
    "2", 
    "Mini Pc Intel",
    85000,
    4,
    "MiniPc con procesador i7-1010 con 8gb de RAM y 259gb ssd"
)

const p3 = new Producto ( 
    "3", 
    "Mini Pc Amd",
    80000,
    4,
    "MiniPc con procesador i7-1010 con 8gb de RAM y 259gb ssd"
)

//variables globales
let productos = [];
let carrito = [];

//carga de productos en sistema
productos.push(p1);
productos.push(p2);
productos.push(p3);


//funciones
function procesarPedido(producto, carrito) {
    if (producto.hayStock()) {
        carrito.push(producto);
        producto.descontar();
        alert(producto.nombre + " agregado");
    } else {
        alert(producto.nombre + " sin Stock");
    }
}

function mostrarProductos() {
    console.log("-------- Productos ---------")
    productos.forEach(p => { 
        console.log(p.getOpcion() + ": " + p.getNombre());
    }) + console.log("\n----------------------------");
}

function otrasOpciones() {
    console.log("\n4: Boton de arrepentimiento\n5: Buscar producto\n\n0: Finalizar compra y salir");
}

function menu() {
    //muestro opciones de menu. Ejemplo, muestro los nombres
    console.log("************ MENU ************** ");
    mostrarProductos();
    otrasOpciones();
    console.log("******************************** ");
    console.log("");
    console.log("-------------------CARRITO---------------------");
    if (carrito.length > 0) {
        imprimirProductos(carrito);
    }
    console.log("-----------------------------------------------");
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

//principal
function main() {
    let opcion;
    let buscar;
    let encontrados = [];
    menu();
    opcion = prompt("Seleccione la opcion deseada: ");
    while (opcion != "0") {
        switch (opcion) {
            case "1":
                procesarPedido(p1, carrito)
                //carrito.push(p1);
                break;
            case "2":
                procesarPedido(p2, carrito)
                //carrito.push(p2);
                break;
            case "3":
                procesarPedido(p3, carrito)
                //carrito.push(p3);
                break;
            case "4":
                carrito = [];
                reiniciarStock();
                alert("Su carrito fue vaciado. Nada que cobrar!");
                break;
            case "5":
                buscar = prompt("Nombre de producto a buscar: ");
                encontrados = buscarProducto(buscar.toLowerCase())
                if (encontrados != []) {
                    console.log("<<<<<< Productos encontrados >>>>>>> ")
                    imprimirProductos(encontrados);
                    console.log("<<<<<<<<<<<<<<<<<>>>>>>>>>>>>\n\n")
                } else {
                    console.log("No existe el producto");
                }
                break;
            default:
                alert("Opcion incorrecta. Vuelva a intentarlo");
                break;
        }
        menu();
        opcion = prompt("Seleccione la opcion deseada: ");
    }

    if (opcion == 0) {
        alert("--------- COMPRA FINALIZADA ------------");
    }

    if (carrito.length > 0) {
        let total = carrito.reduce((suma, elemento) => suma + elemento.precio, 0);
        console.log("___________________________________________");
        console.log("El precio total del carrito es: $" + total);
        console.log("___________________________________________");
    } else {
        console.log("No tiene productos en el carrito")
    }
}

//Ejecucion
main();