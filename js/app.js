let currentPage = 1; // добавляем переменную для отслеживания текущей страницы

const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR =
  `https://kinopoiskapiunofficial.tech/api/v2.2/films/top?type=TOP_100_POPULAR_FILMS&page=${currentPage}`;
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/"
const API_URL_PREMIERES = 
"https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=MAY"
const API_URL_FAMILY = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=FAMILY&page=1";
const API_URL_LOVE = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=LOVE_THEME&page=1";
const API_URL_TVshows = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_TV_SHOWS&page=1";
const API_URL_ZOMBIE = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=ZOMBIE_THEME&page=1";

// getMovies(API_URL_POPULAR);




async function getPopularMovie(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  showPopular(respData);
}

function showPopular(data) {
  const popularEl = document.querySelector(".popular");

  // Очищаем предыдущие популярные фильмы
  popularEl.innerHTML = "";

  data.films.forEach(movie => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("popular-card"); // Убедитесь, что карточка имеет правильный класс
    movieEl.innerHTML = `
      <div>
      <a href="movie.html">
      <img class="popular-photo" src="${movie.posterUrlPreview}" alt="Не удалось загрузить">
      </a>
      <h2 class="popular-name">${movie.nameRu}</h2>
      <p class="popular-year">${movie.year}</p>
      </div>
    `;

    popularEl.appendChild(movieEl);
  });
}

getPopularMovie(API_URL_POPULAR);




async function getfamilyMovie(url) {
  try {
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const respData = await resp.json();
    
    if (respData && respData.items) {  // Обратите внимание, что в ответе, вероятно, ключ "items", а не "films"
      showFamily(respData.items);
    } else {
      console.error("Unexpected response format", respData);
    }
  } catch (error) {
    console.error("Error fetching family movies:", error);
  }
}

function showFamily(movies) {
  const familyEl = document.querySelector(".family");

  if (!familyEl) {
    console.error("No element with class 'family' found");
    return;
  }

  // Очищаем предыдущие популярные фильмы
  familyEl.innerHTML = "";

  movies.forEach(movie => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("family-card"); // Убедитесь, что карточка имеет правильный класс
    movieEl.innerHTML = `
      <div>
      <a href="movie.html">
      <img class="family-photo" src="${movie.posterUrlPreview}" alt="Не удалось загрузить">
      </a>
      <h2 class="family-name">${movie.nameRu}</h2>
      <p class="family-year">${movie.year}</p>
      </div>
    `;
    familyEl.appendChild(movieEl);
  });
}

getfamilyMovie(API_URL_FAMILY);



async function getloveMovie(url) {
  try {
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const respData = await resp.json();
    
    if (respData && respData.items) {  // Обратите внимание, что в ответе, вероятно, ключ "items", а не "films"
      showLove(respData.items);
    } else {
      console.error("Unexpected response format", respData);
    }
  } catch (error) {
    console.error("Error fetching love movies:", error);
  }
}

function showLove(movies) {
  const loveEl = document.querySelector(".love");

  if (!loveEl) {
    console.error("No element with class 'love' found");
    return;
  }

  // Очищаем предыдущие популярные фильмы
  loveEl.innerHTML = "";

  movies.forEach(movie => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("love-card"); // Убедитесь, что карточка имеет правильный класс
    movieEl.innerHTML = `
      <div>
      <a href="movie.html">
      <img class="love-photo" src="${movie.posterUrlPreview}" alt="Не удалось загрузить">
      </a>
      <h2 class="love-name">${movie.nameRu}</h2>
      <p class="love-year">${movie.year}</p>
      </div>
    `;
    loveEl.appendChild(movieEl);
  });
}

getloveMovie(API_URL_LOVE);




async function getTVshowsMovie(url) {
  try {
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const respData = await resp.json();
    
    if (respData && respData.items) {  // Обратите внимание, что в ответе, вероятно, ключ "items", а не "films"
      showTVSHOWS(respData.items);
    } else {
      console.error("Unexpected response format", respData);
    }
  } catch (error) {
    console.error("Error fetching love movies:", error);
  }
}

function showTVSHOWS(movies) {
  const tvshowsEl = document.querySelector(".tv-shows");

  if (!tvshowsEl) {
    console.error("No element with class 'love' found");
    return;
  }

  // Очищаем предыдущие популярные фильмы
  tvshowsEl.innerHTML = "";

  movies.forEach(movie => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("tvshows-card"); // Убедитесь, что карточка имеет правильный класс
    movieEl.innerHTML = `
      <div>
      <a href="movie.html">
      <img class="tvshows-photo" src="${movie.posterUrlPreview}" alt="Не удалось загрузить">
      </a>
      <h2 class="tvshows-name">${movie.nameRu}</h2>
      <p class="tvshows-year">${movie.year}</p>
      </div>
    `;
    tvshowsEl.appendChild(movieEl);
  });
}

getTVshowsMovie(API_URL_TVshows);





async function getZombieMovie(url) {
  try {
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const respData = await resp.json();
    
    if (respData && respData.items) {  // Обратите внимание, что в ответе, вероятно, ключ "items", а не "films"
      showZombie(respData.items);
    } else {
      console.error("Unexpected response format", respData);
    }
  } catch (error) {
    console.error("Error fetching love movies:", error);
  }
}

function showZombie(movies) {
  const ZombieEl = document.querySelector(".zombie");

  if (!ZombieEl) {
    console.error("No element with class 'love' found");
    return;
  }

  // Очищаем предыдущие популярные фильмы
  ZombieEl.innerHTML = "";

  movies.forEach(movie => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("zombie-card"); // Убедитесь, что карточка имеет правильный класс
    movieEl.innerHTML = `
      <div>
      <a href="movie.html">
        <img class="zombie-photo" src="${movie.posterUrlPreview}" alt="Не удалось загрузить">
      </a>
      <h2 class="zombie-name">${movie.nameRu}</h2>
      <p class="zombie-year">${movie.year}</p>
      </div>
    `;
    ZombieEl.appendChild(movieEl);
  });
}

getZombieMovie(API_URL_ZOMBIE);



const API_URL_BASE = "https://kinopoiskapiunofficial.tech/api/v2.2/films/";

// Пример массива с 30 ID фильмов, которые точно существуют в API
const movieIds = [
  306, 328, 329, 330, 331, 332, 333, 334, 335, 336, 
  337, 338, 339, 340, 341, 342, 343, 344, 345, 346, 
  347, 348, 349, 350, 351, 352, 353, 354, 355, 356
];

let currentIndex = 0;
let movies = [];

async function fetchMovieById(id) {
  const url = `${API_URL_BASE}${id}`;
  try {
    const resp = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        "X-API-KEY": API_KEY,
      },
    });

    if (!resp.ok) {
      throw new Error(`HTTP error! status: ${resp.status}`);
    }

    const movie = await resp.json();

    if (movie && movie.nameRu && movie.coverUrl && movie.description && movie.genres) {
      return movie;
    } else {
      console.error("Invalid movie data");
      return null;
    }
  } catch (error) {
    console.error("Error fetching home movie:", error);
    return null;
  }
}

async function preloadMovies(ids) {
  const promises = ids.map(id => fetchMovieById(id));
  const newMovies = await Promise.all(promises);
  movies = newMovies.filter(movie => movie !== null);
  preloadImages(movies);
}

function preloadImages(movies) {
  movies.forEach(movie => {
    const img = new Image();
    img.src = movie.coverUrl;
  });
}

function showHOME(index) {
  const homeEl = document.querySelector(".home");

  if (!homeEl) {
    console.error("No element with class 'home' found");
    return;
  }

  const movie = movies[index];

  // Устанавливаем фон элемента .home
  homeEl.style.backgroundImage = `url(${movie.coverUrl})`;
  homeEl.style.backgroundSize = 'cover';
  homeEl.style.backgroundRepeat = 'no-repeat';
  homeEl.style.backgroundPosition = 'center';

  const titleEl = document.getElementById("film-title");
  const genreEl = document.getElementById("film-genre");
  const descriptionEl = document.getElementById("film-description");

  titleEl.textContent = movie.nameRu || "Название фильма";
  genreEl.textContent = movie.genres.map(genre => genre.genre).join(", ") || "Жанры";
  descriptionEl.textContent = movie.description || "Описание фильма";
}

// Добавляем обработчики событий для кнопок
document.querySelector('.prev-home').addEventListener('click', () => {
  if (currentIndex > 0) {
    currentIndex--;
    showHOME(currentIndex);
  }
});

document.querySelector('.next-home').addEventListener('click', () => {
  currentIndex++;
  if (currentIndex >= movies.length) {
    currentIndex = 0; // Возвращаемся к первому фильму
  }
  showHOME(currentIndex);
});

// Изначально загружаем 30 фильмов
preloadMovies(movieIds).then(() => {
  showHOME(currentIndex); // Отображаем первый фильм
});










async function getMovies(url) {
  const resp = await fetch(url, {
    headers: {
      "Content-Type": "application/json",
      "X-API-KEY": API_KEY,
    },
  });
  const respData = await resp.json();
  showMovies(respData);
}

function showMovies(data) {
  const moviesEl = document.querySelector(".movies");

  // Очищаем предыдущие фильмы
  document.querySelector(".movies").innerHTML = "";

  data.films.forEach((movie) => {
    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");
    movieEl.innerHTML = `
        <div class="movie__cover-inner">
        <img
          src="${movie.posterUrlPreview}"
          class="movie__cover"
          alt="${movie.nameRu}"
        />
        <div class="movie__cover--darkened"></div>
      </div>
      <div class="movie__info">
        <div class="movie__title">${movie.nameRu}</div>
        <div class="movie__year">${movie.year}</div>
        `;
    movieEl.addEventListener("click", () => openModal(movie.filmId))
    moviesEl.appendChild(movieEl);


  });
}




window.onscroll = function() { scrollFunction() };

function scrollFunction() {
  if (document.body.scrollTop > 0 || document.documentElement.scrollTop > 0) {
      // Добавляем класс blur к элементу с классом header__content, если прокрутка больше 0
      document.querySelector(".header__content").classList.add("blur");
  } else {
      // Убираем класс blur, если прокрутка равна 0
      document.querySelector(".header__content").classList.remove("blur");
  }
  }







// 

document.addEventListener('DOMContentLoaded', function() {
  document.querySelector('.close-shadow').addEventListener('click', function(event) {
    event.preventDefault(); // Предотвращаем переход по ссылке
    document.querySelector('.background-shadow').style.display = 'none';
  });
});