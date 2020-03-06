import React from 'react';
import {connect} from "react-redux";
import SideNavigation from './SideNavigation';
import UserSettingsDialog from '../User/UserSettingsDialog';
import CreateTicketDialog from '../Tickets/CreateTicketDialog';
import EditTicketDialog from '../Tickets/EditTicketDialog';
import GeneralTicket from '../Tickets/GeneralTicket';
import TicketList from '../Tickets/TicketList';

import cogoToast from 'cogo-toast';


import {editTicket, addTicket, fetchCategories, fetchHelperTicketsId, fetchStudentTicketsId} from "../../actions";

const Dashboard = props => {


    React.useEffect(()=>{

        props.fetchCategories();

        if(props.userType==="1") {
            //helper
            props.fetchHelperTicketsId(props.userId);
            console.log("helper")
        } else {
            console.log("student")
            props.fetchStudentTicketsId(props.userId);
        }
    },[])

    const initialTicketToEdit = {
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

    const [open, setOpen] = React.useState(false);
    const [createTicketOpen, setCreateTicketOpen] = React.useState(false);
    const [ticketToEdit, setTicketToEdit] = React.useState(initialTicketToEdit)
    const [editTicketOpen, setEditTicketOpen] = React.useState(false);

    React.useEffect( () => {
        console.log('ticket clicked', ticketToEdit);
        if(ticketToEdit.ticket.title !== '') {
            setEditTicketOpen(true);
        }
    }, [ticketToEdit])

    const getLinkList = (userType) => {
        // this functino return the correct nav texts based on user type
        if(userType === "1") {
            return [
                {
                    name: 'Ticket Manager',
                    route: '/ticket-manager'
                }, 
                {
                    name: 'Settings',
                    route: '/settings'
                }
            ]
        } else if(userType === "0") {
            return [
                {
                    name: 'Ticket Manager',
                    route: '/ticket-manager'
                }, 
                {
                    name: 'Create a Ticket',
                    route: '/create-a-ticket'
                },
                {
                    name: 'Settings',
                    route: '/settings'
                }
            ]
        }
    }

    const onLinkClick = to => {
        // this function is the callback for when a link is clicked
        if(to === '/settings') {
            //popup the dialog for editing the user settings
            handleClickOpen();
        } else if(to === '/create-a-ticket') {
            //popup create a ticket dialog
            handleCreateTicketOpen();
        } else {
            props.history.push('/ticket-manager');
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleCreateTicketOpen = () => {
        setCreateTicketOpen(true);
    }

    const onTicketClick = id => {
        if(props.userType === "1"){
            setTicketToEdit( props.tickets.filter( ticket => { return ticket.ticket.id === id } )[0])
        } else {
            setTicketToEdit( props.userTickets.filter( ticket => { return ticket.ticket.id === id } )[0])
        }
    }

    const currentTicket = {
        id: 10,
        title: 'Fix please',
        description: 'Here description', 
        category: 'Other',
        status: 'In-progress', 
        tried: 'Turning on/off',
        author: 'Student #1',
        ticket: {
            status: "In-Progress"
        }
    }

    const handleCloseEdit = () => {
        setEditTicketOpen(false);
        setTicketToEdit(initialTicketToEdit);
    }

    const renderCurrentItem = (userType) => {
        if(userType === "1") {
            return (
                <div className='current-ticket'>
                    <h3>Current Ticket</h3>
                    {props.userTickets.length > 0 ? <GeneralTicket onTicketClick={(id) => onTicketClick(id)} ticket={currentTicket} /> : "No Current Tickets"}
                </div>
            )
        }
    }

    const renderLists = (userType) => {
        if(userType === "0") {
            //student
            return (
                <div className='ticket-lists'>
                    <div className='resolved-tickets'>
                        <h3>Resolved Tickets</h3>
                        <TicketList size='small' userType='student' tickets={[]} onTicketClick={(id) => onTicketClick(id)}/>
                    </div>
                    <div className='in-progress-tickets'>
                        <h3>In-progress Tickets</h3>
                        <TicketList size='small' userType='student' tickets={[]} onTicketClick={(id) => onTicketClick(id)}/>
                    </div>
                    <div className='assigned-tickets'>
                        <h3>Created Tickets</h3>
                        <TicketList size='small' tickets={props.userTickets} onTicketClick={(id) => onTicketClick(id)}/>
                    </div>
                </div>
            )
        } else if(userType === "1") {
            //helper
            return (
                <div className='ticket-lists'>
                    <div className='assigned-tickets'>
                        <h3>Assigned Tickets</h3>
                        {props.userTickets.length > 0 ? <TicketList size='small' tickets={[]} onTicketClick={(id) => onTicketClick(id)}/> : <div><p>No Assigened Tickets</p><p>Go to Ticket Manager to add tickets</p></div>}
                    </div>
                </div>
            )
        }
    }

    return (
        <div className='dashboard'>
            <SideNavigation onLinkClick={ (to) => onLinkClick(to)} links={ getLinkList(props.userType) }/>
            <div className='user-dashboard'>
                {/* determine what to render based on user type */}
                { renderCurrentItem(props.userType) }
                { renderLists(props.userType) }
            </div>
            <UserSettingsDialog open={open} handleClose={() => setOpen(false)} />

            <CreateTicketDialog 
                categories={props.categories} 
                open={createTicketOpen} 
                handleClose={() => setCreateTicketOpen(false)} 
            />

            <EditTicketDialog 
                ticket={ticketToEdit}  
                open={editTicketOpen} 
                categories={props.categories} 
                handleClose={() => handleCloseEdit()} 
                // onUserEditTicketRequest={ (info) => console.log(info)} 
            />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        username: state.username,
        userType: state.userType,
        tickets : state.tickets,
        categories: state.categories,
        userTickets: state.userTickets,
        userId: state.userId,
    }
}

export default connect(mapStateToProps, {
    fetchCategories, 
    fetchHelperTicketsId,
    fetchStudentTicketsId,
    addTicket,
    editTicket,

})(Dashboard);