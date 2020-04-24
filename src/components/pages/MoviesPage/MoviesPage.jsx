import React from 'react';
import Filters from '../../Filters/Filters';
import MoviesList from '../../Movies/MoviesList';

class MoviesPage extends React.Component {
  constructor() {
    super();

    this.initialState = {
      filters: {
        sort_by: 'popularity.desc',
        year: 'default',
        with_genres: [],
      },
      page: 1,
      total_pages: null,
    };

    this.state = this.initialState;
  }

  onChangeFilters = (event) => {
    const { name, value } = event.target;
    this.setState((state) => ({
      filters: {
        ...state.filters,
        [name]: value,
      },
    }));
  };

  onChangePagination = ({ page, total_pages = this.state.total_pages }) => {
    this.setState({
      page,
      total_pages,
    });
  };

  resetFilters = () => {
    this.setState(this.initialState);
  };

  render() {
    const { filters, page, total_pages } = this.state;
    return (
      <div className="container">
        <div className="row mt-4">
          <div className="col-4">
            <div className="card">
              <div className="card-body">
                <h3>Filters:</h3>
                <Filters
                  filters={filters}
                  page={page}
                  total_pages={total_pages}
                  onChangeFilters={this.onChangeFilters}
                  onChangePagination={this.onChangePagination}
                  resetFilters={this.resetFilters}
                />
              </div>
            </div>
          </div>
          <div className="col-8">
            <MoviesList
              filters={filters}
              page={page}
              onChangePagination={this.onChangePagination}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MoviesPage;
