import React, { Component } from 'react';
import { TabContent, TabPane, Nav, NavItem, Row, Col } from 'reactstrap';
import { NavLink, Switch, Route } from 'react-router-dom';
import classnames from 'classnames';
import MovieDetails from './MovieDetails';
import MovieVideos from './MovieVideos';
import MovieCredits from './MovieCredits';

export default class MovieTabs extends Component {
  render() {
    const { movie } = this.props;

    return (
      <div>
        <Nav tabs>
          <NavItem>
            <NavLink
              to={`/movie/${movie.id}/details`}
              className="nav-link"
              activeClassName="active"
            >
              Details
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              to={`/movie/${movie.id}/videos`}
              className="nav-link"
              activeClassName="active"
            >
              Videos
            </NavLink>
          </NavItem>

          <NavItem>
            <NavLink
              to={`/movie/${movie.id}/credits`}
              className="nav-link"
              activeClassName="active"
            >
              Credits
            </NavLink>
          </NavItem>
        </Nav>
        {/* <TabContent>
          <TabPane>
            <div className="row">
              <Switch>
                <Route path="/movie/:id/details">
                  <MovieDetails movie={movie} />
                </Route>
                <Route path="/movie/:id/videos" component={MovieVideos} />
                <Route path="/movie/:id/credits" component={MovieCredits} />
              </Switch>
            </div>
          </TabPane>
        </TabContent> */}
      </div>
    );
  }
}
