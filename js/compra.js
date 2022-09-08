class Compra {
    constructor(productos, montoTotal){
        this.productos = productos;
        this.fecha = new Date().toDateString() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        this.montoTotal = parseFloat(montoTotal);   
    }
}