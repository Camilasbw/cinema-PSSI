// URLs da API do The Movie Database (TMDB) com idioma português (pt-BR)
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1&language=pt-BR'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280' // Caminho base para as imagens dos filmes
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&language=pt-BR&query='

// Pegando os elementos HTML pelo ID para poder manipular com JS
const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')

// Ao abrir a página, já busca os filmes mais populares
getMovies(API_URL)

// Função assíncrona para buscar os filmes da API
async function getMovies(url) {
    const res = await fetch(url)        // Faz a requisição HTTP para a API
    const data = await res.json()       // Converte a resposta para JSON
    showMovies(data.results)            // Envia os filmes para a função que vai exibi-los
}

// Função para exibir os filmes na tela
function showMovies(movies) {
    main.innerHTML = ''

    // Para cada filme recebido da API...
    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie


        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Sinopse</h3>
                ${overview}
            </div>
        `
        // Adiciona o novo filme dentro da tag <main>
        main.appendChild(movieEl)
    })
}
// Define uma cor com base na nota do filme
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green'
    } else if (vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}
// Evento de envio do formulário de busca (quando o usuário aperta Enter)
form.addEventListener('submit', (e) => {
    e.preventDefault() // Evita que a página recarregue ao enviar o form

    const searchTerm = search.value.trim()

    if (searchTerm !== '') {
        // Faz uma nova busca na API com o termo digitado
        getMovies(SEARCH_API + encodeURIComponent(searchTerm))
        search.value = '' // Limpa o campo de busca
    } else {
        window.location.reload()
    }
})
