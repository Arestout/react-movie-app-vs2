import React, { Component } from 'react';
import { Nav, NavItem } from 'reactstrap';
import { NavLink, withRouter } from 'react-router-dom';

class MovieTabs extends Component {
  render() {
    const {
      match: {
        params: { id },
      },
    } = this.props;

    return (
      <Nav tabs>
        <NavItem>
          <NavLink to={`/movie/${id}/details`} className="nav-link">
            Details
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to={`/movie/${id}/videos`} className="nav-link">
            Videos
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to={`/movie/${id}/credits`} className="nav-link">
            Credits
          </NavLink>
        </NavItem>
      </Nav>
    );
  }
}

export default withRouter(MovieTabs);
