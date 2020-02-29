import React from 'react';
import Login from './Login';
import Register from './Register';

import {connect} from "react-redux";

import {login, signUp} from "../../actions";

const Onboarding = props => {

    const [isLogin, setIsLogin] = React.useState(true)

    const renderOnboardComponent = (renderLogin) => {
        if(renderLogin) {
            return <Login 
                        onUserLoginRequest={ (info) => { 
                            console.log(info); 
                            props.login(info).then(() => props.history.push('/dashboard'));
                        } } 
                        onRequestToRegister={ () => setIsLogin(false) }
                    />
        } else {
            return <Register 
                    onRequestToLogin={ () => setIsLogin(true) } 
                    onUserRegisterRequest={ (info) => { 
                        console.log(info);
                        props.signUp(info).then(()=> setIsLogin(true))
                        // setIsLogin(true); 
                    }}
                />
        }
    }
    return (
        <div className='onboarding'>
            <h2>Enter {(isLogin) ? 'Login' : 'Register'} below:</h2>
            { renderOnboardComponent(isLogin) }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isRegistered : state.isRegistered
    }
}

export default connect(mapStateToProps, {
    login, signUp
})(Onboarding);