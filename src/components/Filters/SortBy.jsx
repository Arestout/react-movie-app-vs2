import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class SortBy extends PureComponent {
  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
    sort_by: PropTypes.string.isRequired,
  };

  static defaultProps = {
    options: [
      { label: 'Popular Descending', value: 'popularity.desc' },
      { label: 'Popular Ascending', value: 'popularity.asc' },
      { label: 'Rating Descending', value: 'vote_average.desc' },
      { label: 'Rating Ascending', value: 'vote_average.asc' },
    ],
  };

  render() {
    const { sort_by, onChangeFilters, options } = this.props;
    console.log('SortBy');
    return (
      <div className="form-group">
        <label htmlFor="sort_by">Sort by:</label>
        <select
          id="sort_by"
          className="form-control mb-2"
          name="sort_by"
          value={sort_by}
          onChange={onChangeFilters}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
