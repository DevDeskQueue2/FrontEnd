import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Select, InputLabel, MenuItem, FormControl  } from '@material-ui/core';


import {connect} from "react-redux";
import {assignTicket} from "../../actions";

const EditTicketDialog = props => {

    console.log('edit ticket dialog', props);

    const initialInfo = {
        helper : {
            id: "",
            username: ""
        },
        student : {
            id: "",
            username: ""
        },
        ticket : {
            category: "",
            description : "",
            id : "",
            status : "",
            title: "",
            tried: "",
            }
    }

    const isStudent = props.userType === '0';
    //student

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
            ticket: {
                ...info.ticket,
                [evt.target.name]: evt.target.value
            }
            
        })
    }

    const handleEditRequest = () => {
        // this function will send the ticket information back to whomever called it
        // if(!isComplete) {
        //     props.onUserEditTicketRequest(info);
        // } else {
        //     props.onUserEditTicketRequest({...info, status: 'Resolved'})
        // }
        // setInfo(initialInfo)
        // props.handleClose();

        console.log(props.ticket)
    }

    const handleAssignRequest = () => {
        props.assignTicket(props.ticket.helper.id, props.ticket.student.id);
    }

    const renderSelect = enabled => {
        console.log(enabled);
        if(enabled) {
            return (
                <FormControl>
                    <InputLabel id="demo-simple-select-label">Category</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={info.ticket.category}
                        onChange={evt => handleChange(evt)}
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
                    value={info.ticket.category} />
            )
        }
    }

    const renderAssignButton = () => {
        //helper
        if(props.userType === '1' && info.helper.id === 0) {
            return (
                <Button onClick={() => handleAssignRequest()} color="primary">
                    Assign
                </Button>
            )
        }
    }

    return (
        <Dialog open={props.open} onClose={() => props.handleClose} aria-labelledby="form-dialog-title" fullWidth='false' maxWidth='xs'>
            <DialogContent>
                <h2>Ticket Information</h2>
                {/* <h4>Edit details below:</h4> */}
                
                {/* {info.helper.id  !== 0 ?  <div>{info.helper.username} is working on It</div>: <div>{info.ticket.status}</div>} */}
                <TextField 
                    label='Title' 
                    type='text' 
                    name='title' 
                    disabled={!isStudent}
                    value={info.ticket.title} 
                    onChange={(evt) => handleChange(evt)} />
                <br />
                <TextField 
                    label='Description' 
                    type='text' 
                    name='description'  
                    disabled={!isStudent}
                    value={info.ticket.description}
                    onChange={(evt) => handleChange(evt)} />
                <br />
                <TextField 
                    label="What I've tried"
                    type='text' 
                    name='tried'  
                    disabled={!isStudent}
                    value={info.ticket.tried}
                    onChange={(evt) => handleChange(evt)} />

                <br />

                { renderSelect(isStudent, 'Category')}
                {/*NO dislplaying the select properly*/ }
                
            </DialogContent>
            
            <DialogActions>

                { props.userType ? renderAssignButton() : null }
                <Button disabled= {props.userId !== info.studentId} onClick={() => handleEditRequest()} color="primary">
                    Edit
                </Button>
                <Button onClick={() => props.handleClose()} color="primary">
                    Cancel
                </Button>
                
            </DialogActions>

        </Dialog>
    )
}

const mapStateToProps = state => {
    return{
        userType: state.userType,
        userId : state.userId,

    }
}

export default connect(mapStateToProps,{
    assignTicket,

})(EditTicketDialog);