var _ = require('underscore');

exports.configure = function (api) {

    // GET /api/nowPlaying
    api.get('/nowPlaying', this.nowPlaying);

    // GET /api/movies/:id
    api.get('/movies/:id', this.fetchMovie);

    api.put('/movies/:id', this.updateMovie);

    console.info('Movie API ready.');
};

var movies = require('./mock/now_playing.json');

this.nowPlaying = function (req, res) {
    res.status(200).json(movies);
};

this.fetchMovie = function (req, res) {
    var movie = findCachedMovie(+req.params.id);
    if (movie && movie.id !== 340666) {
        res.status(200).json(movie);
    } else {
        res.status(404).end();
    }
};

this.editTract = function (req, res) {
    var mockTract = _.findWhere(mockTracts[req.params.farmNumber], {tractNumber: parseInt(req.params.tractNumber)});
    mockTract.farmland = req.body.farmland;
    mockTract.cropland = req.body.cropland;
    mockTract.description = req.body.description;

    res.status(200).end();
};

this.updateMovie = function (req, res) {
    var movie = findCachedMovie(+req.params.id);
    if (movie ) {
        movie.title = req.body.title;
        movie.overview = req.body.overview;
        movie.rating = req.body.rating;
        res.status(204).end();
    } else {
        res.status(404).end();
    }
};


function findCachedMovie(id) {
    return _.find(movies.results, {id: id});
}