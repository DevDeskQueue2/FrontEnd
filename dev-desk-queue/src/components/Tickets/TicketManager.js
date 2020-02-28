import React from 'react';
import SideNavigation from '../Dashboard/SideNavigation';
import SearchBar from './SearchBar/SearchBar.js';
import UserSettingsDialog from '../User/UserSettingsDialog';
import CreateTicketDialog from './CreateTicketDialog'; 
import EditTicketDialog from './EditTicketDialog';
import TicketList from './TicketList';

import data from '../../data/dummyData';

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

    const initialInfo = {
        title: '', 
        description: '',
        tried: '',
        category: ''
    }

    const [open, setOpen] = React.useState(false);
    const [createTicketOpen, setCreateTicketOpen] = React.useState(false);
    const [editTicketOpen, setEditTicketOpen] = React.useState(false);
    const [ticketToEdit, setTicketToEdit] = React.useState(initialInfo);
    const [tickets, setTickets] = React.useState(data);
    const [ticketsToDisplay, setTicketsToDisplay] = React.useState(data);

    React.useEffect( () => {
        console.log('ticket clicked', ticketToEdit);
        if(ticketToEdit.title !== '') {
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
        setTicketToEdit( tickets.filter( ticket => { return ticket.id === id } )[0])
    }

    return (
        <div className='ticket-manager-container'>
            <SideNavigation onLinkClick={ (to) => onLinkClick(to)} links={ getLinkList('student')}/>
            
            <div className='ticket-manager'>
                <SearchBar userType='helper' categories={['All', 'React', 'Financial', 'Other']}onSearchRequest={ (params) => doSearch(params)} />
                <TicketList size='large' userType='helper' tickets={ticketsToDisplay} onTicketClick={(id) => onTicketClick(id)}/>
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
                userType='student' 
                open={editTicketOpen} 
                categories={['React', 'Financial', 'Other']} 
                handleClose={() => handleCloseEdit()} 
                onUserEditTicketRequest={ (info) => console.log(info)} />

        </div>
    )
}

export default TicketManager;