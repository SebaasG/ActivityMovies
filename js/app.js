import { movies } from './data.js';

const viewInfo = () => {
    const { peliculas } = movies;  

    const movieContainer = document.createElement("div");
    movieContainer.classList.add("row", "d-flex", "justify-content-center", "flex-wrap", "contentMovies"); 

    peliculas.forEach(movie => {
        const bodyElement = document.createElement("div");

        bodyElement.classList.add("col-12", "col-sm-6", "col-md-4", "col-lg-3", "mb-4");
        bodyElement.innerHTML = ``
        bodyElement.innerHTML = `
            <div class="card cardMovie">
                <img src="${movie.imagen}" class="card-img-top" alt="Imagen no disponible">
                <div class="card-body text-center">
                    <h5 class="card-title">${movie.titulo}</h5> <!-- Título de la película -->
                    <p class="card-text">${movie.descripcion}</p>
                    <a href="#" class="btn btn-primary">Ver más</a>
                </div>
            </div>
        `;

        

        movieContainer.appendChild(bodyElement);
    });

    document.body.appendChild(movieContainer); 
};

viewInfo();
