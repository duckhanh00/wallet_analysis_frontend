import React, { lazy, Suspense } from 'react';
import { connect } from 'react-redux';

import { Switch, Route, Redirect, useLocation } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion/dist/framer-motion'

import { PrivateRoute } from './privateRoute';
import { AuthRoute } from './authRoute';
import { PublicRoute } from './publicRoute';

import { PermissionRoute, AllRoute } from './permission';

const Dashboard = lazy(() => import('../app/dashboard/Dashboard'))
const Buttons = lazy(() => import('../app/ui-elements/Buttons'))
const ClothingMan = lazy(() => import('../modules/clothing-man/components'))
const RelationGraph = lazy(() => import('../modules/relation-graph/components'))
const WalletType = lazy(() => import('../modules/wallet-type/components'))

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
              <motion.div
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants}
                transition={pageTransition}>
                <PublicRoute
                  path={PermissionRoute.DASHBOARD.path}
                  title={PermissionRoute.DASHBOARD.title}
                  component={Dashboard}
                />
                <PublicRoute
                  path={PermissionRoute.CLOTHING_MAN.path}
                  title={PermissionRoute.CLOTHING_MAN.title}
                  component={ClothingMan}
                />
                <PublicRoute
                  path={PermissionRoute.CLOTHING_WOMAN.path}
                  title={PermissionRoute.CLOTHING_WOMAN.title}
                  component={Buttons}
                />
                <PublicRoute
                  path={PermissionRoute.RELATION_GRAPH.path}
                  title={PermissionRoute.RELATION_GRAPH.title}
                  component={RelationGraph}
                />
                <PublicRoute
                  path={PermissionRoute.WALLET_TYPE.path}
                  title={PermissionRoute.WALLET_TYPE.title}
                  component={WalletType}
                />
              </motion.div>
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
