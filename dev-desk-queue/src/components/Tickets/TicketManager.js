import React from 'react';
import {connect} from 'react-redux';
import SideNavigation from '../Dashboard/SideNavigation';
import SearchBar from './SearchBar/SearchBar.js';
import UserSettingsDialog from '../User/UserSettingsDialog';
import CreateTicketDialog from './CreateTicketDialog'; 
import EditTicketDialog from './EditTicketDialog';
import TicketList from './TicketList';

import data from '../../data/dummyData';

import {fetchTickets,fetchCategories, fetchStudentTicketsId} from "../../actions";



const TicketManager = props => {

    
    const getLinkList = (userType) => {
        // this functino return the correct nav texts based on user type
        if(userType === '1') {
            return [
                {
                    id: "dashboard",
                    name: 'Dashboard',
                    route: '/dashboard'
                }, 
                {
                    id: "settings",
                    name: 'Settings',
                    route: '/settings'
                }
            ]
        } else if(userType === '0') {
            return [
                {
                    
                    name: 'Dashboard',
                    route: '/dashboard'
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

    const initialInfo = {
        helper : {
            id: '',
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
            status : null,
            title: "",
            tried: "",
            }
    }

    const [open, setOpen] = React.useState(false);
    const [createTicketOpen, setCreateTicketOpen] = React.useState(false);
    const [editTicketOpen, setEditTicketOpen] = React.useState(false);
    const [ticketToEdit, setTicketToEdit] = React.useState(initialInfo);
    const [tickets, setTickets] = React.useState(props.tickets);
    const [ticketsToDisplay, setTicketsToDisplay] = React.useState([]);

    React.useEffect(()=>{

        
        props.fetchCategories();


        if(props.userType === "1"){
            props.fetchTickets();
        } else {
            props.fetchStudentTicketsId(props.userId)
        }
        
        
        
       
    },[])

    React.useEffect( () => {
        console.log('ticket clicked', ticketToEdit);
        if(ticketToEdit.ticket.title !== '') {
            setEditTicketOpen(true);
        }
    }, [ticketToEdit])

    const onLinkClick = to => {
        console.log('onLinkClick', to);
        // this function is the callback for when a link is clicked
        if(to === '/settings') {
            //popup the dialog for editing the user settings
            handleClickOpen();
        } else if(to === '/create-a-ticket') {
            //popup create a ticket dialog
            handleCreateTicketOpen();
        } else {
            props.history.push('/dashboard');
        }
    }

    const doSearch = params => {
        console.log('doSearch', params);
    }

    const handleClickOpen = () => {
        console.log('setting open');
        setOpen(true);
    };

    const handleCreateTicketOpen = () => {
        setCreateTicketOpen(true);
    }

    const handleCloseEdit = () => {
        setEditTicketOpen(false);
        setTicketToEdit(initialInfo);
    }

    const onTicketClick = id => {
        //this function will grab the ticket and populate the EditTicketDialog

        /////////////////////////////////////////////////added the ticket.ticket
        if(props.userType === "1"){
            setTicketToEdit( props.tickets.filter( ticket => { return ticket.ticket.id === id } )[0])
        } else {
            setTicketToEdit( props.userTickets.filter( ticket => { return ticket.ticket.id === id } )[0])
        }
        
    }

    return (
        <div className='ticket-manager-container'>
            <SideNavigation onLinkClick={ (to) => onLinkClick(to)} links={ getLinkList(props.userType)}/>
            
            <div className='ticket-manager'>
                <SearchBar categories={props.categories} onSearchRequest={ (params) => doSearch(params)} />
                {props.userType==="1" ? 
                    <TicketList size='large'  tickets={props.tickets} onTicketClick={(id) => onTicketClick(id)}/>
                    :
                    <TicketList size="large" tickets = {props.userTickets} onTicketClick={(id)=> onTicketClick(id)}/>
                }
            </div>

            <UserSettingsDialog 
                open={open} 
                handleClose={() => setOpen(false)} 
            />
            
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
        tickets : state.tickets,
        userType: state.userType,
        categories: state.categories,
        userId: state.userId,
        userTickets: state.userTickets,
    }
}

export default connect(mapStateToProps, {
    fetchTickets,
    fetchCategories,
    fetchStudentTicketsId,
})(TicketManager);