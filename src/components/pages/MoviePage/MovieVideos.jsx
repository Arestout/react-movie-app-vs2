import React, { Component } from 'react';
import CallApi from '../../../api/api';
import YouTube from 'react-youtube';

export default class MovieVideos extends Component {
  constructor() {
    super();

    this.state = {
      videos: null,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.setState({
      isLoading: true,
    });
    CallApi.get(`/movie/${this.props.match.params.id}/videos`).then((data) =>
      this.setState({
        videos: data.results,
        isLoading: false,
      })
    );
  }

  render() {
    const { videos, isLoading } = this.state;

    return isLoading ? (
      <div>Loading...</div>
    ) : (
      <div className="container mt-3">
        <div className="row mb-3">
          {videos &&
            videos.map((video) => (
              <div className="col-6 mb-3" key={video.id}>
                <YouTube videoId={video.key} className="tabs-box" />
              </div>
            ))}
        </div>
      </div>
    );
  }
}
