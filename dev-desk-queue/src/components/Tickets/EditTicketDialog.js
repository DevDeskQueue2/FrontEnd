import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import { Select, InputLabel, MenuItem, FormControl  } from '@material-ui/core';


import {connect} from "react-redux";
import {assignTicket,editTicket, fetchStudentTicketsId,deleteTicket} from "../../actions";

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
  

    // React.useEffect( () => {
    //     setInfo(props.ticket);
    //     setHelperStatus(props.ticket.ticket.status)
    // }, [])

    React.useEffect( () => {
        setInfo(props.ticket)

    }, [props.open])

    const handleChange = evt => {
        console.log(evt.target)
        setInfo({
            ...info,
            ticket: {
                ...info.ticket,
                [evt.target.name]: evt.target.value
            }
            
        })
    }


    const handleEditRequest = () => {

        props.editTicket(info).then(()=>{
            props.fetchStudentTicketsId(props.userId);
        })
        
        props.handleClose();

        console.log(info)
    }

    const handleAssignRequest = (ticket) => {

        const {status} = ticket;

        //url: /api/tickets/:id/helpers/:helperId
        // if(status === null){
        //     props.assignTicket(props.ticket.ticket.id, props.userId, "Pending");
        // } else if (status === "Pending") {

        // }

        
    }

    const handleDeleteRequest =() => {
        props.deleteTicket(info.ticket.id).then(()=>{
            props.fetchStudentTicketsId(props.userId)
        })
        setInfo(initialInfo);
        props.handleClose();
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
                        name="category"
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
                

                
            </DialogContent>
            
            <DialogActions>

                { props.userType === "0" && <Button color="secondary" onClick={()=> handleDeleteRequest()}>Delete</Button>}
                {console.log("ticket info", props.userId)}

                { props.userType === "1" &&
                    <Button onClick={() => handleAssignRequest(props.ticket.ticket)} color="primary">
                    Assign</Button> 
                }

                {props.userType === "0" ? <Button color="primary" onClick={()=>handleEditRequest()}>Submit Edit</Button>: null}

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
    editTicket,
    fetchStudentTicketsId,
    deleteTicket,


})(EditTicketDialog);