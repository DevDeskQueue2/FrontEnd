import React from 'react';
import SideNavigation from './SideNavigation';
import UserSettingsDialog from '../User/UserSettingsDialog';
import CreateTicketDialog from '../Tickets/CreateTicketDialog';

const Dashboard = props => {

    const [open, setOpen] = React.useState(false);
    const [createTicketOpen, setCreateTicketOpen] = React.useState(false);

    const getLinkList = (userType) => {
        // this functino return the correct nav texts based on user type
        if(userType === 'helper') {
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
        } else if(userType === 'student') {
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

    return (
        <div className='dashboard'>
            <SideNavigation onLinkClick={ (to) => onLinkClick(to)} links={ getLinkList('student') }/>
            <div className='user-dashboard'>
                {/* determine what to render based on user type */}
                User Dashboard
            </div>
            <UserSettingsDialog email='user@email.com' open={open} handleClose={() => setOpen(false)} onUpdateUserSettingsRequest={(info) => console.log(info)}/>
            <CreateTicketDialog categories={['React', 'Financial', 'Other']} open={createTicketOpen} handleClose={() => setCreateTicketOpen(false)} onUserCreateTicketRequest={ (info) => console.log(info)} />
        </div>
    )
}

export default Dashboard;