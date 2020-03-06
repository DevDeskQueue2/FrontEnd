import React from 'react';
import Login from './Login';
import Register from './Register';
import cogoToast from 'cogo-toast';

import {connect} from "react-redux";

import {login, signUp} from "../../actions";

const Onboarding = props => {

    const [isLogin, setIsLogin] = React.useState(true)

    const renderOnboardComponent = (renderLogin) => {
        if(renderLogin) {
            return <Login 
                        onUserLoginRequest={ ({email, password}) => { 
                            console.log("onUserLoginRequest"); 
                            props.login({"username": email, password}).then((res) => {
                                    if(res.status === 401){
                                        cogoToast.error('Incorrect credentials', {
                                            hideAfter: 3,
                                            position: 'top-center'
                                        });
                                    } else if (res.status === 500 || res.status === 404) {
                                        cogoToast.error("Internal Error", {
                                            hideAfter : 3,
                                            position: "top-center"
                                        })
                                    } else {
                                        props.history.push("/dashboard")
                                    }
                                    
                                });
                            
                        } } 
                        onRequestToRegister={ () => setIsLogin(false) }
                    />
        } else {
            return <Register 
                    onRequestToLogin={ () => setIsLogin(true) } 
                    onUserRegisterRequest={ ({email, password, isHelper}) => { 
                        
                        const userType = isHelper ? 1 : 0
                        // console.log(info);
                        
                        props.signUp({username: email, password, userType}).then(()=> setIsLogin(true))
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