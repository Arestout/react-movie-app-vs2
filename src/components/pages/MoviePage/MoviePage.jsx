import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import CallApi from '../../../api/api';
import MovieFavoriteIcon from '../../Movies/MovieFavoriteIcon';
import MovieWatchlistIcon from '../../Movies/MovieWatchlistIcon';
import MovieTabs from './MovieTabs';
import MovieDetails from './MovieDetails';
import MovieVideos from './MovieVideos';
import MovieCredits from './MovieCredits';

export default class MoviePage extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
      videos: [],
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    CallApi.get(`/movie/${this.props.match.params.id}`).then((data) =>
      this.setState({
        movie: data,
        isLoading: false,
      })
    );
    CallApi.get(`/movie/${this.props.match.params.id}/videos`).then((data) =>
      this.setState({
        videos: data.results,
      })
    );
  }

  render() {
    const { movie, videos } = this.state;
    const imagePath = movie.poster_path || movie.backdrop_path;
    return (
      <div className="container">
        <div className="row ml-5 mt-5">
          <div className="col-4">
            <img
              className="rounded movie-page-image"
              src={`https://image.tmdb.org/t/p/w500${imagePath}`}
              alt=""
            />
          </div>
          <div className="col-8">
            <h2 className="title mb-4">{movie.title}</h2>
            <p className="mb-4">{movie.overview}</p>
            <p className="mb-4">Rating: {movie.vote_average}</p>
            <div className="card-body">
              <MovieFavoriteIcon movie={movie} />
              <MovieWatchlistIcon movie={movie} />
            </div>
          </div>
        </div>
        <div className="row ml-5 mt-5">
          <div className="col-12">
            <MovieTabs movie={movie} videos={videos} />
            <div className="tab-content">
              <Switch>
                <Route path="/movie/:id/details">
                  <MovieDetails movie={movie} />
                </Route>
                <Route path="/movie/:id/videos" component={MovieVideos} />
                <Route path="/movie/:id/credits" component={MovieCredits} />
              </Switch>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
