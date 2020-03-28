import React, { PureComponent } from 'react';

const getYears = () =>
  Array.from(new Array(30), (_, index) => new Date().getFullYear() - index);

export default class Years extends PureComponent {
  static defaultProps = {
    years: getYears(),
  };

  render() {
    const { onChangeFilters, year, years } = this.props;
    return (
      <div className="form-group">
        <label htmlFor="year">Sort by Release Year:</label>
        <select
          id="year"
          className="form-control"
          name="year"
          value={year}
          onChange={onChangeFilters}
        >
          <option key="default" value="">
            All
          </option>
          {years.map((year) => (
            <option key={year} value={year}>
              {year}
            </option>
          ))}
        </select>
      </div>
    );
  }
}
