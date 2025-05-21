const apiBase = "https://pokeapi.co/api/v2/pokemon";
const contenedorLista = document.getElementById("pokemon-list");
const inputBusqueda = document.getElementById("search");
const todosLosPokemones = [];

const modal = document.getElementById("modal");
const cerrarModal = document.getElementById("cerrar");
const contenedorDetalle = document.getElementById("detalle");

cerrarModal.onclick = () => modal.style.display = "none";
window.onclick = (e) => { if (e.target == modal) modal.style.display = "none"; };

async function obtenerTodosLosPokemones(url = apiBase) {
  const respuesta = await fetch(url);
  const datos = await respuesta.json();
  todosLosPokemones.push(...datos.results);
  if (datos.next) await obtenerTodosLosPokemones(datos.next);
  mostrarLista(todosLosPokemones);
}

function mostrarLista(pokemones) {
  contenedorLista.innerHTML = "";
  pokemones.forEach(pokemon => {
    const div = document.createElement("div");
    div.textContent = pokemon.name;
    const boton = document.createElement("button");
    boton.textContent = "Ver detalles";
    boton.onclick = () => mostrarDetalles(pokemon.url);
    div.appendChild(boton);
    contenedorLista.appendChild(div);
  });
}

async function mostrarDetalles(url) {
  const respuesta = await fetch(url);
  const datos = await respuesta.json();

  const movimientos = datos.moves.map(m => m.move.name).join(", ");
  const estadisticas = datos.stats.map(e => `${e.stat.name}: ${e.base_stat}`).join("<br>");

  contenedorDetalle.innerHTML = `
    <h2>${datos.name}</h2>
    <strong>Movimientos:</strong><br>${movimientos}<br><br>
    <strong>Estadísticas:</strong><br>${estadisticas}
  `;

  modal.style.display = "block";
}

inputBusqueda.addEventListener("input", () => {
  const termino = inputBusqueda.value.toLowerCase();
  const filtrados = todosLosPokemones.filter(p => p.name.includes(termino));
  mostrarLista(filtrados);
});

obtenerTodosLosPokemones();