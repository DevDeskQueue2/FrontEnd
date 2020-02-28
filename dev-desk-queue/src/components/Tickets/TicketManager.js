import React from 'react';
import SideNavigation from '../Dashboard/SideNavigation';
import SearchBar from './SearchBar/SearchBar.js';
import UserSettingsDialog from '../User/UserSettingsDialog';

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

    const [open, setOpen] = React.useState(false);

    const onLinkClick = to => {
        console.log('onLinkClick', to);
        // this function is the callback for when a link is clicked
        if(to === '/settings') {
            //popup the dialog for editing the user settings
            handleClickOpen();
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

    return (
        <div className='ticket-manager-container'>
            <SideNavigation onLinkClick={ (to) => onLinkClick(to)} links={links}/>
            <div className='ticket-manager'>
                <SearchBar userType='helper' categories={['All', 'React', 'Financial', 'Other']}onSearchRequest={ (params) => doSearch(params)} />
            </div>
            <UserSettingsDialog email='user@email.com' open={open} handleClose={() => setOpen(false)} onUpdateUserSettingsRequest={(info) => console.log(info)}/>
        </div>
    )
}

export default TicketManager;