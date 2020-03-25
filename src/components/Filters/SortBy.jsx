import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class SortBy extends Component {
    static propTypes = {
        onChangeFilters: PropTypes.func.isRequired,
        sort_by: PropTypes.string.isRequired
    };

    static defaultProps = {
        options: [
            { label: 'Popular Descending', value: 'popularity.desc' },
            { label: 'Popular Ascending', value: 'popularity.asc' },
            { label: 'Rating Descending', value: 'vote_average.desc' },
            { label: 'Rating Ascending', value: 'vote_average.asc' }
        ]
    };

    generateYearOptions = (start, end) => {
        const length = end - start + 1;
        return Array.from({ length }, (_, i) => start + i);
    };

    render() {
        const { sort_by, onChangeFilters, options, year } = this.props;
        const yearOptions = this.generateYearOptions(1950, 2025);

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
                    {options.map(option => (
                        <option key={option.value} value={option.value}>
                            {option.label}
                        </option>
                    ))}
                </select>

                <label htmlFor="year">Year:</label>
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
                    {yearOptions.map(year => (
                        <option key={year} value={year}>
                            {year}
                        </option>
                    ))}
                </select>
            </div>
        );
    }
}
