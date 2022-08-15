import React, { } from 'react';
import { Route } from 'react-router-dom';

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