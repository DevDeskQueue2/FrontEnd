import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

const Register = props => {

    const initialInfo = {
        email: '', password: '', confirmPassword: '', isHelper: false
    }

    const [info, setInfo] = React.useState(initialInfo);

    const handleSubmit = evt => {
        evt.preventDefault();
        props.onUserRegisterRequest(info);
        setInfo(initialInfo);
    }

    return (
        <div className='onboarding-form register-form'>
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
                    onChange={ (evt) => setInfo({ ...info, [evt.target.name]: evt.target.value})} />

                <br />

                <TextField 
                    placeholder='Confirm Password' 
                    type='password' 
                    name='confirmPassword' 
                    value={info.password} 
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