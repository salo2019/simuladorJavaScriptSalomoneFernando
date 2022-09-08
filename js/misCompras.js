//globales
let contenedorCompras;
let reglonesCompras;

function mostrarProductos(productos) {
    for (const prod of productos) {
        reglonesCompras.innerHTML += `
            <div class="card-body">
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">Nombre: ${prod.nombre}</li>
                    <li class="list-group-item">Cantidad: ${prod.cantidad}</li>
                    <li class="list-group-item">Precio unitario: ${prod.precio}</li>
                </ul>
            </div>
        `;
    }
}

function mostrarCompras(comprasFinalizadas) {
    contenedorCompras = document.getElementById("tablaBobyCompras");
    contenedorCompras.innerHTML = "";
    comprasFinalizadas.forEach(compra => {
        reglonesCompras = document.createElement("div");
        reglonesCompras.className = "card border-dark m-2";
        reglonesCompras.style = "width: 18rem;"    
        reglonesCompras.innerHTML += `
            <div class="card-header">
                <small><strong>Fecha de compra</strong></small>
                <h5 class="card-title">${compra.fecha}</h5>
            </div>            
        `;
        mostrarProductos(compra.productos);
        reglonesCompras.innerHTML += `
            <div class="card-footer ">
                <small><strong>Total abonado $${compra.montoTotal}</strong></small>
            </div>
        </div>`;
        contenedorCompras.appendChild(reglonesCompras);    
    })
}

function main() {
    if (localStorage.getItem("compras")){
        let comprasFinalizadas = JSON.parse(localStorage.getItem("compras"));
        mostrarCompras(comprasFinalizadas);    
    }
}

main();