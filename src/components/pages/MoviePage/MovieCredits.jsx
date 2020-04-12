import React, { Component } from 'react';
import CallApi from '../../../api/api';
import LoaderSpinner from '../../UIComponents/LoaderSpinner';
import Image from '../../UIComponents/Image';

export default class MovieCredits extends Component {
  constructor() {
    super();

    this.state = {
      credits: null,
      isLoading: false,
    };
  }

  updateLoading = (value) => {
    this.setState({
      isLoading: value,
    });
  };

  updateCredits = (value) => {
    this.setState({
      credits: value,
    });
  };

  componentDidMount() {
    this.updateLoading(true);
    CallApi.get(`/movie/${this.props.match.params.id}/credits`).then((data) => {
      this.updateCredits(data.cast);
      this.updateLoading(false);
    });
  }

  render() {
    const { credits, isLoading } = this.state;

    return isLoading ? (
      <LoaderSpinner />
    ) : (
      <div className="container mt-4">
        <div className="row">
          {credits &&
            credits.map((actor) => (
              <div key={actor.id} className="col-2 mb-2">
                <figure className="figure">
                  <Image
                    imagePath={actor.profile_path}
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
