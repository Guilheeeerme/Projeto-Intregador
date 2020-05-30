const baseUrl = 'https://api.themoviedb.org/3/';
const apiKey = "d6ecb4865ebe46ec907e193a6b5c1c19";
const subMenu = document.getElementById("homeSubmenu");
const card = document.querySelector(".cards");
const headerGenre = document.getElementById("headerGenre");
const backgroundImg = document.querySelector(".background");
const titleFilm = document.getElementById("title");
const descricao = document.getElementById("descricao");
//https://api.themoviedb.org/3/discover/movie?api_key=###&with_genres=28

//genre/movie/list
async function searchGenres() {
    const url = `${baseUrl}genre/movie/list?api_key=${apiKey}&language=pt-BR`;
    const response = await fetch(url);
    const result = await response.json();
    const names = result.genres;
    names.forEach(element => {
        subMenu.innerHTML +=
            `
                <li><a href="#" class="interno" id="${element.id}" name="filmes" onclick="genresFilm(${element.id})">${element.name}</a></li>
            `
    });
}
searchGenres();

//movie/genres
async function genresFilm(genero) {
    card.innerHTML = "";
    const url = `${baseUrl}discover/movie?api_key=${apiKey}&with_genres=${genero}&language=pt-BR`;
    const response = await fetch(url);
    const result = await response.json();
    const films = result.results;
   
    films.forEach(element => {
        console.log(element);
        const poster = element.poster_path;
        if(poster !== null){
            card.innerHTML +=
            `
                <div class="card l">
                    <img src="https://image.tmdb.org/t/p/w185${poster}" alt="${element.title}" ondblclick="getBanner('${element.title}', '${element.overview}', '${element.poster_path}')">
                    <span class="nameMovie">${element.title}</span>
                </div>
            `
        }
    });
}
function getBanner(title, overview, poster){
    titleFilm.innerHTML = `<h2>${title}<h2>`;
    descricao.innerHTML= `<p>${overview}<p>`
    backgroundImg.style.backgroundImage = `url(https://image.tmdb.org/t/p/original${poster})`;
    backgroundImg.style.backgroundSize = "scale-down";
}
