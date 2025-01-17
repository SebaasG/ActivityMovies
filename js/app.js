import { movies } from './data.js';
const { peliculas } = movies;

// Función que simula la carga de películas de forma asíncrona (como si vinieran de una API)
const fetchMovies = () => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            try {
                resolve(peliculas); 
            } catch (error) {
                reject("Error al cargar las películas");
            }
        }, 1000);
    });
};

// Función que renderiza las películas en el DOM
const renderMovies = (moviesList) => {
    return new Promise((resolve, reject) => {
        try {
            const movieContainer = document.getElementById("movieContainer");
            movieContainer.innerHTML = ''; 

            if (moviesList.length === 0) {
                // Mostrar mensaje cuando no hay películas que coincidan
                const noResultsMessage = document.createElement("div");
                noResultsMessage.classList.add("alert", "alert-warning", "text-center");
                noResultsMessage.textContent = "No se encontraron resultados para la búsqueda.";
                movieContainer.appendChild(noResultsMessage);
                resolve("No se encontraron películas");
                return;
            }

            moviesList.forEach((movie) => {
                const bodyElement = document.createElement("div");
                bodyElement.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "mb-4", "containerModal");

                bodyElement.innerHTML = /*html*/`
                    <div class="card cardMovie">
                        <img src="${movie.imagen}" class="card-img-top" alt="Imagen no disponible">
                        <div class="card-body text-center">
                            <h5 class="card-title">${movie.titulo}</h5> 
                            <p class="card-text">${movie.descripcion}</p>
                            <a href="#" class="btn btn-primary btnModal" data-id="${movie.id}" data-bs-toggle="modal" data-bs-target="#movieModal">Ver más</a>
                        </div>
                    </div>
                `;

                movieContainer.appendChild(bodyElement);
            });

            attachModalEvents();
            resolve("Películas renderizadas correctamente");
        } catch (error) {
            reject("Error al renderizar las películas: " + error.message);
        }
    });
};

const fillModal = (movieId) => {
    return new Promise((resolve, reject) => {
        try {
            const movie = peliculas.find(movie => movie.id === parseInt(movieId));
            if (!movie) {
                throw new Error("Película no encontrada");
            }

            // Asignación de elementos del modal
            const modalTitle = document.getElementById("modalTitle");
            const modalDescription = document.getElementById("modalDescription");
            const modalImage = document.getElementById("modalImage");
            const modalDuration = document.getElementById("modalDuration");
            const modalGenre = document.getElementById("modalGenre");
            const modalReleaseDate = document.getElementById("modalReleaseDate");
            const modalCast = document.getElementById("modalCast");

            // Llenado de contenido con subtítulos en negrilla
            modalTitle.textContent = movie.titulo;
            modalDescription.innerHTML = `<strong>Descripción:</strong> ${movie.descripcion}`;
            modalImage.src = movie.imagen;
            modalDuration.innerHTML = `<strong>Duración:</strong> ${movie.duracion}`;
            modalGenre.innerHTML = `<strong>Género:</strong> ${movie.genero}`;
            modalReleaseDate.innerHTML = `<strong>Fecha de lanzamiento:</strong> ${movie.fechaLanzamiento}`;
            modalCast.innerHTML = `<strong>Reparto:</strong> ${movie.reparto.join(", ")}`;

            resolve("Modal llenado correctamente");
        } catch (error) {
            reject("Error al llenar el modal: " + error.message);
        }
    });
};

// Función para filtrar las películas según la búsqueda
const filterMovies = (query) => {
    return new Promise((resolve, reject) => {
        try {
            const filtered = peliculas.filter(movie => 
                movie.titulo.toLowerCase().includes(query.toLowerCase()) ||
                movie.descripcion.toLowerCase().includes(query.toLowerCase())
            );
            resolve(filtered);
        } catch (error) {
            reject("Error al filtrar las películas: " + error.message);
        }
    });
};

// Manejo de la búsqueda
const handleSearch = () => {
    const searchInput = document.getElementById("searchInput");
    const query = searchInput.value.trim();

    filterMovies(query)
        .then(filteredMovies => renderMovies(filteredMovies))
        .catch(error => console.error(error));
};

// Función para asignar los eventos a los botones del modal
const attachModalEvents = () => {
    const buttons = document.querySelectorAll(".btnModal");
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const movieId = event.target.getAttribute("data-id");
            fillModal(movieId)
                .then(message => console.log(message))
                .catch(error => console.error(error));
        });
    });
};

// Función de inicialización
const init = () => {
    fetchMovies()
        .then(moviesList => renderMovies(moviesList))
        .then(message => console.log(message))
        .catch(error => console.error("Error al inicializar: ", error));

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", handleSearch);
};

init();
