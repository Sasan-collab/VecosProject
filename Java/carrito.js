// === VARIABLES ===
const btnsAgregar = document.querySelectorAll(".agregar");
const listaCarrito = document.querySelector("#listaCarrito");
const totalTexto = document.querySelector("#total");
const popup = document.querySelector("#popupCarrito");
const btnCarrito = document.querySelector("#btnCarrito");
const cerrar = document.querySelector(".cerrar");
const vaciarBtn = document.querySelector("#vaciarCarrito");

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// === FUNCIONES ===
function actualizarCarrito() {
    listaCarrito.innerHTML = "";
    let total = 0;

    carrito.forEach((item, index) => {
        const li = document.createElement("li");
        li.innerHTML = `
            ${item.nombre} - ${item.precio}
            <button onclick="eliminar(${index})">❌</button>
        `;
        listaCarrito.appendChild(li);

        total += item.precioNum;
    });

    totalTexto.textContent = `Total: $${total.toLocaleString()}`;
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

function eliminar(i) {
    carrito.splice(i, 1);
    actualizarCarrito();
}

btnsAgregar.forEach(btn => {
    btn.addEventListener("click", e => {
        const item = e.target.closest(".menu-item");
        const nombre = item.querySelector("h3").textContent;
        const precioTexto = item.querySelector(".precio").textContent;
        const precioNum = parseInt(precioTexto.replace(/[^0-9]/g, ""));
        carrito.push({ nombre, precio: precioTexto, precioNum });
        actualizarCarrito();
        mostrarNotificacion(`${nombre} agregado al carrito 🛒`);
    });
});

vaciarBtn.addEventListener("click", () => {
    carrito = [];
    actualizarCarrito();
});

// === POPUP ===
btnCarrito.addEventListener("click", () => {
    popup.style.display = "flex";
    actualizarCarrito();
});
cerrar.addEventListener("click", () => popup.style.display = "none");
window.addEventListener("click", e => {
    if (e.target === popup) popup.style.display = "none";
});

// === FUNCIÓN DE NOTIFICACIÓN ===
function mostrarNotificacion(texto) {
    const notificacion = document.getElementById("notificacion");
    notificacion.textContent = texto;
    notificacion.classList.add("mostrar");
    setTimeout(() => {
        notificacion.classList.remove("mostrar");
    }, 2000); // desaparece después de 2 segundos
}
