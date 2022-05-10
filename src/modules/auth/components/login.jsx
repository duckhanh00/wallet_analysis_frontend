/* eslint-disable jsx-a11y/anchor-has-content */
/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from 'react';
import { connect } from 'react-redux';

import { AuthActions } from '../redux/action';

import { CreateUserModal } from './createUserModal'

import './login.css';

function Login(props) {
    const [state, setState] = useState({
        email: '',
        password: ''
    })
    const { email, password } = state;

    const handleEmail = (e) => {
        setState({
            ...state,
            email: e.target.value
        })
    }

    const handlePassword = (e) => {
        setState({
            ...state,
            password: e.target.value
        })
    }

    const handleLogin = () => {
        props.login(state);
    }

    return (
        <React.Fragment>
            <CreateUserModal/>

            <div className="login">
                <div className="form-login">
                    <h1 className="form-header">N</h1>
                    <div className="form-login-main">
                        <form onSubmit={(e) => handleLogin(e)}>
                            <input placeholder="E-mail" name="email" type="email" value={email} onChange={(e) => handleEmail(e)}/>
                            <input placeholder="Password" name="password" type="password" value={password} onChange={(e) => handlePassword(e)}/>

                            <button type="submit" className="btn btn-success" style={{ marginBottom: "5px" }}>Đăng nhập</button>
                            <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#createUserModal">Đăng ký</button>
                        </form>
                    </div>
                </div>
            </div>
        </React.Fragment>
    )
}

function mapState(state) {
    const { user } = state;
    return { user };
}
const actions = {
    login: AuthActions.login,
}

export default connect(mapState, actions)(Login);