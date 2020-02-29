import React from 'react';
import MenuSearch from './MenuSearch';
import TextSearch from './TextSearch';

const SearchBar = props => {

    const [searchParams, setSearchParams] = React.useState({})

    React.useEffect( () => {
        // let ticket manager know so they can search
        props.onSearchRequest(searchParams);
    }, [searchParams])

    const renderHelperSearchBar = () => {
        if(props.userType === 'helper') {
            return (
                <MenuSearch 
                    menu={['Newest', 'Oldest']}
                    defaultValue='Oldest' 
                    type='date-added' 
                    placeholder='Date Added' 
                    onUserMenuRequest={(obj) => setSearchParams({ ...searchParams, [obj.type]: obj.value})} />
            )
        }
    }

    return (
        <div className='search-bar'>
                <TextSearch 
                    type='title' 
                    placeholder='Search by Title' 
                    onUserTextRequest={(obj) => setSearchParams({ ...searchParams, [obj.type]: obj.value})} />
                
                <MenuSearch 
                    menu={props.categories}
                    defaultValue={props.categories[0]}
                    type='category' 
                    placeholder='Category' 
                    onUserMenuRequest={(obj) => setSearchParams({ ...searchParams, [obj.type]: obj.value})} />
                
                <MenuSearch 
                    menu={['Resolved', 'In-Progress', 'Pending', 'Un-Assigned']}
                    defaultValue={'Un-Assigned'}
                    type='status' 
                    placeholder='Status' 
                    onUserMenuRequest={(obj) => setSearchParams({ ...searchParams, [obj.type]: obj.value})} />
                {/* here we will decide what searches to render based on user type */}
                { renderHelperSearchBar() }
        </div>
    )
}

export default SearchBar;