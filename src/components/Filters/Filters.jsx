import React from 'react';
import SortBy from './SortBy';
import Pagination from './Pagination';
import Genres from './Genres';

export default class Filters extends React.Component {
    render() {
        const {
            filters: { sort_by, year, with_genres },
            onChangeFilters,
            onChangePage,
            page,
            totalPages,
            resetFilters
        } = this.props;
        return (
            <form className="mb-3">
                <SortBy
                    sort_by={sort_by}
                    onChangeFilters={onChangeFilters}
                    year={year}
                />

                <Genres
                    onChangeFilters={onChangeFilters}
                    with_genres={with_genres}
                />

                <Pagination
                    page={page}
                    onChangePage={onChangePage}
                    resetFilters={resetFilters}
                    totalPages={totalPages}
                />
            </form>
        );
    }
}
