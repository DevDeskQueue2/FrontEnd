import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';

const Login = props => {

    const initialInfo = {
        email: '', password: ''
    }

    const [info, setInfo] = React.useState(initialInfo);

    const handleSubmit = evt => {
        evt.preventDefault();
        props.onUserLoginRequest(info);
        setInfo(initialInfo);
    }

    return (
        <div className='onboarding-form login-form'>
            <FormGroup>
                <TextField 
                    placeholder='Email' 
                    type='text' 
                    name='email' 
                    value={info.email} 
                    onChange={ (evt) => setInfo({ ...info, [evt.target.name]: evt.target.value}) }/>

                <br />

                <TextField 
                    placeholder='Password' 
                    type='password' 
                    name='password' 
                    value={info.password} 
                    onChange={ (evt) => setInfo({ ...info, [evt.target.name]: evt.target.value}) } />

                <br />
            </FormGroup>
            <div className='onboarding-nav-buttons'>
                <Button variant='outlined' onClick={(evt) => handleSubmit(evt)}>Login</Button> 
                <Button variant='outlined' onClick={ (evt) => props.onRequestToRegister() } >To Register</Button>
            </div>
            
        </div>
    )
};

export default Login;