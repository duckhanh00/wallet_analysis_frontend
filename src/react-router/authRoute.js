import React, { useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { checkLogin } from '../helpers'

const AuthRoute = ({ component: Component, ...rest }) => {
    useEffect(() => {
        document.title = rest.title ?? "Loading..."
    })

    return (
        <Route {...rest} render={(props) => {
            if (!true) {
                return <Component {...props} />
            } else {
                return <Redirect to="/home" />
            }
        }}/>
    )
}

export { AuthRoute }