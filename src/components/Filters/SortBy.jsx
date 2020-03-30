import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import UISelect from '../UIComponents/UISelect';

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

    return (
      <UISelect
        id="sort_by"
        name="sort_by"
        value={sort_by}
        onChange={onChangeFilters}
        labelText={'Sort by:'}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </UISelect>
    );
  }
}
