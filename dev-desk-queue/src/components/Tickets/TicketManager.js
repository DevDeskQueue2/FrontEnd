import React from 'react';
import SideNavigation from '../Dashboard/SideNavigation';

const TicketManager = props => {
    const links = [
        {
            name: 'Dashboard',
            route: '/dashboard'
        }, 
        {
            name: 'Settings',
            route: '/settings'
        }
    ];

    const onLinkClick = to => {
        // this function is the callback for when a link is clicked
        if(to === '/settings') {
            //popup the dialog for editing the user settings
        } else {
            props.history.push('/dashboard');
        }
    }

    return (
        <div className='ticket-manager-container'>
            <SideNavigation onLinkClick={ (to) => onLinkClick(to)} links={links}/>
            <div className='ticket-manager'>
                {/* determine what to render based on user type */}
                Ticket Manager
            </div>
        </div>
    )
}

export default TicketManager;