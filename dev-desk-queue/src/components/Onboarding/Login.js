import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import cogoToast from 'cogo-toast';

import {connect} from "react-redux";


const Login = props => {

    console.log(props)

    const initialInfo = {
        email: '', password: ''
    }

    const initialErrors = {
        email: {
            isError: false,
            helperText: ''
        },
        password: {
            isError: false,
            helperText: ''
        }
    }

    const initialError = {
        isError: false,
        helperText: ''
    }

    const [info, setInfo] = React.useState(initialInfo);
    const [emailError, setEmailError] = React.useState(initialError)
    const [passwordError, setPasswordError] = React.useState(initialError);

    const handleSubmit = evt => {
        evt.preventDefault();

        console.log('validate', validate());

        if(validate()) {
            props.onUserLoginRequest(info);
            setInfo(initialInfo);
        } else {
            cogoToast.error('Incorrect credentials', {
                hideAfter: 3,
                position: 'top-center'
            });
        }

        console.log('done with validation', emailError);
    }


    const validate = () => {
        //this functino validates user input
        console.log('validating', info);
        let isNoError = true;
        let error = {
            isError: false,
            helperText: ''
        }

        let newPasswordError =  {
            isError: false,
            helperText: ''
        }

        if(!validateEmail(info.email)) {
            error.isError = true;
            error.helperText = 'Invalid Address';
            isNoError = false;
        }

        setEmailError(error);

        if(!validatePassword(info.password)) {
            newPasswordError.isError = true;
            newPasswordError.helperText = 'Invalid Password'
            isNoError = false;
        }

        setPasswordError(newPasswordError);

        function validateEmail(elementValue){      
            var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            return emailPattern.test(elementValue); 
          } 

        function validatePassword(password) {
            //To check a password between 6 to 20 characters which contain at least one numeric digit, one uppercase and one lowercase letter
            var re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/;
            return re.test(String(password));
        }

        return isNoError;
    }



    return (
        <div className='onboarding-form login-form'>
            <FormGroup>
                <TextField 
                    error={emailError.isError}
                    helperText={emailError.helperText}
                    placeholder='Email' 
                    type='text' 
                    name='email' 
                    value={info.email} 
                    onChange={ (evt) => setInfo({ ...info, [evt.target.name]: evt.target.value}) }/>

                <br />

                <TextField 
                    error={passwordError.isError}
                    helperText={passwordError.helperText}
                    placeholder='Password' 
                    type='password' 
                    name='password' 
                    value={info.password} 
                    onChange={ (evt) => setInfo({ ...info, [evt.target.name]: evt.target.value}) } />

                <br />

            </FormGroup>
            
            <div className='onboarding-nav-buttons'>
                <Button variant='outlined' disabled={props.isFetching} onClick={(evt) => handleSubmit(evt)}>Login</Button> 
                <Button variant='outlined' onClick={ (evt) => props.onRequestToRegister() } >To Register</Button>
            </div>
            
        </div>
    )
};

const mapStateToProps = state => {
    return {
        isFetching : state.isFetching,
        error: state.error,
        
    }
}

export default connect(mapStateToProps, {})(Login);