import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import Genres from './Genres';
import { API_URL, API_KEY_3 } from '../../api/api';

export default class GenresContainer extends PureComponent {
  constructor() {
    super();

    this.state = {
      genres: [],
    };
  }

  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
    with_genres: PropTypes.array.isRequired,
  };

  onChange = (event) => {
    this.props.onChangeFilters({
      target: {
        name: 'with_genres',
        value: event.target.checked
          ? [...this.props.with_genres, event.target.value]
          : this.props.with_genres.filter(
              (genre) => genre !== event.target.value
            ),
      },
    });
  };

  componentDidMount() {
    const link = `${API_URL}/genre/movie/list?api_key=${API_KEY_3}&language=en-US&`;
    fetch(link)
      .then((response) => response.json())
      .then((data) => this.setState({ genres: data.genres }));
  }

  render() {
    const { genres } = this.state;
    const { with_genres } = this.props;

    return (
      <Genres
        genres={genres}
        with_genres={with_genres}
        onChange={this.onChange}
      />
    );
  }
}
