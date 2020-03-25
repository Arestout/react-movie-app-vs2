import React, { Component } from 'react';

export default class Pagination extends Component {
    render() {
        const { page, onChangePage, resetFilters, totalPages } = this.props;
        return (
            <>
                <div className="mb-4 row justify-content-center">
                    <button
                        type="button"
                        className="btn btn-outline-secondary mr-4"
                        disabled={page === 1}
                        onClick={onChangePage.bind(null, page - 1)}
                    >
                        Previous
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary mr-4"
                        onClick={onChangePage.bind(null, page + 1)}
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
                        {page} of {totalPages}
                    </div>
                </div>
            </>
        );
    }
}
