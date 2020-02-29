import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

import cogoToast from 'cogo-toast';

const Register = props => {

    const initialInfo = {
        email: '', password: '', confirmPassword: '', isHelper: false
    }

    const initialError = {
        isError: false,
        helperText: ''
    }

    const [info, setInfo] = React.useState(initialInfo);
    const [emailError, setEmailError] = React.useState(initialError);
    const [passwordError, setPasswordError] = React.useState(initialError);

    const handleSubmit = evt => {
        evt.preventDefault();

        if(validate()) {
            props.onUserRegisterRequest(info);
            setInfo(initialInfo);
        }
    }

    const validate = () => {
        let isNoError = true;

        let error = {
            isError: false,
            helperText: ''
        }

        let newPasswordError = {
            isError: false,
            helperText: ''
        }

        //validate email
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

        if(info.password !== info.confirmPassword) {
            newPasswordError.isError = true;
            
            cogoToast.error('The passwords do not match', {
                hideAfter: 3,
                position: 'top-center'
            })

            isNoError=false;
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
        <div className='onboarding-form register-form'>
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
                    onChange={ (evt) => setInfo({ ...info, [evt.target.name]: evt.target.value})} />

                <br />

                <TextField 
                    error={passwordError.isError}
                    helperText={passwordError.helperText}
                    placeholder='Confirm Password' 
                    type='password' 
                    name='confirmPassword' 
                    value={info.confirmPassword} 
                    onChange={ (evt) => setInfo({ ...info, [evt.target.name]: evt.target.value})} />

                <br />

                <FormControlLabel
                    value="end"
                    control={<Checkbox onChange={(evt) => setInfo({...info, isHelper: !info.isHelper})}color="primary" />}
                    label="Helper"
                    labelPlacement="end" />

                 
            </FormGroup>
            <div className='onboarding-nav-buttons'>
                <Button variant='outlined' onClick={(evt) => handleSubmit(evt)}>Submit</Button>
                <Button variant='outlined' onClick={ (evt) => props.onRequestToLogin() }>To Login</Button>
            </div>
           
        </div>
    )
};

export default Register;