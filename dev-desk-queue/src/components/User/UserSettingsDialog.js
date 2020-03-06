import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

import { useHistory } from "react-router"
import {connect} from "react-redux";
import {removeUser, updateUser} from "../../actions";

import cogoToast from 'cogo-toast';


const UserSettingsDialog = props => {
    console.log('userSettings props',props)

    let history = useHistory();


    // const initialInfo = {
    //     username: props.username,
    //     password: '',
    //     confirmPassword: '',
    //     userType: props.userType,
    //     id: props.userId,
    // }

    React.useEffect(() =>{
        setInfo({
                username: props.username,
                password: '',
                confirmPassword: '',
                userType: props.userType,
                id: props.userId,
            })
    },[props.open])

    const [info, setInfo] = React.useState({});

    console.log("User Settings info", info)
    const handleChange = evt => {
        setInfo({
            ...info,
            [evt.target.name]: evt.target.value
        })
    }

    const handleUpdateRequest = () => {
        // this function will validate the user input, if password is '', do not update
        // props.onUpdateUserSettingsRequest(info);

        if(info.password !== info.confirmPassword) {
            //popup cogo toast and do nothing
            cogoToast.error('The passwords do not match', {
                hideAfter: 3,
                position: 'top-center'
            })
        } else if (info.password === "" || info.confirmPassword === "") {
            cogoToast.error("Please provide password to make changes", {
                hideAfter: 3,
                position: "top-center"
            })
        } else {
            props.updateUser({...info,}).then(({username, userType,id})=> {
                // setInfo({username : username, password: '', confirmPassword: '', userType: userType, userId: id});
                props.handleClose()
                cogoToast.info('User has been updated.');
            })
        }
    }

    const removeUser = () => {
        props.removeUser(props.userId)
            .then(() => {

                history.push("/")     
            })
    }

    return (
        <Dialog 
            open={props.open} aria-labelledby="form-dialog-title" fullWidth='false' maxWidth='xs'>
            <DialogContent>
                <h2>Update Your Settings</h2>
                <h4>Enter details below:</h4>
                <TextField 
                    label='User name' 
                    type='text' 
                    name='username' 
                    value={info.username} 
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

                <Button onClick={() => removeUser()} color="secondary" >
                    Delete Account
                </Button>
                <Button onClick={() => handleUpdateRequest()} color="primary">
                    Update
                </Button>
                <Button onClick={() => {
                        // setInfo(initialInfo);
                        // setInfo({username : props.username, password: '', confirmPassword: '', userType: props.userType});
                        props.handleClose();
                    }} 
                    color="primary"
                >
                    Cancel
                </Button>
                
                
            </DialogActions>

        </Dialog>
    )
}

const mapStateToProps = state => {
    // console.log('setting state to props usersetttings');
    return {
        username : state.username,
        userId: state.userId,
        userType: state.userType,

    }
}

export default connect(mapStateToProps, {
    removeUser,
    updateUser,
})(UserSettingsDialog);