const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = "d6ecb4865ebe46ec907e193a6b5c1c19";
const sideNav = document.getElementById("side-nav");
const cards = document.querySelector(".cards");
const titulo = document.getElementById("titulo");
const descricao = document.getElementById("descricao");
const background = document.getElementById("background");
const linkYoutube = document.getElementById("link-youtube");
const buttonModal = document.getElementById("button-modal");
const iframeYoutube = document.querySelector(".modal-content");
//https://api.themoviedb.org/3/discover/movie?api_key=###&with_genres=28
const gen = document.getElementById("navbarSupportedContent");

//genre/movie/list
async function searchGenres() {
    const url = `${baseUrl}genre/movie/list?api_key=${apiKey}&language=pt-BR`;
    const response = await fetch(url);
    const result = await response.json();
    const names = result.genres;
    names.forEach(element => {
        sideNav.innerHTML +=
            `
                <div class="generos-item">
                    <span class="genrer" id="${element.id}" name="filmes" onclick="genresFilm(${element.id})">${element.name}</span>
                </div>
            `
    });
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
        // element.overview = element.overview.replace(/\"/g, '');
        // element.title = element.title.replace(/\"/g, '\\"');
        element.overview = element.overview.replace(/[\"']/g, "");
        if (backdrop !== null) {
            cards.innerHTML +=
                `
                <div class="card-item">
                    <img src="https://image.tmdb.org/t/p/w300${poster}" alt="${element.title}" onclick="getBanner('${element.title}', '${element.overview}', '${backdrop}' ,'${element.id}')">
                </div>
            `
        }
    });
}

// movie{movie_id}/videos
async function getBanner(title, overview, poster, idfilme) {

    const url = `${baseUrl}movie/${idfilme}/videos?api_key=${apiKey}`;
    const response = await fetch(url);
    const result = await response.json();
    const youtube = result.results[0].key;

    linkYoutube.innerHTML = `<a href="https://www.youtube.com/watch?v=${youtube}" target="_blank"><i class="fab fa-youtube fa-3x" id="youtube-icon"></i></a>`
    titulo.innerHTML = `<h1 clas="titulo-filme">${title}<h1>`;
    descricao.innerHTML = `<span class="descricao-filme">${overview}<span>`;
    background.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${poster})`;
    background.style.backgroundRepeat = "no-repeat";
    background.style.backgroundPosition = "center";



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