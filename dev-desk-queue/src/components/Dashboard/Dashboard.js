import React from 'react';
import {connect} from "react-redux";
import SideNavigation from './SideNavigation';
import UserSettingsDialog from '../User/UserSettingsDialog';
import CreateTicketDialog from '../Tickets/CreateTicketDialog';
import EditTicketDialog from '../Tickets/EditTicketDialog';
import GeneralTicket from '../Tickets/GeneralTicket';
import TicketList from '../Tickets/TicketList';


import {editTicket, addTicket, fetchCategories, fetchTickets} from "../../actions";

const Dashboard = props => {

    const initialTicketToEdit = {
        id: 0,
        title: '',
        description: '', 
        category: '',
        status: '', 
        tried: '',
        dateAdded: ''
    }

    const [open, setOpen] = React.useState(false);
    const [createTicketOpen, setCreateTicketOpen] = React.useState(false);
    const [ticketToEdit, setTicketToEdit] = React.useState(initialTicketToEdit)
    const [editTicketOpen, setEditTicketOpen] = React.useState(false);

    React.useEffect( () => {
        console.log('ticket clicked', ticketToEdit);
        if(ticketToEdit.title !== '') {
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
        setTicketToEdit(currentTicket)
    }

    const currentTicket = {
        id: 10,
        title: 'Fix please',
        description: 'Here description', 
        category: 'Other',
        status: 'In-progress', 
        tried: 'Turning on/off',
        author: 'Student #1',
        dateAdded: '2/28/20'
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
                    <GeneralTicket onTicketClick={(id) => onTicketClick(id)} userType={props.userType} ticket={currentTicket} />
                </div>
            )
        }
    }

    const renderLists = (userType) => {
        if(userType === "0") {
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
                        <h3>Assigned Tickets</h3>
                        <TicketList size='small' userType='student' tickets={[]} onTicketClick={(id) => onTicketClick(id)}/>
                    </div>
                </div>
            )
        } else if(userType === "1") {
            return (
                <div className='ticket-lists'>
                    <div className='assigned-tickets'>
                        <h3>Assigned Tickets</h3>
                        <TicketList size='small' userType='student' tickets={[currentTicket, currentTicket, currentTicket]} onTicketClick={(id) => onTicketClick(id)}/>
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
            <UserSettingsDialog open={open} handleClose={() => setOpen(false)} onUpdateUserSettingsRequest={(info) => console.log(info)}/>
            <CreateTicketDialog categories={props.categories} open={createTicketOpen} handleClose={() => setCreateTicketOpen(false)} onUserCreateTicketRequest={ (info) => console.log(info)} />
            <EditTicketDialog 
                ticket={ticketToEdit} 
                userType='helper' 
                open={editTicketOpen} 
                categories={['React', 'Financial', 'Other']} 
                handleClose={() => handleCloseEdit()} 
                onUserEditTicketRequest={ (info) => console.log(info)} />
        </div>
    )
}

const mapStateToProps = state => {
    return {
        username: state.username,
        userType: state.userType,
        tickets : state.tickets,
        categories: state.categories,
    }
}

export default connect(mapStateToProps, {})(Dashboard);