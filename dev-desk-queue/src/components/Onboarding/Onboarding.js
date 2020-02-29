import React from 'react';
import Login from './Login';
import Register from './Register';

const Onboarding = props => {

    const [isLogin, setIsLogin] = React.useState(true)

    const renderOnboardComponent = (renderLogin) => {
        if(renderLogin) {
            return <Login onUserLoginRequest={ (info) => { console.log(info); props.history.push('/dashboard');} } onRequestToRegister={ () => setIsLogin(false) }/>
        } else {
            return <Register onRequestToLogin={ () => setIsLogin(true) } onUserRegisterRequest={ (info) => { console.log(info); setIsLogin(true); } }/>
        }
    }
    return (
        <div className='onboarding'>
            <h2>Enter {(isLogin) ? 'Login' : 'Register'} below:</h2>
            { renderOnboardComponent(isLogin) }
        </div>
    )
}

export default Onboarding;