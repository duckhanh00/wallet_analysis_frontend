import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { Dropdown } from "react-bootstrap";
export class Header extends Component {
  closeMenu(e) {
    e.target.closest(".dropdown").classList.remove("show");
    e.target.closest(".dropdown .dropdown-menu").classList.remove("show");
  }

  toggleHeaderMenu(e) {
    e.preventDefault();
    document.querySelector("body").classList.toggle("az-header-menu-show");
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      document.querySelector("body").classList.remove("az-header-menu-show");
    }
  }

  render() {
    return (
      <div>
        <div className="az-header">
          <div className="container">
            <div className="az-header-left">
              <a href="#/" className="az-logo">
                <img
                  src={require("../../assets/images/coin.png")}
                  alt="lo"
                />
                <span>Blockchain Space</span>
              </a>
              <a
                id="azMenuShow"
                onClick={(event) => this.toggleHeaderMenu(event)}
                className="az-header-menu-icon d-lg-none"
                href="#/"
              >
                <span></span>
              </a>
            </div>
            <div className="az-header-menu">
              <ul className="nav">
                <li
                  className={
                    this.isPathActive("/home")
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to="/home" className="nav-link">
                    <i className="typcn typcn-chart-area-outline"></i> Home
                  </Link>
                </li>

                <li
                  className={
                    this.isPathActive("/relationship-space")
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to="/relationship-space" className="nav-link">
                    Relationship Space
                  </Link>
                </li>

                <li
                  className={
                    this.isPathActive("/whale-space")
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Link to="/whale-space" className="nav-link">
                    Whale Space
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Header);
