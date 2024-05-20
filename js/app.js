let currentPage = 1; // добавляем переменную для отслеживания текущей страницы

const API_KEY = "8c8e1a50-6322-4135-8875-5d40a5420d86";
const API_URL_POPULAR =
  `https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_POPULAR_MOVIES&page=1`;
const API_URL_SEARCH =
  "https://kinopoiskapiunofficial.tech/api/v2.1/films/search-by-keyword?keyword=";
const API_URL_MOVIE_DETAILS = "https://kinopoiskapiunofficial.tech/api/v2.2/films/"
const API_URL_PREMIERES = 
"https://kinopoiskapiunofficial.tech/api/v2.2/films/premieres?year=2024&month=MAY"
const API_URL_FAMILY = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=FAMILY&page=1";
const API_URL_LOVE = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=LOVE_THEME&page=1";
const API_URL_TVshows = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=TOP_250_TV_SHOWS&page=1";
const API_URL_ZOMBIE = "https://kinopoiskapiunofficial.tech/api/v2.2/films/collections?type=ZOMBIE_THEME&page=1";





const searchInput = document.querySelector('.header__search');
const searchResults = document.querySelector('.search-results');

searchInput.addEventListener('input', async () => {
    const query = searchInput.value.trim();
    if (query.length > 0) {
        const movies = await searchMovies(query);
        displayResults(movies);
    } else {
        searchResults.classList.remove('show');
        setTimeout(() => searchResults.style.display = 'none', 500); // Wait for the transition to finish
    }
});

async function searchMovies(query) {
    const url = `${API_URL_SEARCH}${query}`;
    try {
        const response = await fetch(url, {
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": API_KEY,
            },
        });
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        return data.films;
    } catch (error) {
        console.error("Error fetching movies:", error);
        return [];
    }
}

function getRatingClass(rating) {
    if (rating < 5) {
        return 'rating-red';
    } else if (rating < 7) {
        return 'rating-yellow';
    } else {
        return 'rating-green';
    }
}

function displayResults(movies) {
    searchResults.innerHTML = '';
    const validMovies = movies.filter(movie => {
        const movieRating = parseFloat(movie.rating);
        return movie.rating !== null && movie.rating !== 'N/A' && !isNaN(movieRating);
    });

    if (validMovies.length > 0) {
        validMovies.forEach(movie => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');

            resultItem.addEventListener('click', () => {
                window.location.href = `movie.html?id=${movie.filmId}`;
            });

            const title = document.createElement('div');
            title.classList.add('result-title');
            title.textContent = movie.nameRu;

            const rating = document.createElement('div');
            rating.classList.add('result-rating');
            const movieRating = parseFloat(movie.rating);
            rating.textContent = movieRating;
            rating.classList.add(getRatingClass(movieRating));

            resultItem.appendChild(title);
            resultItem.appendChild(rating);
            searchResults.appendChild(resultItem);
        });
        searchResults.style.display = 'block';
        setTimeout(() => searchResults.classList.add('show'), 10); // Allow some time for reflow
    } else {
        searchResults.classList.remove('show');
        setTimeout(() => searchResults.style.display = 'none', 500); // Wait for the transition to finish
    }
}









async function getPopularMovie(url) {
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
    showPopular(respData);
  } catch (error) {
    console.error("Error fetching popular movies:", error);
  }
}

function getRatingColor(rating) {
  if (rating >= 7) return "green";
  if (rating >= 5) return "yellow";
  return "red";
}

function showPopular(data) {
  const popularEl = document.querySelector(".popular");

  if (!popularEl) {
    console.error("No element with class 'popular' found");
    return;
  }

  popularEl.innerHTML = ""; // Очищаем предыдущие популярные фильмы

  data.items.forEach(movie => {
    const movieId = movie.kinopoiskId;
    const rating = movie.ratingKinopoisk || 'N/A';

    if (!movieId) {
      console.error("No valid movie ID found", movie);
      return;
    }

    const movieEl = document.createElement("div");
    movieEl.classList.add("popular-card");
    movieEl.innerHTML = `
      <div>
        <a href="movie.html?id=${movieId}">
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










async function getFamilyMovie(url) {
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
    
    if (respData && respData.items) { // Обратите внимание, что в ответе, вероятно, ключ "items", а не "films"
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
    const movieId = movie.kinopoiskId;
    if (!movieId) {
      console.error("No valid movie ID found", movie);
      return;
    }

    const movieEl = document.createElement("div");
    movieEl.classList.add("family-card");
    movieEl.innerHTML = `
      <div>
        <a href="movie.html?id=${movieId}">
          <img class="family-photo" src="${movie.posterUrlPreview}" alt="Не удалось загрузить">
        </a>
        <h2 class="family-name">${movie.nameRu}</h2>
        <p class="family-year">${movie.year}</p>
      </div>
    `;
    familyEl.appendChild(movieEl);
  });
}

getFamilyMovie(API_URL_FAMILY);



async function getLoveMovie(url) {
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
    const movieId = movie.kinopoiskId;
    if (!movieId) {
      console.error("No valid movie ID found", movie);
      return;
    }

    const movieEl = document.createElement("div");
    movieEl.classList.add("love-card"); // Убедитесь, что карточка имеет правильный класс
    movieEl.innerHTML = `
      <div>
        <a href="movie.html?id=${movieId}">
          <img class="love-photo" src="${movie.posterUrlPreview}" alt="Не удалось загрузить">
        </a>
        <h2 class="love-name">${movie.nameRu}</h2>
        <p class="love-year">${movie.year}</p>
      </div>
    `;
    loveEl.appendChild(movieEl);
  });
}

getLoveMovie(API_URL_LOVE);




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
    console.error("Error fetching TV shows:", error);
  }
}

function showTVSHOWS(movies) {
  const tvshowsEl = document.querySelector(".tv-shows");

  if (!tvshowsEl) {
    console.error("No element with class 'tv-shows' found");
    return;
  }

  // Очищаем предыдущие популярные фильмы
  tvshowsEl.innerHTML = "";

  movies.forEach(movie => {
    const movieId = movie.kinopoiskId;
    if (!movieId) {
      console.error("No valid movie ID found", movie);
      return;
    }

    const movieEl = document.createElement("div");
    movieEl.classList.add("tvshows-card"); // Убедитесь, что карточка имеет правильный класс
    movieEl.innerHTML = `
      <div>
        <a href="movie.html?id=${movieId}">
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
    
    if (respData && respData.items) {
      showZombie(respData.items);
    } else {
      console.error("Unexpected response format", respData);
    }
  } catch (error) {
    console.error("Error fetching zombie movies:", error);
  }
}

function showZombie(movies) {
  const zombieEl = document.querySelector(".zombie");

  if (!zombieEl) {
    console.error("No element with class 'zombie' found");
    return;
  }

  // Очищаем предыдущие популярные фильмы
  zombieEl.innerHTML = "";

  movies.forEach(movie => {
    const movieId = movie.kinopoiskId;
    if (!movieId) {
      console.error("No valid movie ID found", movie);
      return;
    }

    const movieEl = document.createElement("div");
    movieEl.classList.add("zombie-card"); // Убедитесь, что карточка имеет правильный класс
    movieEl.innerHTML = `
      <div>
        <a href="movie.html?id=${movieId}">
          <img class="zombie-photo" src="${movie.posterUrlPreview}" alt="Не удалось загрузить">
        </a>
        <h2 class="zombie-name">${movie.nameRu}</h2>
        <p class="zombie-year">${movie.year}</p>
      </div>
    `;
    zombieEl.appendChild(movieEl);
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
  const watchButton = document.querySelector(".film-watch");

  titleEl.textContent = movie.nameRu || "Название фильма";
  genreEl.textContent = movie.genres.map(genre => genre.genre).join(", ") || "Жанры";
  descriptionEl.textContent = movie.description || "Описание фильма";

  watchButton.onclick = () => {
    window.location.href = `movie.html?id=${movie.kinopoiskId}`;
  };
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







