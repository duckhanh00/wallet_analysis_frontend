import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';

import Page from './page';

const PublicRoute = ({ component: Component, ...rest }) => {
    return (
        <Route {...rest} render={(props) =>
            <Page title={rest.title}>
                <Component {...props} />
            </Page>
        }/>
    )
}

export { PublicRoute }