import React from 'react';

const SideNavigation = props => {
    
    /* 
        props will have an array of objects for links:
            links: [
                {
                    name: '',
                    route: ''
                }
            ], 
            onLinkClick: function(route)
    */
    
    return (
        <div className='side-navbar'>
            { console.log('rendering sidenav') }
            {
                props.links.map( link => {
                    return <div className='nav-link' onClick={() => props.onLinkClick(link.route)}>{link.name}</div>
                })
            }
        </div>
    )
};

export default SideNavigation;