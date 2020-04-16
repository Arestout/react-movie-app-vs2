import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import CallApi from '../../../api/api';
import MovieTabs from './MovieTabs';
import MovieDetails from './MovieDetails';
import MovieVideos from './MovieVideos';
import MovieCredits from './MovieCredits';
import MoviePreview from './MoviePreview';
import { LoaderSpinner } from '../../UIComponents/LoaderSpinner';
import { TabContent, TabPane } from 'reactstrap';

export default class MoviePage extends Component {
  constructor() {
    super();

    this.state = {
      movie: {},
      isLoading: false,
    };
  }

  updateLoading = (value) => {
    this.setState({
      isLoading: value,
    });
  };

  updateMovies = (value) => {
    this.setState({
      movie: value,
    });
  };

  componentDidMount() {
    this.updateLoading(true);
    CallApi.get(`/movie/${this.props.match.params.id}`).then((data) => {
      this.updateMovies(data);
      this.updateLoading(false);
    });
  }

  render() {
    const { movie, isLoading } = this.state;

    if (isLoading) {
      return <LoaderSpinner />;
    }

    return (
      <div className="container">
        <MoviePreview movie={movie} />
        <div className="row ml-5 mt-5">
          <div className="col-12 loader">
            <MovieTabs />
            <TabContent>
              <TabPane>
                <Switch>
                  <Route path="/movie/:id/details">
                    <MovieDetails movie={movie} />
                  </Route>
                  <Route path="/movie/:id/videos" component={MovieVideos} />
                  <Route path="/movie/:id/credits" component={MovieCredits} />
                  <Redirect
                    to={`/movie/${this.props.match.params.id}/details`}
                  />
                </Switch>
              </TabPane>
            </TabContent>
          </div>
        </div>
      </div>
    );
  }
}
