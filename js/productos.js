class Producto {
    constructor(id, nombre, precio, cantidad, informacion,imagen){
        this.id = id;
        this.nombre = nombre.toLowerCase();
        this.precio = parseFloat(precio);
        this.cantidad = parseInt(cantidad);
        this.informacion = informacion.toLowerCase(); 
        this.imagen = imagen;           
    }

    //metodos de clase
    getId(){
        return this.id;
    }

    getNombre(){
        return this.nombre;
    }

    getCantidad(){
        return this.cantidad;
    }

    descontar(){
        if ((this.cantidad) > 0) {
            this.cantidad -= 1;
            return true;
        }
        return false;
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

    actualizarCantidad(cantidad){
        this.cantidad -= cantidad;
    }
}