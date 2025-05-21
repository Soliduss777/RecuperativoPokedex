const apiBase = "https://pokeapi.co/api/v2/pokemon";
const contenedorLista = document.getElementById("pokemon-list");
const inputBusqueda = document.getElementById("search");
const todosLosPokemones = [];

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
    contenedorLista.appendChild(div);
  });
}

inputBusqueda.addEventListener("input", () => {
  const termino = inputBusqueda.value.toLowerCase();
  const filtrados = todosLosPokemones.filter(p => p.name.includes(termino));
  mostrarLista(filtrados);
});

obtenerTodosLosPokemones();