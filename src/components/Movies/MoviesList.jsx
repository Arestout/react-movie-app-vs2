import React, { Component } from 'react';
import MovieItem from './MovieItem';
import { API_URL, API_KEY_3 } from '../../api/api';

export default class MovieList extends Component {
    constructor() {
        super();

        this.state = {
            movies: [],
            isLoading: false
        };
    }

    getMovies = (filters, page) => {
        this.setState({
            isLoading: true
        });
        const { sort_by, year, with_genres } = filters;
        const selectedGenres = with_genres.join(',');
        const link = `${API_URL}/discover/movie?api_key=${API_KEY_3}&language=en-US&with_genres=${selectedGenres}&sort_by=${sort_by}&primary_release_year=${year}&page=${page}`;
        fetch(link)
            .then(response => {
                return response.json();
            })
            .then(data => {
                this.setState(
                    state => ({
                        movies: data.results,
                        isLoading: false
                    }),
                    () => {
                        this.props.setTotalPages(data.total_pages);
                    }
                );
            });
    };

    componentDidMount() {
        this.getMovies(this.props.filters, this.props.page);
    }

    // componentWillReceiveProps(nextProps) {
    //     if (nextProps.sort_by !== this.props.sort_by) {
    //         this.getMovies(nextProps.filters);
    //     }
    // }

    componentDidUpdate(prevProps) {
        if (
            prevProps.filters.sort_by !== this.props.filters.sort_by ||
            prevProps.filters.year !== this.props.filters.year ||
            prevProps.filters.with_genres !== this.props.filters.with_genres
        ) {
            this.props.onChangePage(1);
            this.getMovies(this.props.filters, 1);
        }

        if (prevProps.page !== this.props.page) {
            this.getMovies(this.props.filters, this.props.page);
        }
    }

    render() {
        const { movies, isLoading } = this.state;

        return (
            <div className="row">
                {!isLoading ? (
                    movies.length > 0 ? (
                        movies.map(movie => {
                            return (
                                <div key={movie.id} className="col-6 mb-4">
                                    <MovieItem item={movie} />
                                </div>
                            );
                        })
                    ) : (
                        <h3>No results found matching your criteria</h3>
                    )
                ) : (
                    <h3>Loading...</h3>
                )}
            </div>
        );
    }
}
