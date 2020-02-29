import React from 'react';

const TempLogin = props => {

    return (
        <div className='temp-login' onClick={() => props.history.push('/dashboard')}>
            Login
        </div>
    )
}

export default TempLogin;