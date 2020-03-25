import React from 'react';
import Filters from './Filters/Filters';
import MoviesList from './Movies/MoviesList';

export default class App extends React.Component {
    constructor() {
        super();

        this.state = {
            filters: {
                sort_by: 'popularity.desc',
                year: 'default',
                with_genres: []
            },
            page: 1,
            totalPages: ''
        };
    }

    setTotalPages = totalPages => {
        this.setState({ totalPages });
    };

    onChangeFilters = event => {
        const { name, value } = event.target;
        this.setState(state => ({
            filters: {
                ...state.filters,
                [name]: value
            }
        }));
    };

    onChangePage = page => {
        this.setState({
            page
        });
    };

    resetFilters = () => {
        this.setState({
            filters: {
                sort_by: 'popularity.desc',
                year: 'default',
                with_genres: []
            },
            page: 1
        });
    };

    render() {
        const { filters, page, totalPages } = this.state;
        return (
            <div className="container">
                <div className="row mt-4">
                    <div className="col-4">
                        <div className="card" style={{ width: '100%' }}>
                            <div className="card-body">
                                <h3>Filters:</h3>
                                <Filters
                                    filters={filters}
                                    page={page}
                                    totalPages={totalPages}
                                    onChangeFilters={this.onChangeFilters}
                                    onChangePage={this.onChangePage}
                                    resetFilters={this.resetFilters}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="col-8">
                        <MoviesList
                            filters={filters}
                            page={page}
                            onChangePage={this.onChangePage}
                            setTotalPages={this.setTotalPages}
                        />
                    </div>
                </div>
            </div>
        );
    }
}
