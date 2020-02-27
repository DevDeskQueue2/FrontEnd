import React from 'react';
import SideNavigation from './SideNavigation';
import UserSettingsDialog from '../User/UserSettingsDialog';


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

    const [open, setOpen] = React.useState(false);

    const onLinkClick = to => {
        // this function is the callback for when a link is clicked
        if(to === '/settings') {
            //popup the dialog for editing the user settings
            handleClickOpen();
        } else {
            props.history.push('/ticket-manager');
        }
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    return (
        <div className='dashboard'>
            <SideNavigation onLinkClick={ (to) => onLinkClick(to)} links={links}/>
            <div className='user-dashboard'>
                {/* determine what to render based on user type */}
                User Dashboard
            </div>
            <div className='job-dialog-container'>
                <UserSettingsDialog email='user@email.com' open={open} handleClose={() => setOpen(false)} onUpdateUserSettingsRequest={(info) => console.log(info)}/>
            </div>
        </div>
    )
}

export default Dashboard;