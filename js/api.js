const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = "d6ecb4865ebe46ec907e193a6b5c1c19";
const sideNav = document.getElementById("side-nav");
const generosList = document.getElementById("generos");
const cards = document.querySelector(".cards");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
var background = document.getElementById("background");
const linkYoutube = document.getElementById("link-youtube");
const buttonModal = document.getElementById("button-modal");
const iframeYoutube = document.querySelector(".modal-content");
const button = document.getElementById("button");
const search = document.getElementById("search");

// //https://api.themoviedb.org/3/discover/movie?api_key=###&with_genres=28
// //genre/movie/list
async function searchGenres() {
    const url = `${baseUrl}genre/movie/list?api_key=${apiKey}&language=pt-BR`;
    const response = await fetch(url);
    const result = await response.json();
    const names = result.genres;
    names.forEach(element => {

        generosList.innerHTML +=
            `
                <div class="generos-item">
                    <span class="genrer" name="filmes" onclick="genresFilm(${element.id})">${element.name}</span>
                </div>
            `
    });
    generosList.innerHTML += ` 
    <div class="generos-item">
        <span class="genrer" name="filmes" onclick="topFilms()">Top filmes do dia</span>
    </div>`
}
searchGenres();


///movie/genres
async function genresFilm(genero) {
    cards.innerHTML = "";
    const url = `${baseUrl}discover/movie?api_key=${apiKey}&with_genres=${genero}&language=pt-BR`;
    const response = await fetch(url);
    const result = await response.json();
    const films = result.results;
    films.forEach(element => {
        const poster = element.poster_path;
        const backdrop = element.backdrop_path;
        element.overview = element.overview.replace(/[\"']/g, "");
        if (backdrop !== null) {
            cards.innerHTML +=
                `
                <div class="card-item">
                    <img src="https://image.tmdb.org/t/p/w300${poster}" alt="${element.title}" onclick="getBanner('${element.title}', '${element.overview}', '${backdrop}' ,'${element.id}', '${poster}')">
                </div>
            `
        }
    });
}
genresFilm(28);

// movie{movie_id}/videos
async function getBanner(title, overview, poster, idfilme, posterCard) {
    const url = `${baseUrl}movie/${idfilme}/videos?api_key=${apiKey}`;
    const response = await fetch(url);
    const result = await response.json();


    if (overview == "") {
        descricao.innerHTML = "Sem descrição";
    }
    else {
        descricao.innerHTML = `<span class="descricao-filme">${overview}<span>`;
    }

    if (poster == "null") {
        background.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${posterCard})`;
    }
    else {
        background.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${poster})`;
    }
    titulo.innerHTML = `<h1 clas="titulo-filme">${title}<h1>`;
    background.style.backgroundRepeat = "no-repeat";
    background.style.backgroundPosition = "center";
    if (result.results == 0) {
        const youtube = result.results;
        buttonModal.innerHTML = "";
        iframeYoutube.innerHTML = "";
        linkYoutube.innerHTML = "Video não encontrado";
    } else {
        const youtube = result.results[0].key;
        linkYoutube.innerHTML = `<a href="https://www.youtube.com/watch?v=${youtube}" target="_blank"><i class="fab fa-youtube fa-3x" id="youtube-icon"></i></a>`
        buttonModal.innerHTML =
            `
            <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
                Ver vídeo 
            </button>
    
        `;
        iframeYoutube.innerHTML =
            `
            <iframe 
                src="https://www.youtube.com/embed/${youtube}"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        `
    }

}

async function topFilms() {
    cards.innerHTML = "";
    const url = `${baseUrl}trending/movie/day?api_key=${apiKey}&language=pt-BR`;
    const response = await fetch(url);
    const result = await response.json();
    const titles = result.results;
    titles.forEach(element => {
        element.overview = element.overview.replace(/[\"']/g, "");
        if (element.backdrop_path) {
            cards.innerHTML +=
                `
                <div class="card-item">
                    <img src="https://image.tmdb.org/t/p/w300${element.poster_path}" alt="${element.title}" onclick="getBanner('${element.title}', '${element.overview}', '${element.backdrop_path}' ,'${element.id}')">
                </div>
               `
        }
    });

}

async function procurarFilmes() {

    cards.innerHTML = "";
    const url = `${baseUrl}search/movie?query=${search.value}&api_key=${apiKey}&language=pt-BR`;
    const response = await fetch(url);
    const result = await response.json();
    const filmSearch = result.results;
    filmSearch.forEach(element => {
        element.overview = element.overview.replace(/[\"']/g, "");
        if (element.poster_path) {
            cards.innerHTML +=
                `
            <div class="card-item">
                <img src="https://image.tmdb.org/t/p/w300${element.poster_path}" alt="${element.title}" onclick="getBanner('${element.title}', '${element.overview}', '${element.backdrop_path}' ,'${element.id}', '${element.poster_path}')">
            </div>
       `
        }
    });
    search.value = "";
}
button.addEventListener("click", procurarFilmes);

