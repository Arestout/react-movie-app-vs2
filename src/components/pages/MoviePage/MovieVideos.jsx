import React, { Component } from 'react';
import CallApi from '../../../api/api';
import LoaderSpinner from '../../UIComponents/LoaderSpinner';

export default class MovieVideos extends Component {
  constructor() {
    super();

    this.state = {
      videos: null,
      isLoading: false,
    };
  }

  updateLoading = (value) => {
    this.setState({
      isLoading: value,
    });
  };

  updateVideos = (value) => {
    this.setState({
      videos: value,
    });
  };

  componentDidMount() {
    this.updateLoading(true);
    CallApi.get(`/movie/${this.props.match.params.id}/videos`).then((data) => {
      this.updateVideos(data.results);
      this.updateLoading(false);
    });
  }

  render() {
    const { videos, isLoading } = this.state;

    return isLoading ? (
      <LoaderSpinner />
    ) : (
      <div className="container mt-3">
        <div className="row mb-3">
          {videos &&
            videos.map((video) => (
              <div className="col-6 mb-3" key={video.id}>
                <iframe
                  className="tabs-box"
                  width="560"
                  height="315"
                  src={
                    video.site === 'YouTube'
                      ? `https://www.youtube.com/embed/${video.key}`
                      : `https://player.vimeo.com/video/${video.key}?title=0&byline=0&portrait=0&badge=0`
                  }
                  frameBorder="0"
                  allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  title={video.name}
                ></iframe>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

// || https://player.vimeo.com/video/${video.key}?title=0&byline=0&portrait=0&badge=0
