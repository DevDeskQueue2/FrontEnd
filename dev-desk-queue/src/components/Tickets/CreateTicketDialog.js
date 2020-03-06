import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Select, InputLabel, MenuItem, FormControl  } from '@material-ui/core';

import {connect} from "react-redux";
import {addTicket,fetchStudentTicketsId} from "../../actions";


const CreateTicketDialog = props => {

    

    const initialInfo = {
        id: props.userId,
        title: '', 
        description: '',
        tried: '',
        category: ''
    }

    const [info, setInfo] = React.useState(initialInfo)

    const handleChange = evt => {
        console.log("create ticket",info)
        setInfo({
            ...info,
            [evt.target.name]: evt.target.value
        })
    }

    const handleCreateRequest = () => {
        // this function will send the ticket information back to whomever called it
        // props.onUserCreateTicketRequest(info);
        props.addTicket(info).then(()=>{
            props.fetchStudentTicketsId(props.userId);
        })
        setInfo(initialInfo)
        props.handleClose();
    }

//     React.useEffect(()=>{
//         props.fetchStudentTicketsId(props.userId)
//     },[props.addTicket])

    return (
        <Dialog open={props.open} onClose={() => props.handleClose} aria-labelledby="form-dialog-title" fullWidth='false' maxWidth='xs'>
            <DialogContent>
                <h2>Ticket Information</h2>
                <h4>Enter details below:</h4>
                <TextField 
                    label='Title' 
                    type='text' 
                    name='title' 
                    value={info.title} 
                    onChange={(evt) => handleChange(evt)} />
                <br />
                <TextField 
                    label='Description' 
                    type='text' 
                    name='description' 
                    value={info.description}
                    onChange={(evt) => handleChange(evt)} />
                <br />
                <TextField 
                    label="What I've tried"
                    type='text' 
                    name='tried' 
                    value={info.tried}
                    onChange={(evt) => handleChange(evt)} />

                <br />

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
            </DialogContent>
            
            <DialogActions>

                <Button onClick={() => handleCreateRequest()} color="primary">
                    Create
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
        userId: state.userId,

    }
}
export default connect(mapStateToProps, {
    fetchStudentTicketsId,
    addTicket,
})(CreateTicketDialog);
