// class Carrito {
//     constructor(){
//         this.productos = [];
//         this.precioTotal = 0;
//         this.cantidadItems = 0;
//     }

//     //metodos de clase
//     actualizarPrecio(precio){
//         this.precioTotal += precio;
//     }

//     incremetarCantidadItems(){
//         this.cantidadItems += 1;
//     }

//     decrementarCantidadItems(){
//         this.cantidadItems -= 1;
//     }

//     agregarProducto(producto){
//         this.productos.push(producto);
//     }

//     setProductos(productos){
//         this.productos = productos;
//     }

//     setCantidad(cantidadItems){
//         this.cantidadItems = cantidadItems;
//     }

//     getCantidadItems(){
//         return this.cantidadItems;
//     }

//     actualizarPrecioTotal(){
//         this.precioTotal = this.productos.reduce((suma, item) => suma + item.precio, 0);
//     }

//     getProductos(){
//         return this.productos;
//     }

//     getPrecioTotal(){
//         return this.precioTotal;
//     }
// }

class Carrito {
    constructor(producto, cantidad) {
        this.producto = producto;
        this.cantidad = cantidad;
    }
}