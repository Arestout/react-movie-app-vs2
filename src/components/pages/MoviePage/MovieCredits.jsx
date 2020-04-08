import React, { Component } from 'react';
import CallApi from '../../../api/api';

export default class MovieCredits extends Component {
  constructor() {
    super();

    this.state = {
      credits: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    CallApi.get(`/movie/${this.props.match.params.id}/credits`).then((data) =>
      this.setState({
        credits: data.cast,
        isLoading: false,
      })
    );
  }

  render() {
    const { credits, isLoading } = this.state;

    return isLoading ? (
      <div>Loading...</div>
    ) : (
      <div className="container mt-4">
        <div className="row">
          {credits &&
            credits.map((actor) => (
              <div key={actor.id} className="col-2 mb-2">
                <figure className="figure">
                  <img
                    src={`https://image.tmdb.org/t/p/w500/${actor.profile_path}`}
                    className="figure-img img-fluid rounded movie-page-image"
                    alt={actor.name}
                  />
                  <figcaption className="figure-caption">
                    {actor.name}
                  </figcaption>
                </figure>
              </div>
            ))}
        </div>
      </div>
    );
  }
}
