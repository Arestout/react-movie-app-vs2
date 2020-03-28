import React, { PureComponent } from 'react';
import SortBy from './SortBy';
import Pagination from './Pagination';
import Genres from './Genres';
import Years from './Years';

export default class Filters extends PureComponent {
  render() {
    const {
      filters: { sort_by, year, with_genres },
      onChangeFilters,
      onChangePagination,
      page,
      total_pages,
      resetFilters,
    } = this.props;

    return (
      <form className="mb-3">
        <SortBy
          sort_by={sort_by}
          onChangeFilters={onChangeFilters}
          year={year}
        />

        <Years onChangeFilters={onChangeFilters} year={year} />

        <Genres onChangeFilters={onChangeFilters} with_genres={with_genres} />

        <Pagination
          page={page}
          onChangePagination={onChangePagination}
          resetFilters={resetFilters}
          total_pages={total_pages}
        />
      </form>
    );
  }
}
