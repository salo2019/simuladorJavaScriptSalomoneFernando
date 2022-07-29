// --------- metodos importantes --------------

// cadena.toUpperCase() -> todo a mayuscula
// cadena.toLowerCase() -> todo a minuscula
// cadena.length() -> tamanio de cadena

// Propiedad IN
// variable in objeto; -> preguntamos si esa variable existe en el objeto como variable de instancia (True o false)

// Propiedad for .. in  -> permite recorrer el objeto
// for (let item in objeto){
//     console.log("Propiedad " + item);
//     console.log("Valor " + objeto[item])
// }


//Funcion constructora sin usar class

// function Producto(categoria, nombre, precio, informacion) {
//     this.categoria = categoria;
//     this.nombre = nombre;
//     this.precio = precio;
//     this.informacion = informacion;


    //aca se podrian agregar metodos propias de la funcion
    //....
//}



//Utilizando Class (La que mas me convence)

class Producto {
    constructor(categoria, nombre, precio, cantidad, informacion){
        this.categoria = categoria.toLowerCase(); //podemos hacer esto antes de la carga
        this.nombre = nombre.toLowerCase();
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.informacion = informacion.toLowerCase(); 
        this.vendido = false;           
    }

    //metodos de clase
    mostrarProducto(){
        for (let p in this){
            console.log("Propiedad: " + p);
            console.log("Valor: " + this[p])
        }
    }

    cambiarAvendido(){
        this.vendido = true;
    }

    cambiarAdisponible(){
        this.vendido = false;
    }

    descontarCantidad(cant){
        if ((this.cantidad - cant) > 0) {
            this.cantidad -= cant;
        }
    }

}

class Venta {
    constructor(productos, precio, fecha){
        this.productos = productos;
        this.precio = precio;
        this.fecha = fecha
    }
}


//Creando objetos de tipo producto
const p1 = new Producto ( 
    "notebook", 
    "Notebook Intel",
    100000,
    5,
    "Notebook con procesador i5-1010 con 8gb de RAM y 500gb hdd"
)

const p2 = new Producto ( 
    "escritorio", 
    "Mini Pc Intel",
    85000,
    7,
    "MiniPc con procesador i7-1010 con 8gb de RAM y 259gb ssd"
)

const p3 = new Producto ( 
    "escritorio", 
    "Mini Pc Amd",
    80000,
    6,
    "MiniPc con procesador i7-1010 con 8gb de RAM y 259gb ssd"
)


//pruebas varias
p1.mostrarProducto();
p2.mostrarProducto();
p3.mostrarProducto();

//creando arreglo
const productos = []
const carrito = []

//agregando elementos
productos.push(p1);
productos.push(p2);
productos.push(p3);

console.log(productos);





