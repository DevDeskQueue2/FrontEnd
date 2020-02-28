import React from 'react';
import SideNavigation from '../Dashboard/SideNavigation';
import SearchBar from './SearchBar/SearchBar.js';
import UserSettingsDialog from '../User/UserSettingsDialog';
import CreateTicketDialog from './CreateTicketDialog'; 

const TicketManager = props => {
    const getLinkList = (userType) => {
        // this functino return the correct nav texts based on user type
        if(userType === 'helper') {
            return [
                {
                    name: 'Dashboard',
                    route: '/dashboard'
                }, 
                {
                    name: 'Settings',
                    route: '/settings'
                }
            ]
        } else if(userType === 'student') {
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

    const [open, setOpen] = React.useState(false);
    const [createTicketOpen, setCreateTicketOpen] = React.useState(false);
    const [editTicketOpen, setEditTicketOpen] = React.useState(false);
    const [ticketToEdit, setTicketToEdit] = React.useState({});
    const [tickets, setTickets] = React.useState([]);
    const [ticketsToDisplay, setTicketsToDisplay] = React.useState([]);

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

    const onTicketClick = id => {
        //this function will grab the ticket and populate the EditTicketDialog
        setTicketToEdit( tickets.filter( ticket => { return ticket.id === id } )[0] )
        setEditTicketOpen(true);
    }

    return (
        <div className='ticket-manager-container'>
            <SideNavigation onLinkClick={ (to) => onLinkClick(to)} links={ getLinkList('student')}/>
            
            <div className='ticket-manager'>
                <SearchBar userType='helper' categories={['All', 'React', 'Financial', 'Other']}onSearchRequest={ (params) => doSearch(params)} />
                <TicketList tickets={ticketsToDisplay} onTicketClick={(id) => onTicketClick(id)}/>
            </div>

            <UserSettingsDialog 
                email='user@email.com' 
                open={open} 
                handleClose={() => setOpen(false)} 
                onUpdateUserSettingsRequest={(info) => console.log(info)}/>
            
            <CreateTicketDialog 
                categories={['React', 'Financial', 'Other']} 
                open={createTicketOpen} 
                handleClose={() => setCreateTicketOpen(false)} 
                onUserCreateTicketRequest={ (info) => console.log(info)} />
            
            <EditTicketDialog 
                ticket={ticketToEdit} 
                userType={props.userType} 
                open={editTicketOpen} 
                handleClose={() => setEditTicketOpen(false)} 
                onUserEditTicketRequest={ (info) => console.log(info)} />

        </div>
    )
}

export default TicketManager;