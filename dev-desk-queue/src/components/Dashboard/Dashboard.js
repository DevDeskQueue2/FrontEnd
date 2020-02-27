import React from 'react';
import SideNavigation from './SideNavigation';

const Dashboard = props => {

    const [links, setLinks] = React.useState([
        {
            name: 'Ticket Manager',
            route: '/ticket-manager'
        }, 
        {
            name: 'Settings',
            route: '/settings'
        }
    ]);

    const [currentLink, setCurrentLink] = React.useState({value: '/dashboard'})

    const onLinkClick = to => {
        // this function is the callback for when a link is clicked
        if(to === '/settings') {
            //popup the dialog for editing the user settings
        } else {
            props.history.push('/ticket-manager');
        }
    }

    return (
        <div className='dashboard'>
            <SideNavigation onLinkClick={ (to) => onLinkClick(to)} links={links}/>
            <div className='user-dashboard'>
                {/* determine what to render based on user type */}
                User Dashboard
            </div>
        </div>
    )
}

export default Dashboard;