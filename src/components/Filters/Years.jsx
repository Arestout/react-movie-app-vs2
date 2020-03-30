import React, { PureComponent } from 'react';
import UISelect from '../UIComponents/UISelect';
import PropTypes from 'prop-types';

const getYears = () =>
  Array.from(new Array(30), (_, index) => new Date().getFullYear() - index);

export default class Years extends PureComponent {
  static defaultProps = {
    years: getYears(),
  };

  static propTypes = {
    onChangeFilters: PropTypes.func.isRequired,
    year: PropTypes.string.isRequired,
  };

  render() {
    const { onChangeFilters, year, years } = this.props;
    return (
      <UISelect
        id="year"
        name="year"
        value={year}
        onChange={onChangeFilters}
        labelText="Sort by Release Year:"
      >
        <option key="default" value="">
          All
        </option>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </UISelect>
    );
  }
}
