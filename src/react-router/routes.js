import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';

import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';

import { ThemeProvider } from '@material-ui/styles';

import { PrivateRoute } from './privateRoute';
import { AuthRoute } from './authRoute';
import { PublicRoute } from './publicRoute';

// Theme
import MuiTheme from '../theme';

// Layout Blueprints
import { LeftSidebar, PresentationLayout } from '../layout-blueprints';

import { PermissionRoute, AllRoute } from './permission';

const NotFound = lazy(() => import('../modules/not-found'))

const OverviewDashboard = lazy(() => import('../modules/overview/components'));
const UserAnalysis = lazy(() => import('../modules/user-analysis/components'));

const Routes = props => {
  const { user } = props;
  const location = useLocation();

  const pageVariants = {
    initial: {
      opacity: 0,
      scale: 0.99
    },
    in: {
      opacity: 1,
      scale: 1
    },
    out: {
      opacity: 0,
      scale: 1.01
    }
  };

  const pageTransition = {
    type: 'tween',
    ease: 'anticipate',
    duration: 0.4
  };

  let currentUser = user.currentUser

  return (
    <ThemeProvider theme={MuiTheme}>
      <AnimatePresence>
        <Suspense
          fallback={
            <div className="d-flex align-items-center vh-100 justify-content-center text-center font-weight-bold font-size-lg py-3">
              <div className="w-50 mx-auto">
                Please wait while we load the live preview examples
              </div>
            </div>
          }>
          <Switch>
            <Route path={AllRoute}>
              <LeftSidebar>
                <Switch location={location} key={location.pathname}>
                  <motion.div
                    initial="initial"
                    animate="in"
                    exit="out"
                    variants={pageVariants}
                    transition={pageTransition}>
                    <PublicRoute
                      path={PermissionRoute.OVERVIEW.path}
                      title={PermissionRoute.OVERVIEW.title}
                      component={OverviewDashboard}
                    />
                    <PublicRoute
                      path={PermissionRoute.USER_ANALYSIS.path}
                      title={PermissionRoute.USER_ANALYSIS.title}
                      component={UserAnalysis}
                    />
                    <PublicRoute
                      path={PermissionRoute.NOT_FOUND.path}
                      title={PermissionRoute.NOT_FOUND.title}
                      component={NotFound}
                    />
                  </motion.div>
                </Switch>
              </LeftSidebar>
            </Route>
            <Redirect to="/404" />
          </Switch>
        </Suspense>
      </AnimatePresence>
    </ThemeProvider>
  );
};

function mapState(state) {
  return state;
}
const actions = {};

const connectedRoutes = connect(mapState, actions)(Routes);
export { connectedRoutes as Routes };
