import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Select, InputLabel, MenuItem, FormControl  } from '@material-ui/core';

const EditTicketDialog = props => {

    console.log('edit ticket dialog', props);

    const initialInfo = {
        title: '', 
        description: '',
        tried: '',
        category: ''
    }

    const isStudent = props.userType === 'student';

    const [info, setInfo] = React.useState(props.ticket) 

    React.useEffect( () => {
        setInfo(props.ticket);
    }, [])

    React.useEffect( () => {
        setInfo(props.ticket)
    }, [props.open])

    const handleChange = evt => {
        setInfo({
            ...info,
            [evt.target.name]: evt.target.value
        })
    }

    const handleEditRequest = () => {
        // this function will send the ticket information back to whomever called it
        props.onUserEditTicketRequest(info);
        setInfo(initialInfo)
        props.handleClose();
    }

    const renderSelect = enabled => {
        if(enabled) {
            return (
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={info.category}
                        onChange={evt => setInfo({...info, category: evt.target.value})}
                    >
                        {
                            props.categories.map(item => {
                                return <MenuItem value={item}>{item}</MenuItem> 
                            })
                        }  
                    </Select>
                </FormControl>
            )
        } else {
            return (
                <TextField
                    label='Category'
                    type='text'
                    name='category'
                    disabled={true}
                    value={info.category} />
            )
        }
    }

    return (
        <Dialog open={props.open} onClose={() => props.handleClose} aria-labelledby="form-dialog-title" fullWidth='false' maxWidth='xs'>
            <DialogContent>
                <h2>Ticket Information</h2>
                <h4>Edit details below:</h4>
                <TextField 
                    label='Title' 
                    type='text' 
                    name='title' 
                    disabled={!isStudent}
                    value={info.title} 
                    onChange={(evt) => handleChange(evt)} />
                <br />
                <TextField 
                    label='Description' 
                    type='text' 
                    name='description'  
                    disabled={!isStudent}
                    value={info.description}
                    onChange={(evt) => handleChange(evt)} />
                <br />
                <TextField 
                    label="What I've tried"
                    type='text' 
                    name='tried'  
                    disabled={!isStudent}
                    value={info.tried}
                    onChange={(evt) => handleChange(evt)} />

                <br />

                { renderSelect(isStudent, 'Category')}
                
            </DialogContent>
            
            <DialogActions>

                <Button onClick={() => handleEditRequest()} color="primary">
                    Edit
                </Button>
                <Button onClick={() => props.handleClose()} color="primary">
                    Cancel
                </Button>
                
            </DialogActions>

        </Dialog>
    )
}

export default EditTicketDialog;