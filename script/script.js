const form = document.querySelector('form')
const input = document.querySelector('#inp')
const container = document.querySelector('.container')
const fromForPremier = document.querySelector('#form')
const input1= document.querySelector('#inp1')
const select = document.querySelector('#select')
const btn_back = document.querySelector('#btn_back')


const baseURL  = 'https://kinopoiskapiunofficial.tech/api/'
const key = '4619fe09-3a78-48fd-aa17-270c51227cd2'
const GET_ALL_FILMS = baseURL + 'v2.2/films'
const GET_FILM_BY_ID = baseURL + 'v2.2/films/'
const GET_FILMS_BY_KEYWORD = `${baseURL}v2.1/films/search-by-keyword?keyword=`


const getFilmPremier = async () => {
    const premiersFilm =`${baseURL}v2.2/films/premieres?year=${input1.value}&month=${select.value}`
    fetch(premiersFilm, {
        method: "GET",
        headers: {
            'X-API-KEY': key,
            'Content-Type': 'application/json',
        }
    })
    .then(res => res.json())
    .then(data => renderFilms(data.items))
    .catch(err => console.error(err))
}

const getFilmByKeyword = async () => {
    const url = GET_FILMS_BY_KEYWORD + inp.value;
    const req = await fetch(url, {
        method: 'GET',
        headers: {
            'X-API-KEY': key,
            'Content-Type': 'application/json',
        },
    })
    const res = await req.json();
    renderFilms(res.films);
}

const getFilmsAfterSearch = async (id) => {
    fetch(GET_FILM_BY_ID + id, {
        method: "GET",
        headers: {
            'X-API-KEY': key,
            'Content-Type': 'application/json',
        },
    })
    .then(res => res.json())
    .then(data => renderSearchFilm(data))
    .catch(err => console.error(err))
}

const getFilmsById = async (id) => {
    const req = await fetch(GET_FILM_BY_ID + id, {
        method: 'GET',
        headers: {
            'X-API-KEY': key,
            'Content-Type': 'application/json',
        }
    })
    const res = await req.json()
    renderFilmsById(res)
}

const renderFilmsById = (data) => {
    container.innerHTML = ''
    // console.log(data)
        const block1 = document.createElement('div')
        block1.classList.add('block1')
        const block2 = document.createElement('div')
        block2.classList.add('block2')
        const title = document.createElement('h1')
        title.classList.add('title')
        const card = document.createElement('div')
        card.classList.add('cardID')
        title.textContent = `Название фильма: ${data.nameRu ? data.nameRu : data.nameOriginal}`
        const image = document.createElement('img')
        image.classList.add('image')
        image.src = data.posterUrl
        image.alt = 'film image'
        const filmRatingImbd = document.createElement('p')
        filmRatingImbd.textContent = `Рейтинг фильма в Imdb: ${data.ratingImdb}`
        const filmRatingKinopoisk = document.createElement('p')
        filmRatingKinopoisk.textContent = `Рейтинг фильма в кинопоиске: ${data.ratingKinopoisk}`
        const typeOfFilms = document.createElement('p')
        typeOfFilms.textContent = data.type
        const dateOfRelize = document.createElement('p')
        dateOfRelize.textContent = data.year
        const genreOfFilm = document.createElement('p')
        const genreArray = data.genres.map(el => {
            for(let key in el) {
                return el[key]
            }
        })
        genreOfFilm.textContent = `Жанр фильма: ${genreArray}`
        const countryOfFilm = document.createElement('p')
        const countriesArray = data.countries.map(el => {
            for(let key in el) {
                return el[key]
            }
        })
        countryOfFilm.textContent = `Страна: ${countriesArray}`

        btn_back.addEventListener('click', () => getAllFilms())
    
        block1.append(title, image)
        block2.append(filmRatingImbd, filmRatingKinopoisk, typeOfFilms, dateOfRelize)
        card.append(block1, block2, genreOfFilm, countryOfFilm)
        container.append(card)
}


const getAllFilms = async() => {
    const req = await fetch(GET_ALL_FILMS, {
        method: 'GET',
        headers: {
            'X-API-KEY': key,
            'Content-Type': 'application/json',
        }
    })
    const res = await req.json()
    renderFilms(res.items)
}

const renderFilms = (data) => {
    // console.log(data)
    container.innerHTML = ''
    if(data.length > 0) {
        data.map(el => {
            const card = document.createElement('div')
            card.classList.add('card')
            const title = document.createElement('h1')
            title.classList.add('title')
            title.textContent = `Название фильма: ${el.nameRu ? el.nameRu : el.nameOriginal}`
            const image = document.createElement('img')
            image.src = el.posterUrl
            image.alt = 'film image'
    
    
            card.addEventListener('click', () => getFilmsById(el.kinopoiskId || el.filmId))
            btn_back.addEventListener('click', () => getAllFilms())
    
            card.append(title, image)
            container.append(card)
        })
    } else {
        container.innerHTML = '<div class="not_found">Фильм не найден!</div>'
    }
}

getAllFilms()

form.addEventListener('submit', (e) => {
    e.preventDefault()
    getFilmByKeyword()
})


fromForPremier.addEventListener('submit', (e) => {
    e.preventDefault()
    getFilmPremier()
})




// const getAllFilms = () => {
//     fetch(GET_ALL_FILMS, {
//         method: 'GET',
//         headers: {
//             'X-API-KEY': key,
//             'Content-Type': 'application/json',
//         },
//     })
//         .then(res => res.json())
//         .then(data => renderFilms(data.items))
//         .catch(err => console.error(err))
// }
