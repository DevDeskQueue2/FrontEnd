import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { useHistory } from "react-router"
import {connect} from "react-redux";
import {removeUser, updateUser} from "../../actions";


const UserSettingsDialog = props => {
    console.log(props)

    let history = useHistory();



    const [info, setInfo] = React.useState({
        email: props.email,
        password: '',
        confirmPassword: ''
    })

    console.log("info", info)
    const handleChange = evt => {
        setInfo({
            ...info,
            [evt.target.name]: evt.target.value
        })
    }

    const handleUpdateRequest = () => {
        // this function will validate the user input, if password is '', do not update
        // props.onUpdateUserSettingsRequest(info);
        props.updateUser(info)
        
        props.handleClose();
    }

    const removeUser = () => {
        props.removeUser(props.userId)
            .then(() => {

                props.handleClose();

                history.push("/")     
            })
    }

    return (
        <Dialog open={props.open} onClose={() => props.handleClose} aria-labelledby="form-dialog-title" fullWidth='false' maxWidth='xs'>
            <DialogContent>
                <h2>Update Your Settings</h2>
                <h4>Enter details below:</h4>
                <TextField 
                    label='Email' 
                    type='text' 
                    name='email' 
                    value={info.email} 
                    onChange={(evt) => handleChange(evt)} />
                <br />
                <TextField 
                    label='New Password' 
                    type='password' 
                    name='password' 
                    value={info.password}
                    onChange={(evt) => handleChange(evt)} />
                <br />
                <TextField 
                    label='Confirm Password' 
                    type='password' 
                    name='confirmPassword' 
                    value={info.confirmPassword}
                    onChange={(evt) => handleChange(evt)} />
            
            </DialogContent>
            
            <DialogActions>

                <Button onClick={removeUser} color="secondary" >
                    Delete Account
                </Button>
                <Button onClick={() => handleUpdateRequest()} color="primary">
                    Update
                </Button>
                <Button onClick={() => props.handleClose()} color="primary">
                    Cancel
                </Button>
                
                
            </DialogActions>

        </Dialog>
    )
}

const mapStateToProps = state => {
    return {
        email : state.email,
        userId: state.userId,
    }
}

export default connect(mapStateToProps, {
    removeUser,
    updateUser,
})(UserSettingsDialog);