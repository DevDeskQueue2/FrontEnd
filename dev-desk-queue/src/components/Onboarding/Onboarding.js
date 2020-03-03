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
                    onUserRegisterRequest={ ({email, password, isHelper}) => { 
                        const type = isHelper ? 1 : 0
                        // console.log(info);
                        console.log(email);
                        props.signUp({email, password, type}).then(()=> setIsLogin(true))
                        // setIsLogin(true); 
                    }}
                />
        }
    }
    return (
        <div className='onboarding'>
            <h2>{(isLogin) ? 'Login' : 'Register'} below:</h2>
            { renderOnboardComponent(isLogin) }
        </div>
    )
}

const mapStateToProps = state => {
    return {
        isRegistered : state.isRegistered,
        error: state.error
    }
}

export default connect(mapStateToProps, {
    login, signUp
})(Onboarding);