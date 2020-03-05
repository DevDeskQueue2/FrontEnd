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
   const handleLogOut = (e) =>{
    //    localStorage.removeItem("token");
   }
    
    return (
        <div className='side-navbar'>
            { console.log('rendering sidenav') }
            {
                props.links.map( link => {
                    return <div key={link.name} className='nav-link' onClick={() => props.onLinkClick(link.route)}>{link.name}</div>
                })
                
            }
            <div className="nav-link" onClick={handleLogOut()}>Sign Out</div>
        </div>
    )
};

export default SideNavigation;