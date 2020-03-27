import React, { Component } from 'react';

export default class Pagination extends Component {
  nextPage = (step) => () => {
    this.props.onChangePagination({
      page: this.props.page + step,
      total_pages: this.props.total_pages,
    });
  };

  prevPage = (step) => () => {
    this.props.onChangePagination({
      page: this.props.page - step,
      total_pages: this.props.total_pages,
    });
  };

  render() {
    const { page, resetFilters, total_pages } = this.props;
    return (
      <>
        <div className="mb-4 row justify-content-center">
          <button
            type="button"
            className="btn btn-outline-secondary mr-4"
            disabled={page === 1}
            onClick={this.prevPage(1)}
          >
            Previous
          </button>
          <button
            type="button"
            className="btn btn-outline-secondary mr-4"
            disabled={page === total_pages}
            onClick={this.nextPage(1)}
          >
            Next
          </button>
          <button
            type="button"
            className="btn btn-outline-danger"
            onClick={resetFilters}
          >
            Reset
          </button>
        </div>
        <div className="row justify-content-md-center">
          <div className="col-4">
            {page} of {total_pages}
          </div>
        </div>
      </>
    );
  }
}
