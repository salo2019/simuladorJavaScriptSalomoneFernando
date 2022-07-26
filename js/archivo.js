let cantidad = 0;
let precio = 0;
let total = 0;
let seleccionVacia = false;
let categoria;


//Funciones
const totalEleccion = () => {return precio * cantidad}

const mostrarCarrito = () => {return alert("El monto en carrito actual es $" + total + "\nSe sumaran $" + precio * cantidad)}

function elegirOpcion(){
    seleccionVacia = false;
    categoria = prompt("Elija opcion de producto\n1-Computador Escritorio Intel\n2-Computador Escritorio AMD\n3-Notebook AMD\n4-Limpiar carrito\n0-Finalizar\n\nTotal carrito $" + total);
}

function limpiarDatos() {
    total = 0;
    precio = 0;    
}

function procesarCantidad() {
    cantidad = prompt("Precio de eleccion $" + precio + "\nIngrese cantidad deseada: ");
}

function iniciarSimulador() {
    elegirOpcion();
    procesarOpcion();
    alert("Compra finalizada\n\nDetalle de Compra\nMonto actual en carrito: $" + total);
}

function procesarOpcion() {
    while (categoria != "0") {    
        switch (categoria) {
            case "1":
                precio = 55000;
                break;
            case "2":
                precio = 44000;
                break;
            case "3":
                precio = 100000;
                break;
            case "4":
                limpiarDatos();
                seleccionVacia = true;
                break;
            case "0":
                seleccionVacia = true;
                alert("Compra Finalizada");
                break;
            default:
                alert ("Opcion incorrecta. Vuelva a intentarlo");
                seleccionVacia = true;
                break;
        }
        if (!seleccionVacia) {
            procesarCantidad();
            console.log(mostrarCarrito());    
            total += totalEleccion();        
        }
        elegirOpcion();                    
    } 
}   

//Inicio de simulador
iniciarSimulador();