import React, { PureComponent } from 'react';
import { API_URL, API_KEY_3 } from '../../api/api';

export default class Genres extends PureComponent {
  constructor() {
    super();

    this.state = {
      genres: [],
    };
  }

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
    console.log('Genres', 'render');
    return (
      <div className="form-group">
        {genres.map((genre) => {
          return (
            <div className="form-check" key={genre.id}>
              <input
                className="form-check-input"
                type="checkbox"
                id={genre.name}
                name={genre.name}
                checked={with_genres.includes(String(genre.id))}
                value={genre.id}
                onChange={this.onChange}
              />
              <label className="form-check-label" htmlFor={genre.name}>
                {genre.name}
              </label>
            </div>
          );
        })}
      </div>
    );
  }
}
