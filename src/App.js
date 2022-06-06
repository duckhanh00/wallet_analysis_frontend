import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
// import CssBaseline from '@material-ui/core/CssBaseline';
import './App.scss'

// Component
import Header from './layout-components/Header';
import Footer from './layout-components/Footer';
import ScrollToTop from './utils/ScrollToTop';

import { Routes } from './react-router/routes';

import store from './redux/store';


class App extends Component {
  state = {}
  componentDidMount() {
    this.onRouteChanged();
  }
  render() {
    let headerComponent = !this.state.isFullPageLayout ? <Header /> : '';
    let footerComponent = !this.state.isFullPageLayout ? <Footer /> : '';
    return (

      <Provider store={store}>
        <BrowserRouter basename="/">
          {/* <CssBaseline /> */}
          {headerComponent}
          <div className="az-content-wrapper">
            <ScrollToTop>
              <Routes />
            </ScrollToTop>
          </div>
          {/* {footerComponent} */}
        </BrowserRouter>
      </Provider>
    );
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.location !== prevProps.location) {
  //     this.onRouteChanged();
  //   }
  // }

  onRouteChanged() {
    console.log("ROUTE CHANGED");
    window.scrollTo(0, 0);
    const fullPageLayoutRoutes = ['/general-pages/signin', '/general-pages/signup', '/general-pages/page-404'];
    for (let i = 0; i < fullPageLayoutRoutes.length; i++) {
      if (this.props.location.pathname === fullPageLayoutRoutes[i]) {
        this.setState({
          isFullPageLayout: true
        })
        document.querySelector('.az-content-wrapper').classList.add('p-0');
        break;
      } else {
        this.setState({
          isFullPageLayout: false
        })
        document.querySelector('.az-content-wrapper').classList.remove('p-0');
      }
    }
  }

}

export default withRouter(App);
