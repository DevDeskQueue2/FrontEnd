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
            <FormGroup onSubmit={(evt) => handleSubmit(evt)}>
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

                <Button>Login</Button> 
            </FormGroup>
            <Button onClick={ (evt) => props.onRequestToRegister() } >To Register</Button>
            
        </div>
    )
};

export default Login;