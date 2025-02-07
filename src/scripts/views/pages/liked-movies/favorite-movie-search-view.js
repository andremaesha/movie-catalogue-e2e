import { createMovieItemTemplate } from '../../templates/template-creator';

class FavoriteMovieSearchView {
  // eslint-disable-next-line class-methods-use-this
  getTemplate() {
    return `
      <div class="content">
        <input id="query" type="text">
        <h2 class="content__heading">Your Liked Movie</h2>
          <div id="movies" class="movies">

          </div>
      </div>
    `;
  }

  _getEmptyMovieTemplate() {
    return '<div class="movie-item__not__found movies__not__found">Tidak ada film untuk ditampilkan</div>';
  }

  runWhenUserIsSearching(callback) {
    document.getElementById('query').addEventListener('change', (event) => {
      callback(event.target.value);
    });
  }

  _showFoundMovies(movies) {
    this._view.showFavoriteMovies(movies);
  }

  showMovies(movies) {
    this.showFavoriteMovies(movies);
  }

  showFavoriteMovies(movies = []) {
    let html;
    if (movies.length) {
      html = movies.reduce((carry, movie) => carry.concat(createMovieItemTemplate(movie)), '');
    } else {
      html = this._getEmptyMovieTemplate();
    }

    document.getElementById('movies').innerHTML = html;

    document.getElementById('movies').dispatchEvent(new Event('movies:updated'));
  }
}

export default FavoriteMovieSearchView;
