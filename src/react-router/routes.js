import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';

import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion'

import { PrivateRoute } from './privateRoute';
import { AuthRoute } from './authRoute';
import { PublicRoute } from './publicRoute';

import { PermissionRoute, AllRoute } from './permission';

const RelationshipSpace = lazy(() => import('../modules/relationship-space/components'))
const WhaleSpace = lazy(() => import('../modules/whale-space/components'))
const Home = lazy(() => import('../modules/home/components'))

const Routes = props => {
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

  return (
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
            <Switch location={location} key={location.pathname}>
              {/* <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}> */}
                <PublicRoute
                  path={PermissionRoute.HOME.path}
                  title={PermissionRoute.HOME.title}
                  component={Home}
                />
                <PublicRoute
                  path={PermissionRoute.RELATIONSHIP_SPACE.path}
                  title={PermissionRoute.RELATIONSHIP_SPACE.title}
                  component={RelationshipSpace}
                />
                <PublicRoute
                  path={PermissionRoute.WHALE_SPACE.path}
                  title={PermissionRoute.WHALE_SPACE.title}
                  component={WhaleSpace}
                />
              {/* </motion.div> */}
            </Switch>
          </Route>
          <Redirect to="/404" />
        </Switch>
      </Suspense>
    </AnimatePresence>
  );
};

function mapState(state) {
  return state;
}
const actions = {};

const connectedRoutes = connect(mapState, actions)(Routes);
export { connectedRoutes as Routes };
