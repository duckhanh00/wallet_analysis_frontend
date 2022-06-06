import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
import { checkLogin } from '../helpers'
import Page from './page';

const AuthRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) => {
            if (!checkLogin()) {
                return <Page title={rest.title}>
                    <Component {...props} />
                </Page>
            } else {
                return <Redirect to="/home" />
            }
        }}/>
    )
}

export { AuthRoute }