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
        }, 2000);
    });
};

// Función que renderiza las películas en el DOM
const renderMovies = (moviesList) => {
    const movieContainer = document.getElementById("movieContainer");
    movieContainer.innerHTML = ''; 

    moviesList.forEach((movie) => {
        const bodyElement = document.createElement("div");
        bodyElement.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "mb-4");

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
};

// Función para llenar el modal con la información de la película
const fillModal = (movieId) => {
    try {
        const movie = peliculas.find(movie => movie.id === parseInt(movieId));

        const modalTitle = document.getElementById("modalTitle");
        const modalDescription = document.getElementById("modalDescription");
        const modalImage = document.getElementById("modalImage");

        if (!movie) {
            throw new Error("Película no encontrada");
        }

        modalTitle.textContent = movie.titulo;
        modalDescription.textContent = movie.descripcion;
        modalImage.src = movie.imagen;
    } catch (error) {
        console.error("Error al llenar el modal: ", error);
    }
};

// Función para filtrar las películas según la búsqueda
const filterMovies = (query) => {
    try {
        return peliculas.filter(movie => 
            movie.titulo.toLowerCase().includes(query.toLowerCase()) ||
            movie.descripcion.toLowerCase().includes(query.toLowerCase())
        );
    } catch (error) {
        console.error("Error al filtrar las películas: ", error);
        return []; 
    }
};

// Manejo de la búsqueda
const handleSearch = () => {
    const searchInput = document.getElementById("searchInput");
    const query = searchInput.value.trim();

    const filteredMovies = filterMovies(query);
    renderMovies(filteredMovies);
};

// Función para asignar los eventos a los botones del modal
const attachModalEvents = () => {
    const buttons = document.querySelectorAll(".btnModal");
    buttons.forEach(button => {
        button.addEventListener("click", (event) => {
            const movieId = event.target.getAttribute("data-id");
            console.log(movieId+" this is the id for modal");
            fillModal(movieId);
        });
    });
};

// Función de inicialización
const init = () => {
    fetchMovies()
        .then(moviesList => {
            renderMovies(moviesList); 
        })
        .catch(error => {
            console.error("Error al cargar las películas: ", error);
        });

    const searchInput = document.getElementById("searchInput");
    searchInput.addEventListener("input", handleSearch);
};

init();
